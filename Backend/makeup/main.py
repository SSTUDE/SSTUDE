
from fastapi import FastAPI, File, UploadFile, Form, Header
from fastapi.responses import JSONResponse
from typing import Optional
from personal_color_analysis import personal_color
from database import connectMySQL
from S3backet import s3

app = FastAPI()


# 퍼스널컬러 요청 후 결과값을 db에 저장한 후 반환한다 
@app.post("/makeup/color")
async def runColor(
    file: UploadFile = File(), 
    random_header: Optional[str] = Header(None, convert_underscores=False)
):
    # 헤더에 담긴 엑세스토큰을 spring으로 넘겨주고 받음 
    userid = 1 #추후 수정
    
    # S3저장 후 uri받아옴
    uri = s3(file, userid)
    result_url = ''
    
    # 사진은 personalcolor판단하고, DB에 결과값을 저장한다 
    # 결과값, 사용자값 등을 모두 가져와서 JSON형태로 반환
    try:
        result = personal_color.analysis(uri)
        result = result.split('톤')[0]
        # DB에 저장
        connect, curs = connectMySQL()
        query = """INSERT INTO makeups (my_id, member_id, result_id) VALUES (%s, %s, %s)"""
        curs.execute(query, (result, uri, userid))
        connect.commit()
        connect.close()
        result_url = uri
    except Exception as e:
        print(e)
        result = False
    return JSONResponse({'personal_color': result , 'user_img' : result_url}, json_dumps_params={'ensure_ascii': False})

    



    
# # 퍼스널 컬러 기록을 반환한다 
# @app.get("/makeup/{record_id}")
# def getRecord (record_id: int, q: Union[str, None] = None):
#     return {"item_id": record_id, "q": q}

# # 화장 aapi를 요청받으면, ai가 실행되도록
# @app.get("/makeup/simulation")
# def read_item(item_id: int, q: Union[str, None] = None):
#     return {"item_id": item_id, "q": q}

