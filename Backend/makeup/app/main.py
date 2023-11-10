from fastapi import FastAPI, File, UploadFile, Header, HTTPException, status
from fastapi.responses import JSONResponse
from typing import Optional
from personal_color_analysis.personal_color import analysis
from clothes_analysis.clothes_score import clothes_score
from database import connectMySQL, connectPymongo, redis_config
from S3backet import s3
from service import changeId
from datetime import datetime
# from fastapi.openapi.utils import get_openapi
import requests
import os


app = FastAPI()
rd = redis_config()
current_date = datetime.now().date()
current_date_time = datetime.now()

# @app.get("makeup-service/v3/api-docs", include_in_schema=False)
# def get_open_api_endpoint():
#     routes = [route for route in app.routes if route.path != "/makeup-service/v3/api-docs"]
#     return get_openapi(
#         title="FastAPI Server",
#         version="v3",
#         routes=routes,
#     )

# 퍼스널컬러 요청 후 결과값을 db에 저장한 후 반환한다 
@app.post("/makeup/color")
async def runColor(
    file: UploadFile = File(), 
    access_token: Optional[str] = Header(None, convert_underscores=False)
):
    connect, curs = connectMySQL()
    # ##############토큰으로 spring에서 유저찾아오기######################
    response = requests.post("http://k9d204a.p.ssafy.io:8000/account/memberId", json={"accessToken": access_token}, headers={"Content-Type": "application/json"})
    if response.status_code == 200:
        response_json = response.json()  # 응답 본문을 JSON 형식으로 파싱
        userid = response_json["memberId"]  # 본문에서 특정 값을 추출
        print(userid)
    else:
        raise HTTPException(status_code=400, detail="잘못된 요청입니다")
    
    #################캐싱적용##########################
    data = rd.get(f'member:{userid}:calender:{current_date}:makeup')
    if data:
        count=int(data)+1
        rd.set(f'member:{userid}:calender:{current_date}:makeup', count, ex=86400)
    else:
        count=0
        rd.set(f'member:{userid}:calender:{current_date}:makeup', count, ex=86400)
    # count =0
    if count >=1:
        raise HTTPException(status_code=429, detail="하루에 1번 이상 요청할 수 없습니다.")
    
    else:
        try:
            contents = await file.read()
            
            #로컬에 파일 저장
            file_name = 'savedfile.jpg'   
            with open(file_name, "wb") as local_file:
                local_file.write(contents)
            uri = os.path.abspath('./savedfile.jpg')
            
            # S3저장 후 uri받아옴
            s3uri = s3(file, userid, contents, count, current_date)
            
            # 사진은 personalcolor을 판단하고, DB에 결과값을 저장한다 
            match_color, hair, accessary, expl, skin, eye, eng=  ('', '', '', '', '', '','')
            result = analysis(uri)
            
            result = result.split('톤')[0]
            
            with connect.cursor() as curs:
                query = """INSERT INTO makeups (member_id, img_uri, result, calender) VALUES (%s, %s, %s, %s)"""
                curs.execute(query, (userid, s3uri, result, current_date_time))
            connect.commit()
            
            match_color, hair, accessary, expl, skin, eye, eng = changeId(result)
            match_color= match_color[0:13]
            
            os.remove(file_name)
        except Exception as e:
            print(e)
            result = False
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="분석에 실패했습니다")

        finally:
            connect.close()
            
           
    print("결과 ", result) 
    return JSONResponse({'personal_color': result, 'user_img' : s3uri, 
                         'match_color':match_color, 'hair':hair,
                         'accessary': accessary, 'expl':expl,
                         'skin':skin, 'eye':eye,
                         'personal_color_eng': eng})
    

# 이미지 내에 사람이 서있으면, 사진에서 상의를 찾아서 색 추출 및 유사도 검사or점수
@app.post("/makeup/clothes")
async def read_item(file: UploadFile = File(), 
            access_token: Optional[str] = Header(None, convert_underscores=False)):
    collection = connectPymongo()
   ##############토큰으로 spring에서 유저찾아오기######################
    response = requests.post("http://k9d204a.p.ssafy.io:8000/account/memberId", json={"accessToken": access_token}, headers={"Content-Type": "application/json"})
    if response.status_code == 200:
        response_json = response.json()  # 응답 본문을 JSON 형식으로 파싱
        userid = response_json["memberId"]  # 본문에서 특정 값을 추출
        print(userid)
    else:
        raise HTTPException(status_code=400, detail="잘못된 요청입니다")
    
    #################캐싱적용##########################
    data = rd.get(f'member:{userid}:calender:{current_date}:clothes')
    if data:
        count=int(data)+1
        rd.set(f'member:{userid}:calender:{current_date}:clothes', count, ex=86400)
    else:
        count=0
        rd.set(f'member:{userid}:calender:{current_date}:clothes', count, ex=86400)
    # count =0
    if count >=3:
        raise HTTPException(status_code=429, detail="하루에 3번 이상 요청할 수 없습니다.")
    
    else:
        try:
            contents = await file.read()

            #로컬에 파일 저장
            file_name = 'savedclothfile.jpg'   
            with open(file_name, "wb") as local_file:
                local_file.write(contents)
            uri = os.path.abspath('./savedclothfile.jpg')
            # S3저장 후 uri받아옴
            s3uri = s3(file, userid, contents, count, current_date_time)
            
            # 사진은 personalcolor을 판단하고, DB에 결과값을 저장한다 
            clothes_score_obj = clothes_score(uri, userid, current_date_time)
            score = clothes_score_obj.score
            
            # DB에 저장
            collection.insert_one({'memberId': userid,
                                   'imguri':s3uri,
                                   "score":score,
                                   "calender":current_date_time})
            
            date_str = current_date_time.strftime("%Y-%m-%d")
            # 쿼리 실행 및 결과 정렬, 제한
            result = collection.find({"memberId":userid,
                                      "calender": {"$gte": datetime(current_date_time.year, current_date_time.month, current_date_time.day), "$lt": datetime(current_date_time.year, current_date_time.month, current_date_time.day, 23, 59, 59, 999999)}}
                                     ,{"_id":0, "score":1, "imguri":1})
            lst = []
            for r in result:
                lst.append(r)
                            
            os.remove(file_name)
    
        except Exception as e:
            print(e)
            result = False
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="분석에 실패했습니다")
            
    return JSONResponse(lst)

### 2023-11-01 이런형태로 넘겨야 함
# 퍼스널 컬러 이전 상세기록 반환
@app.post("/makeup/detail")
def getRecordDetail (
    request: str,
    access_token: Optional[str] = Header(None, convert_underscores=False)):
    try:
        connect, curs = connectMySQL()
        
        response = requests.post("http://localhost:8000/account/memberId", json={"accessToken": access_token}, headers={"Content-Type": "application/json"})
        if response.status_code == 200:
            response_json = response.json()  # 응답 본문을 JSON 형식으로 파싱
            userid = response_json["memberId"]  # 본문에서 특정 값을 추출
            print(userid)
        else:
            raise HTTPException(status_code=400, detail="잘못된 요청입니다")
        
        date_obj = datetime.strptime(request, "%Y-%m-%d").date()
        
        # 맴버 id, day값 넘겨주면 -> 관련한 color_id찾고 
        with connect.cursor() as curs:
        # 결과값, 사용자값 등을 모두 가져와서 JSON형태로 반환
            query_select = """SELECT result, img_uri FROM makeups WHERE member_id=%s AND DATE_FORMAT(calender, '%%Y-%%m-%%d')= %s"""
            curs.execute(query_select,(userid, date_obj))
            row = curs.fetchone()
            result = row[0]
            img_uri = row[1]
        
        match_color, hair, accessary, expl, skin, eye, eng=  ('', '', '', '', '', '','')
        match_color, hair, accessary, expl, skin, eye, eng = changeId(result)
        match_color= match_color[0:13]
        
            
    except Exception as e:
            print(e)
            result = False
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="분석에 실패했습니다")

    
    return JSONResponse({'personal_color': result , 'user_img' : img_uri, 
                         'match_color':match_color, 'hair':hair,
                         'accessary': accessary, 'expl':expl,
                         'skin':skin, 'eye':eye,
                         'eng': eng })

