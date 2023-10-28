
from fastapi import FastAPI, File, UploadFile, Header, HTTPException, status
from fastapi.responses import JSONResponse
from typing import Optional
from personal_color_analysis import personal_color
from database import connectMySQL
from S3backet import s3
from service import changeId
import requests
import os

app = FastAPI()


# 퍼스널컬러 요청 후 결과값을 db에 저장한 후 반환한다 
@app.post("/makeup/color")
async def runColor(
    file: UploadFile = File(), 
    access_token: Optional[str] = Header(None, convert_underscores=False)
):
    # 헤더에 담긴 엑세스토큰을 spring으로 넘겨주고 받음 
    # userid = requests.post("http://k9d204.p.ssafy.io:8000/account/memberId", json={"accessToken": access_token}, headers={"Content-Type": "application/json"})
    
    userid=1
    
    try:
        contents = await file.read()
        
        #로컬에 파일 저장
        file_name = 'savedfile.jpg'   
        with open(file_name, "wb") as local_file:
            local_file.write(contents)
        uri = os.path.abspath('./savedfile.jpg')
        
        # S3저장 후 uri받아옴
        s3uri = s3(file, userid, contents)
        
        # 사진은 personalcolor을 판단하고, DB에 결과값을 저장한다 
        match_color, hair, accessary, expl, skin, eye=  ('', '', '', '', '', '')
        result = personal_color.analysis(uri)
        
        result = result.split('톤')[0]
        result_id = changeId(result)
        
        # DB에 저장
        connect, curs = connectMySQL()
        query = """INSERT INTO makeups (member_id, img_uri, result_id) VALUES (%s, %s, %s)"""
        curs.execute(query, (userid, s3uri, result_id))
        
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
        
        #DB잘가
        connect.commit()
        connect.close()
        os.remove(file_name)
        
    except Exception as e:
        print(e)
        result = False
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="분석에 실패했습니다")

    print("결과 ", result) 
    return JSONResponse({'personal_color': result , 'user_img' : s3uri, 
                         'match_color':match_color, 'hair':hair,
                         'accessary': accessary, 'expl':expl,
                         'skin':skin, 'eye':eye})
    
    
# 퍼스널 컬러 이전 기록을 반환한다 
# 얼굴 사진은 이전 7개까지 - 그 날짜에 해당하는 것 여러개...?흠...일단 고려
# @app.get("/makeup/{record_id}")
# def getRecord (
#     record_id: int, q: Union[str, None] = None, 
#     random_header: Optional[str] = Header(None, convert_underscores=False)):
#     return {"item_id": record_id, "q": q}


# # 이미지 내에 사람이 서있으면, 사진에서 상의를 찾아서 색 추출 및 유사도 검사or점수
# @app.get("/makeup/simulation")
# def read_item(item_id: int, q: Union[str, None] = None):
#     return {"item_id": item_id, "q": q}

