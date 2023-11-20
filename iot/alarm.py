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

    while True:
        current_time = datetime.now()
        
        settings = read_alarm_settings()
        start_time = datetime.now().replace(hour=settings['start_hour'], minute=settings['start_minute'], second=0, microsecond=0)
        end_time = start_time + timedelta(minutes=duration_minutes)


        if start_time <= current_time < end_time:
            print('start alarm')
            for _ in range(play_times):
                pygame.mixer.music.play()
                while pygame.mixer.music.get_busy():
                    time.sleep(1)
                if datetime.now() >= end_time:
                    break
            return  # 알람이 울린 후 오늘의 알람 종료
        elif current_time < start_time:
            print('wait alarm')
            time.sleep(min((start_time - current_time).total_seconds(), 10))  # 설정 파일을 확인할 시간 간격
        else:
            print('Finish alarm')
            start_time += timedelta(days=1)
            end_time = start_time + timedelta(minutes=duration_minutes)
            time.sleep(min((start_time - current_time).total_seconds(), 10))

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
