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
# getSignInInfo.loadUserInfo(userSignInInfoFile)

# 2. 웹소켓 실행
def start_websocket_service():
    global ws_service
    ws_service = WebSocketService(portNo=8765)
    ws_service.start()
    
ws_service = None
thread = threading.Thread(target=start_websocket_service)
thread.start()

# 카메라 등록
cam = cv2.VideoCapture(0, cv2.CAP_V4L2)
if not cam.isOpened():
    print("카메라를 열 수 없습니다.")
    exit()

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
update_min = 6
finish_time = datetime.now()
while True:
    
    userRecogn = False
    Info = {
            "type" : "",
            "data" : ""
        }
    
    ret, frame = cam.read()
    now = datetime.now()
    if not ret:
        print("프레임을 읽을 수 없습니다. 종료합니다")
        break
    
    
    # Only process every other frame of video to save time
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
            best_match_index = np.argmin(face_distances)
            if matches[best_match_index]:
                name = known_face_names[best_match_index]
                userRecogn = True
                
            face_names.append(name)


    if userRecogn :
        getSignInInfo.updateUserInfo(userSignInInfoFile, name)
        data = getSignInInfo.loadUserInfo(userSignInInfoFile)
        
        Info = {
            "type" : "signUp",
            "data" : data
        }
    
    
    # Display the results #######
    for (top, right, bottom, left), name in zip(face_locations, face_names):
        # Scale back up face locations since the frame we detected in was scaled to 1/4 size
        top *= 4
        right *= 4
        bottom *= 4
        left *= 4

        # Draw a box around the face
        cv2.rectangle(frame, (left, top), (right, bottom), (0, 0, 255), 2)

        # Draw a label with a name below the face
        cv2.rectangle(frame, (left, bottom - 35), (right, bottom), (0, 0, 255), cv2.FILLED)
        font = cv2.FONT_HERSHEY_DUPLEX
        cv2.putText(frame, name, (left + 6, bottom - 6), font, 1.0, (255, 255, 255), 1)
    
    process_this_frame = not process_this_frame
    
    cv2.imshow("Camera", frame)
    #############################

    key = cv2.waitKey(1)

    # for que test
    if key== 113 or key == 81:
        message = ws_service.checkLatestMessage()
        msg = json.loads(jsonString)
        
        msg_type = msg.get("type")
        print("Check Message : ", msg)
        
        
    
    if key==27:
        break

    # 서비스 유지시간 업데이트
    if key == 32 :
    #    if key == 32 and is_need_to_update(now):
        update_finish_time(now)
        print("타겟 시간 변경 : ", finish_time)
        asyncio.run(ws_service.sendInfo(json.dumps(Info)));

    # 서비스 실행
    if key == 32 and not service_on :
        update_finish_time(now)
        print("타겟 시간 : ", finish_time)
        service_on = True
        
        ## 
        open_service()
        asyncio.run(ws_service.sendInfo(json.dumps(Info)));

    # 서비스 종료
    if service_on and finish_time < datetime.now():
        service_on = False
        
        ## 
        close_service()

        data = getSignInInfo.loadUserInfo(userSignInInfoFile)
        Info = {
            "type" : "signOut",
            "data" : data
        }
        asyncio.run(ws_service.sendInfo(json.dumps(Info)));
        

cam.release()
cv2.destroyAllWindows()
ws_service.stop()

