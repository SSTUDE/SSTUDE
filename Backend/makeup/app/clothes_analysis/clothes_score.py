# import cv2
import numpy as np
from clothes_analysis.color_extract import color_extract
from clothes_analysis.clothes_detect_face import DetectFace
from colormath.color_objects import LabColor, sRGBColor, HSVColor
from colormath.color_conversions import convert_color
from clothes_analysis.clothes_similarity import *

class clothes_score:
    
    def __init__(self, url, userid, current_date):
        # 얼굴에서 일정 높이 아래 좌표 가져옴
        df = DetectFace(url)
        clusters=4
        temp = []
        
        dc = color_extract(df.under_chin, clusters)
        # 색얻기
        print(dc)
        clothes_color, _ = dc.getHistogram2() #얼굴부위별 색상의 빈도가져오기 
        temp.append(np.array(clothes_color[0])) #주요 색상만 뽑아내기
        print("주요색상")
        print(clothes_color[0]) # RGB
    
        rgb = sRGBColor(temp[0][0], temp[0][1], temp[0][2], is_upscaled=True)
        #색상을 lab으로 변환
        lab = convert_color(rgb, LabColor, through_rgb_type=sRGBColor)
        print(lab)
        # 사용자의 퍼스널컬러 결과 가져와서 어울리는 색과 비교해서 점수 매기기  
        self.score = my_color(userid, current_date, lab)
    