from sqlalchemy import *
from sqlalchemy.orm import sessionmaker

#docker 설정 시 파일 변경 필요

db = {
    'user' : 'root',
    'password' : 'qwe123',
    'host' : 'localhost',
    'port' : 3306,
    'database' : 'makeup',
    
}

DB_URL = f"mysql+pymysql://{db['user']}:{db['password']}@{db['host']}:{db['port']}/{db['database']}"


class engineconn:
    
    # 데이터베이스 연결 엔진 생성
    def __init__(self):
        self.engine = create_engine(DB_URL, pool_recycle = 500)

    #세션을 생성하는 메서드, bind로 새로운 세션을 생성 및 반환
    def sessionmaker(self):
        Session = sessionmaker(bind=self.engine)
        session = Session()
        return session

    #db와 직접 연결하고 반환
    def connection(self):
        conn = self.engine.connect()
        return conn
 