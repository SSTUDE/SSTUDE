import time
import json
from datetime import datetime, timedelta
import pygame

def read_alarm_settings():
    with open('./alarmInform.json', 'r', encoding='utf-8') as f:
        settings = json.load(f)
    return settings

def alarm(start_time, duration_minutes, play_times, song_path):
    end_time = start_time + timedelta(minutes=duration_minutes)
    pygame.mixer.init()  # pygame 믹서 초기화
    pygame.mixer.music.load(song_path)  # 재생할 음악 파일 로드
    
    while True:
        current_time = datetime.now()
        # 시작 시간 이후 현재 시간이 종료 시간 전인지 체크
        if start_time <= current_time < end_time:
            print('start alarm')
            for _ in range(play_times):
                pygame.mixer.music.play()  # 음악 재생
                while pygame.mixer.music.get_busy():  # 음악이 재생 중일 때는 대기
                    time.sleep(1)
                if datetime.now() >= end_time: # 알람 소리를 다 울렸는지 혹은 시간이 끝났는지 체크
                    break
            return  # 알람이 울린 후 오늘의 알람 종료
        # 현재 시간이 시작 시간 이전이면, 시작 시간까지 대기
        elif current_time < start_time:
            print('wait alarm')
            time.sleep((start_time - current_time).total_seconds())
        # 현재 시간이 종료 시간 이후면, 다음날 알람으로 설정
        else:
            print('Finish alarm')
            start_time += timedelta(days=1)
            end_time = start_time + timedelta(minutes=duration_minutes)
            time.sleep((start_time - current_time).total_seconds())

if __name__ == '__main__':
    
    while True:
        settings = read_alarm_settings()
        # 매일 같은 시간에 알람을 설정
        start_time = datetime.now().replace(hour=settings['start_hour'], minute=settings['start_minute'], second=0, microsecond=0)
        if datetime.now() > start_time:
            # 이미 시간이 지났으면 다음날로 설정
            start_time += timedelta(days=1)

        alarm(start_time, settings['duration_minutes'], settings['play_times'], settings['song_path'])

        # 다음 알람까지의 대기 시간 계산
        sleep_time = (start_time - datetime.now()).total_seconds()
        # 잘못된 시간 설정이 없는지 혹은 너무 긴 대기를 방지
        sleep_time = max(0, min(sleep_time, 86400))  # 최소 0초, 최대 24시간 대기
        time.sleep(sleep_time)
