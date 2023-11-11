# 기본이미지로 3.11사용
FROM python:3.11 

# 라이브러리 업데이트 및 필요한 라이브러리 설치
RUN apt-get update && apt-get install -y \
    libgl1-mesa-glx


#작업 디렉토리 설정(기본 디렉토리)
WORKDIR /src/app

# 현재 파일의 src -> /src/app로 이동
COPY ./app .
COPY ./requirements.txt /src/requirements.txt

# RUN pip install virtualenv

# #가상환경 생성
# RUN virtualenv venv
# ENV PATH="/src/app/venv/bin:$PATH"

RUN pip install -r /src/requirements.txt

RUN pip uninstall -y colormath

# 수정된 color_diff.py 복사
COPY ./venv/Lib/site-packages/colormath/color_diff.py /src/venv/Lib/site-packages/colormath/color_diff.py

# colormath 패키지 재설치
RUN pip install colormath


CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8013", "--reload"]
