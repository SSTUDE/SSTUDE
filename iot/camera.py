import cv2
import face_recognition
import numpy as np
import json

from utils import getUserInfo, getSignInInfo
from utils.web_socket import WebSocketService

import threading
import asyncio
from datetime import datetime, timedelta

def open_service():
    print("open smart merror")

def close_service():
    print("close smart merror")
    # 로그인정보 삭제
    getSignInInfo.updateUserInfo(userSignInInfoFile, "")

def is_need_to_update(_now):
    global finish_time, update_min
    remaining_time = finish_time - _now
    half_time = timedelta(minutes = update_min//2)
    return remaining_time <= half_time

def update_finish_time(_now):
    global finish_time, update_min
    finish_time = _now + timedelta(minutes=update_min)

# 기본작업 세팅

# 1. 로그인 시 필요한 데이터 저장할 .json 불러오기
userSignInInfoFile = "./userSignInInfo.json"
getSignInInfo.updateUserInfo(userSignInInfoFile, "")

alarmInformFile = "./alarmInform.json"
# getSignInInfo.loadUserInfo(userSignInInfoFile)

# 2. 웹소켓 실행
def start_websocket_service():
    global ws_service
    ws_service = WebSocketService(portNo=8765)
    ws_service.start()
    
ws_service = None
thread = threading.Thread(target=start_websocket_service)
thread.daemon = True
thread.start()

# 카메라 등록
def initialize_camera():
    global cam
    cam = cv2.VideoCapture(1, cv2.CAP_V4L2)
    if not cam.isOpened():
        print("카메라를 열 수 없습니다.")
        return False
    return True

def release_camera():
    global cam
    if cam is not None:
        cam.release()
        cam = None
        
cam = None 

# 카메라 초기화
initialize_camera()

###
# 회원정보 불러오기
known_face_encodings, known_face_names = getUserInfo.from_users_folder()
###


# Initialize some vision variables
face_locations = []
face_encodings = []
face_names = []
process_this_frame = True

# Initialize some service variables
service_on = False
update_min = 10
finish_time = datetime.now() + timedelta(days=10)
cool_down_counter = 10
cnt = 0
is_cooler_on = False
is_login_service_on = False
while True:
    
    message = ws_service.checkLatestMessage()
    now = datetime.now()
    userRecogn = False
    if is_cooler_on : cnt += 1
    if cnt >= cool_down_counter :
        is_cooler_on = False
        cnt = 0
        
    if not cam and message is None: continue
    
    ###### connection with web socket data ####### 
    msg = json.loads(message) if message is not None else dict()
    msg_type = msg.get("type")
    
    Info = {
            "type" : "",
            "data" : ""
        }

    ####### caring about message cuz of threading
    if msg_type and not is_cooler_on: is_cooler_on = True
        
    ## Camera on off mapping process
    if msg_type == "camera" and cnt == 0: # datetime.now() < finish_time and :
        msg_data = msg.get("data")
        print("is camera type came?")
        if msg_data == "on" : # 프론트에서 카메라가 on 되는 상황
            release_camera()
            msg["data"] = "raspberryPiCameraOff"
            asyncio.run(ws_service.sendInfo(json.dumps(msg)));
        elif not cam and msg_data == "off": # 프론트에서 카메라가 사용 종료 되는 상황
            initialize_camera()
            msg["data"] = "raspberryPiCameraOn"
            asyncio.run(ws_service.sendInfo(json.dumps(msg)));

    
    ## getting accessToken for send img
    if msg_type == "alarm" and cnt == 0: # datetime.now() < finish_time and :
        msg_data = msg.get("data")
        hour = msg_data.get('start_hour')
        minute = msg_data.get('start_minute')
        play_times = msg_data.get('play_times')
        duration_minutes = msg_data.get('duration_minutes')

        if hour and minute :
            getSignInInfo.updateAlarmInfo(alarmInformFile, _hour=hour, _minute=minute, play_time=play_times, duration_minutes=duration_minutes)
            # alarmInfo = getSignInInfo.loadAlarmInfo(alarmInformFile)
            # asyncio.run(ws_service.sendInfo(json.dumps(alarmInfo)));
    

    if cam : 
        ret, frame = cam.read()
        
        if not ret:
            print("프레임을 읽을 수 없습니다. 종료합니다")
            continue


    #######################################################################
    try:
        ## face recongizition algorithm
        if process_this_frame:
            # Resize frame of video to 1/4 size for faster face recognition processing
            small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)

            # Convert the image from BGR color (which OpenCV uses) to RGB color (which face_recognition uses)
            # rgb_small_frame = small_frame[:, :, ::-1]
            rgb_small_frame = cv2.cvtColor(small_frame, cv2.COLOR_BGR2RGB)
                    
            # Find all the faces and face encodings in the current frame of video
            face_locations = face_recognition.face_locations(rgb_small_frame)
            face_encodings = face_recognition.face_encodings(rgb_small_frame, face_locations)

            face_names = []
            
            for face_encoding in face_encodings:
                # See if the face is a match for the known face(s)
                matches = face_recognition.compare_faces(known_face_encodings, face_encoding)
                name = "Unknown"
                
                # # If a match was found in known_face_encodings, just use the first one.
                # if True in matches:
                #     first_match_index = matches.index(True)
                #     name = known_face_names[first_match_index]

                # Or instead, use the known face with the smallest distance to the new face
                face_distances = face_recognition.face_distance(known_face_encodings, face_encoding)

                if 0 < len(face_distances):
                    best_match_index = np.argmin(face_distances)
                    # print("matching distance : ", face_distances[best_match_index])
                    if matches[best_match_index] and face_distances[best_match_index] <= 0.45:
                        name = known_face_names[best_match_index]
                        userRecogn = True
                else:
                    pass
                    # print("face_distances 배열이 비어 있습니다.")

                    
                face_names.append(name)
            
       #############################################
    except : 
        print("no image")
    


    ##############################
    ## Sign Up Messageing process
    if cam and msg_type == "signUp":
        print("hello world")
        userName = getUserInfo.createUser()
        
        path = f'./users/{userName}/' + now.strftime("%Y%m%d_%H%M%S.jpg")
        cv2.imwrite(path, frame)
        
        msg["data"] = getSignInInfo.loadUserInfo(userSignInInfoFile)
        msg["data"]["userInfo"] = userName
        print("Sign Up Process Started : ", msg)
        asyncio.run(ws_service.sendInfo(json.dumps(msg)));
        
        known_face_encodings, known_face_names = getUserInfo.from_users_folder()
    
    ## Sign In Process 
    if msg_type == "signIn" and cnt == 0:
        is_login_service_on = True

    
    ##############################################
    
    
    
    ######## about camera servie ###############
    if userRecogn :

        getSignInInfo.updateUserInfo(userSignInInfoFile, name)
        data = getSignInInfo.loadUserInfo(userSignInInfoFile)
        
        Info = {
            "type" : "signIn",
            "data" : data
        }


    key = cv2.waitKey(1)
       
    if key==27:
        break

    # 서비스 유지시간 업데이트
    if userRecogn and is_need_to_update(now):
        update_finish_time(now)
        print("타겟 시간 변경 : ", finish_time)
        asyncio.run(ws_service.sendInfo(json.dumps(Info)));

    # 서비스 실행
    if is_login_service_on and userRecogn :
        update_finish_time(now)
        print("타겟 시간 : ", finish_time)
        service_on = True
        
        ## 
        open_service()
        asyncio.run(ws_service.sendInfo(json.dumps(Info)));
        is_login_service_on = False
    
   # if is_login_service_on and not userRecogn:
    #    print("why?")
     #   Info = {
      #      "type" : "signIn",
       #     "data" : {
        #        "userInfo": "unKnown",
        #        "serialNum": getSignInInfo.getSerial()
        #    }
       # }
       # asyncio.run(ws_service.sendInfo(json.dumps(Info)));
       # is_login_service_on = False


    # 서비스 종료
    if service_on and finish_time < datetime.now():
        service_on = False

    # cv2.imshow("img",frame)
            

release_camera()
cv2.destroyAllWindows()

# 서비스가 돌아가고 있는 이벤트 루프에 접근
loop = ws_service.loop
# stop 코루틴을 스케줄링
loop.call_soon_threadsafe(loop.create_task, ws_service.stop())



