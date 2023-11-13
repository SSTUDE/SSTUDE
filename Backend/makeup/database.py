
import pymysql

def connectMySQL():
    connect = pymysql.connect(host='localhost', user='root', password='qwe123', db='makeup', charset='utf8mb4')
    curs = connect.cursor()

    return connect, curs

