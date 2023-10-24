from typing import Union

from fastapi import FastAPI

app = FastAPI()


# 퍼스널컬러 요청 후 결과값을 db에 저장한 후 반환한다 
@app.post("/makeup/color")
def runColor():
    return {"makeup": "color"}

# 퍼스널 컬러 기록을 반환한다 
@app.get("/makeup/{record_id}")
def getRecord (record_id: int, q: Union[str, None] = None):
    return {"item_id": record_id, "q": q}

# 화장 aapi를 요청받으면, ai가 실행되도록
@app.get("/makeup/simulation")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
