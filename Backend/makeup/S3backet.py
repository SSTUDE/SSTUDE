import boto3
from settings import *
import logging
import uuid

def s3(file, user_id, body):
    s3_client = boto3.client(
        's3',
        aws_access_key_id= AWS_ACCESS_KEY_ID, 
        aws_secret_access_key= AWS_SECRET_ACCESS_KEY)
    entries = s3_client.list_objects_v2(Bucket=AWS_STORAGE_BUCKET_NAME, Prefix='user/')
    # 해당 사용자가 이미 업로드한 파일이 있는지 확인
    # for entry in entries['Contents']:
    #     key = entry['Key']
    #     filename = key.split("/")[1]
    #     # 이미 있다면 해당파일을 삭제
    #     print("파일이름"+filename)
    #     if filename.split("_")[0] == str(user_id):
    #         s3_client.delete_object(Bucket=AWS_STORAGE_BUCKET_NAME, Key=key)
    #         break
    # key는 
    
    key = "user/"+str(user_id)+"_"+file.filename
    print("파일이름"+file.filename)
    
    
    s3_client.put_object(
        Body = body, Bucket=AWS_STORAGE_BUCKET_NAME, Key=key, Metadata={ "ContentType": file.content_type}
    )
    uri = 'https://%s.s3.%s.amazonaws.com/%s' % (AWS_STORAGE_BUCKET_NAME, AWS_REGION, key)
    return uri
