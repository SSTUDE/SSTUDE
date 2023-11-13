import multiprocessing
import os

def start_camera_service():
    os.system('python camera.py')

def start_alarm_service():
    os.system('python alarm.py')

if __name__ == '__main__':
    # 프로세스 생성
    camera_process = multiprocessing.Process(target=start_camera_service)
    alarm_process = multiprocessing.Process(target=start_alarm_service)

    # 프로세스 시작
    camera_process.start()
    alarm_process.start()

    # 프로세스 동기화 대기
    camera_process.join()
    alarm_process.join()
