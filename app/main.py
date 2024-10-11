from fastapi import FastAPI
from api.v1 import predicts

app = FastAPI()

# API 라우터 등록 및 prefix 설정
app.include_router(predicts.router, prefix="/api/v1")

# 서버 실행: uvicorn main:app --reload