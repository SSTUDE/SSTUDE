import multiprocessing
import os
import signal

def start_camera_service():
    os.system('python camera.py')

def start_alarm_service():
    os.system('python alarm.py')

def signal_handler(signum, frame):
    camera_process.terminate()
    alarm_process.terminate()
    print("프로세스가 종료되었습니다.")

if __name__ == '__main__':
    # 시그널 핸들러 등록
    signal.signal(signal.SIGINT, signal_handler)

    # 프로세스 생성
    camera_process = multiprocessing.Process(target=start_camera_service)
    alarm_process = multiprocessing.Process(target=start_alarm_service)

    # 프로세스 시작
    camera_process.start()
    alarm_process.start()

    # 프로세스 동기화 대기
    camera_process.join()
    alarm_process.join()