import pymysql
from pymongo import MongoClient
from dotenv import dotenv_values #env파일 가져오기
import redis

env_variables = dotenv_values(".env")


def connectMySQL():
    connect = pymysql.connect(host=env_variables.get("MYSQL_HOST"), user=env_variables.get("MYSQL_USER"), password=env_variables.get("MYSQL_PASSWORD"), db=env_variables.get("MYSQL_DB"), charset='utf8mb4')
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

def redis_config() :

    REDIS_HOST = env_variables.get("REDIS_HOST")
    REDIS_PORT = env_variables.get("REDIS_PORT")
    REDIS_DATABASE = env_variables.get("REDIS_DATABASE")
    rd = redis.Redis(host=REDIS_HOST, port=REDIS_PORT, db=REDIS_DATABASE)

    return rd