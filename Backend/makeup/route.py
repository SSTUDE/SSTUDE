from typing import Union
import boto3

from fastapi import APIRouter, UploadFile, File, Form

# fast api의 router사용
post_route = APIRouter()

# 퍼스널컬러 요청 후 결과값을 db에 저장한 후 반환한다 
@post_route.post("/makeup/color")
async def runColor(    
    # byte형식 / 업로드된 파일과 관련된 정보를 저장 / 폼(사용자 인증과 권한) -
    ## 엑세스토큰으로 맴버를 받아오는 방법 알아보기 
    file: bytes = File(), fileb: UploadFile = File(), token: str = Form()
):
    return {
        "file_size": len(file),
        "token": token,
        "fileb_content_type": fileb.content_type,
    }
    
    
# 퍼스널 컬러 기록을 반환한다 
@post_route.get("/makeup/{record_id}")
def getRecord (record_id: int, q: Union[str, None] = None):
    return {"item_id": record_id, "q": q}

# 화장 aapi를 요청받으면, ai가 실행되도록
@post_route.get("/makeup/simulation")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}



# @app.post("/makeup/color")
# async def upload_image(file: UploadFile):
#     # 파일을 로컬 디스크에 저장하지 않고 S3로 직접 업로드
#     s3 = boto3.client("s3")
#     try:
#         s3.upload_fileobj(StarletteUploadFile(file.file), "my-s3-bucket", file.filename)
#         return {"message": "업로드 성공"}
#     except botocore.exceptions.ClientError as e:
#         return {"error": f"업로드 실패: {e}"}
