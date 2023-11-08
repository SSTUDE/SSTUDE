import pymysql
from pymongo import MongoClient
from dotenv import dotenv_values #env파일 가져오기


env_variables = dotenv_values(".env")


def connectMySQL():
    connect = pymysql.connect(host='localhost', user='root', password='qwe123', db='makeup', charset='utf8mb4')
    curs = connect.cursor()

    return connect, curs


def connectPymongo():
    MONGODB_USERNAME = env_variables.get("MONGODB_USERNAME")
    MONGODB_PASSWORD = env_variables.get("MONGODB_PASSWORD")
    MONGODB_HOST = env_variables.get("MONGODB_HOST")
    MONGODB_PORT = env_variables.get("MONGODB_PORT")
    uri = f"mongodb://{MONGODB_USERNAME}:{MONGODB_PASSWORD}@{MONGODB_HOST}:{MONGODB_PORT}/?authSource=admin"

    client = MongoClient(uri)  # MongoDB URI 입력
    db = client['clothes']
    collection = db['clothes']

    return collection

