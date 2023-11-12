# import cv2
import numpy as np
from personal_color_analysis import tone_analysis
from personal_color_analysis.detect_face import DetectFace
from personal_color_analysis.color_extract import DominantColors
from colormath.color_objects import LabColor, sRGBColor, HSVColor
from colormath.color_conversions import convert_color

def analysis(imgpath):
    # 열굴인식
    df = DetectFace(imgpath)
    face = [df.left_cheek, df.right_cheek,
            df.left_eyebrow, df.right_eyebrow,
            df.left_eye, df.right_eye]

    # 색얻기
    temp = []
    clusters = 4
    for f in face:
        dc = DominantColors(f, clusters)
        face_part_color, _ = dc.getHistogram() #얼굴부위별 색상의 빈도가져오기 
        temp.append(np.array(face_part_color[0])) #주요 색상만 뽑아내기
    cheek = np.mean([temp[0], temp[1]], axis=0)
    eyebrow = np.mean([temp[2], temp[3]], axis=0)
    eye = np.mean([temp[4], temp[5]], axis=0)
    
    
    Lab_b, hsv_s = [], []
    color = [cheek, eyebrow, eye]
    for i in range(3):
        rgb = sRGBColor(color[i][0], color[i][1], color[i][2], is_upscaled=True)
        #색상을 lab으로 변환
        lab = convert_color(rgb, LabColor, through_rgb_type=sRGBColor)
        #hsv로 변환
        hsv = convert_color(rgb, HSVColor, through_rgb_type=sRGBColor)
        
        #그중에서 lab_b와 s만 사용
        Lab_b.append(float(format(lab.lab_b,".2f")))
        hsv_s.append(float(format(hsv.hsv_s,".2f"))*100)


   #퍼스널컬러 분류
   # 가중치와 분석 중앙값으로 퍼스널컬러 판단
    Lab_weight = [30, 20, 5]
    hsv_weight = [10, 1, 1]
    if(tone_analysis.is_warm(Lab_b, Lab_weight)):
        if(tone_analysis.is_spr(hsv_s, hsv_weight)):
            tone = '봄 웜톤(spring)'
        else:
            tone = '가을 웜톤(fall)'
    else:
        print("쿨 여기까지??")
        if(tone_analysis.is_smr(hsv_s, hsv_weight)):
            tone = '여름 쿨톤(summer)'
        else:
            tone = '겨울 쿨톤(winter)'
            
    return tone
