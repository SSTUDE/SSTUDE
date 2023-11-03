import pymysql
from pymongo import MongoClient


def connectMySQL():
    connect = pymysql.connect(host='localhost', user='root', password='qwe123', db='makeup', charset='utf8mb4')
    curs = connect.cursor()

    return connect, curs


def connectPymongo():
    client = MongoClient('mongodb://localhost:27017/')  # MongoDB URI 입력
    db = client['clothes']
    collection = db['clothes']

    return collection

