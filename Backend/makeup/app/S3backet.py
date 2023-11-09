import boto3
from dotenv import dotenv_values #env파일 가져오기
# from datetime import datetime


env_variables = dotenv_values(".env")

def s3(file, user_id, body, current_date, count):
    s3_client = boto3.client(
        's3',
        aws_access_key_id= env_variables.get("AWS_ACCESS_KEY_ID"), 
        aws_secret_access_key= env_variables.get("AWS_SECRET_ACCESS_KEY"))
    
    # entries = s3_client.list_objects_v2(Bucket=env_variables.get("AWS_STORAGE_BUCKET_NAME"), Prefix='user/')
    # 해당 사용자가 이미 업로드한 파일이 있는지 확인
    # for entry in entries['Contents']:
    #     key = entry['Key']
    #     filename = key.split("/")[1]
    #     # 이미 있다면 해당파일을 삭제
    #     print("파일이름"+filename)
    #     print("key"+key)
    #     if filename.split("_")[0] == str(user_id):
    #         s3_client.delete_object(Bucket=env_variables.get("AWS_STORAGE_BUCKET_NAME"), Key=key)
    #         break 
    
    key = "user/"+str(user_id) + str(current_date) + "_"+str(count)+file.filename# 파일 이름 uuid 붙이기 
    
    
    s3_client.put_object(
        Body = body, Bucket=env_variables.get("AWS_STORAGE_BUCKET_NAME"), Key=key, Metadata={ "ContentType": file.content_type}
    )
    uri = 'https://%s.s3.%s.amazonaws.com/%s' % (env_variables.get("AWS_STORAGE_BUCKET_NAME"), env_variables.get("AWS_REGION"), key)
    return uri
