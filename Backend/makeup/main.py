from fastapi import FastAPI, File, UploadFile, Header, HTTPException, status
from fastapi.responses import JSONResponse
from typing import Optional
from personal_color_analysis import personal_color
from clothes_analysis.clothes_score import clothes_score
from database import connectMySQL
from S3backet import s3
from service import changeId
from datetime import date, datetime
import requests
import os


#DB의 CONNECTION을 계속 연결하면서 해결할 수 있는 방법은...?ㅠㅠ
app = FastAPI()

# 퍼스널컬러 요청 후 결과값을 db에 저장한 후 반환한다 
@app.post("/makeup/color")
async def runColor(
    file: UploadFile = File(), 
    access_token: Optional[str] = Header(None, convert_underscores=False)
):
    connect, curs = connectMySQL()
    # 헤더에 담긴 엑세스토큰을 spring으로 넘겨주고 받음 
    # userid = requests.post("http://k9d204.p.ssafy.io:8000/account/memberId", json={"accessToken": access_token}, headers={"Content-Type": "application/json"})
    userid=2
    
    ## 하루에 3번 이상 요청할 수 없음 
    current_date = datetime.now().date()
    with connect.cursor() as curs:
        query = """SELECT COUNT(*) AS request_count
                    FROM makeups
                    WHERE member_id = %s AND DATE_FORMAT(calender, '%%Y-%%m-%%d')= %s"""
        curs.execute(query, (userid, current_date))
        result = curs.fetchone()
        count = result[0] if result else 0
    
    
    # 나중에 redis로 바꾸기!
    if count >=100:
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
            match_color, hair, accessary, expl, skin, eye=  ('', '', '', '', '', '')
            result = personal_color.analysis(uri)
            
            result = result.split('톤')[0]
            result_id = changeId(result)
            
            # DB에 저장
            with connect.cursor() as curs:
                query = """INSERT INTO makeups (member_id, img_uri, result_id) VALUES (%s, %s, %s)"""
                curs.execute(query, (userid, s3uri, result_id))
            
            connect.commit()
            
            with connect.cursor() as curs:
            # 결과값, 사용자값 등을 모두 가져와서 JSON형태로 반환
                query_select = """SELECT * FROM color WHERE color_id=%s"""
                curs.execute(query_select,(result_id))
                row = curs.fetchone()
                match_color = row[1]
                hair = row[2]
                accessary = row[3]
                expl = row[4]
                skin = row[5]
                eye = row[6]
                
            os.remove(file_name)
        except Exception as e:
            print(e)
            result = False
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="분석에 실패했습니다")

        finally:
            connect.close()
            
           
    print("결과 ", result) 
    return JSONResponse({'personal_color': result , 'user_img' : s3uri, 
                         'match_color':match_color, 'hair':hair,
                         'accessary': accessary, 'expl':expl,
                         'skin':skin, 'eye':eye})
    

# 이미지 내에 사람이 서있으면, 사진에서 상의를 찾아서 색 추출 및 유사도 검사or점수
# 무조건 바로 전 2개사진 뽑아서 주기
@app.post("/makeup/clothes")
async def read_item(file: UploadFile = File(), 
            access_token: Optional[str] = Header(None, convert_underscores=False)):
    connect, curs = connectMySQL()
    # 헤더에 담긴 엑세스토큰을 spring으로 넘겨주고 받음 
    # userid = requests.post("http://k9d204.p.ssafy.io:8000/account/memberId", json={"accessToken": access_token}, headers={"Content-Type": "application/json"})
    userid=2
    
    current_date = datetime.now().date()
    with connect.cursor() as curs:
        query = """SELECT COUNT(*) AS request_count
                    FROM clothes
                    WHERE member_id = %s AND calender = %s"""
        curs.execute(query, (userid, current_date))
        result = curs.fetchone()
        count = result[0] if result else 0
    
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
            s3uri = s3(file, userid, contents, count, current_date)
            
            # 사진은 personalcolor을 판단하고, DB에 결과값을 저장한다 
            result = clothes_score(uri)
            
            print(result)
            # result = result.split('톤')[0]
            score = changeId(result)
            
            # DB에 저장
            with connect.cursor() as curs:
                query = """INSERT INTO clothes (member_id, img_uri, score) VALUES (%s, %s, %s)"""
                curs.execute(query, (userid, s3uri, score))
            
            connect.commit()
            
            with connect.cursor() as curs:
            # 결과값, 사용자값 등을 모두 가져와서 JSON형태로 반환
                query_select = """SELECT score, img_uri, MINUTE(calender) as minute
                                FROM clothes
                                WHERE member_id = %s AND DATE_FORMAT(calender, '%%Y-%%m-%%d')= %s
                                ORDER BY calender DESC
                                LIMIT 2
                                """
                curs.execute(query_select,(userid, current_date))
                row = curs.fetchall()
                lst = []
                for r in row:
                    lst.append({'score': r[0], 'img_url': r[1], 'minute':r[2]}) # AFTER부터 -> BEFORE
            
            os.remove(file_name)
    
        except Exception as e:
            print(e)
            result = False
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="분석에 실패했습니다")
        
        finally:
            connect.close()
            
    return JSONResponse(lst)


# 퍼스널 컬러 이전 상세기록 반환
@app.post("/makeup/detail")
def getRecordDetail (
    request: str,
    access_token: Optional[str] = Header(None, convert_underscores=False)):
    
    try:
        connect, curs = connectMySQL()
        # 헤더에 담긴 엑세스토큰을 spring으로 넘겨주고 받음 
        # userid = requests.post("http://k9d204.p.ssafy.io:8000/account/memberId", json={"accessToken": access_token}, headers={"Content-Type": "application/json"})
        
        userid=2
        
        date_obj = datetime.strptime(request, "%Y-%m-%d").date()
        
        # 맴버 id, day값 넘겨주면 -> 관련한 color_id찾고 
        with connect.cursor() as curs:
        # 결과값, 사용자값 등을 모두 가져와서 JSON형태로 반환
            query_select = """SELECT result_id, img_uri FROM makeups WHERE member_id=%s AND DATE_FORMAT(calender, '%%Y-%%m-%%d')= %s"""
            curs.execute(query_select,(userid, date_obj))
            row = curs.fetchone()
            result_id = row[0]
            img_uri = row[1]
        
        result = changeId(result_id)
            
    
        with connect.cursor() as curs:
        # 결과값, 사용자값 등을 모두 가져와서 JSON형태로 반환
            query_select = """SELECT * FROM color WHERE color_id=%s"""
            curs.execute(query_select,(result_id))
            row = curs.fetchone()
            match_color = row[1]
            hair = row[2]
            accessary = row[3]
            expl = row[4]
            skin = row[5]
            eye = row[6]
            
    except Exception as e:
            print(e)
            result = False
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="분석에 실패했습니다")

    
    return JSONResponse({'personal_color': result , 'user_img' : img_uri, 
                         'match_color':match_color, 'hair':hair,
                         'accessary': accessary, 'expl':expl,
                         'skin':skin, 'eye':eye})

    
###########################################################################   
    
# # 퍼스널 컬러 이전 기록 리스트로 반환(달력) 
# @app.get("/makeup/list")
# def getRecordList (
#     request: MonthRequestDto,
#     access_token: Optional[str] = Header(None, convert_underscores=False)):
#     # 헤더에 담긴 엑세스토큰을 spring으로 넘겨주고 받음 
#     # userid = requests.post("http://k9d204.p.ssafy.io:8000/account/memberId", json={"accessToken": access_token}, headers={"Content-Type": "application/json"})
    
#     userid=1
#     connect, curs = connectMySQL()

#     # 날짜별 몇건의 사진이 있는지
#     query_select = """SELECT COUNT(*), DAY(calender) 
#                     FROM makeups 
#                     WHERE member_id=%s AND YEAR(calender)=%s AND MONTH(calender)=%s 
#                     GROUP BY DAY(calender)"""
#     curs.execute(query_select,(userid, request.year, request.month))
#     row = curs.fetchall()
    
#     lst = []
#     for r in row:
#          lst.append({'count': r[0], 'day': r[1]})
    
#     return {"month": request.month, "list":lst}