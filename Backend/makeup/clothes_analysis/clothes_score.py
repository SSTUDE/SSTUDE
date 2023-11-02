# import cv2
import numpy as np
from clothes_analysis.color_extract import color_extract
from clothes_analysis.clothes_detect_face import DetectFace
from colormath.color_objects import LabColor, sRGBColor, HSVColor
from colormath.color_conversions import convert_color
from urllib.request import urlopen
import cv2

class clothes_score:
    
    def __init__(self, url):
        df = DetectFace(url)
        clusters=4
        dc = color_extract(df.under_chin, clusters)
        
        #imgpath를 가져오기
        cluster = 3
        # 색얻기
        temp = []
        
        # self.img = cv2.imread(url)
        # if self.img is None:
        #     raise ValueError(f"Failed to load image from {url} {self.img}")
        # # url로 불러온 이미지를 numpy형태로 바꾸기
        
        # dc = color_extract(self.img, cluster)
        print(dc)
        clothes_color, _ = dc.getHistogram() #얼굴부위별 색상의 빈도가져오기 
        temp.append(np.array(clothes_color[0])) #주요 색상만 뽑아내기
        print("주요색상")
        print(clothes_color[0]) # RGB
    
    # cheek = np.mean([temp[0], temp[1]], axis=0)
    # eyebrow = np.mean([temp[2], temp[3]], axis=0)
    # eye = np.mean([temp[4], temp[5]], axis=0)
    
    
        Lab_b, hsv_s = [], []
        rgb = sRGBColor(temp[0][0], temp[0][1], temp[0][2], is_upscaled=True)
        #색상을 lab으로 변환
        lab = convert_color(rgb, LabColor, through_rgb_type=sRGBColor)
        #hsv로 변환
        hsv = convert_color(rgb, HSVColor, through_rgb_type=sRGBColor)
        
        # 그중에서 lab_b와 s만 사용
        # Lab_b.append(float(format(lab.lab_b,".2f")))
        # hsv_s.append(float(format(hsv.hsv_s,".2f"))*100)

        print(lab)
        print(hsv)
        
        # 사용자의 퍼스널컬러 결과 가져와서 어울리는 색과 비교해서 점수 매기기
        
    #    #퍼스널컬러 분류
    #    # 가중치와 분석 중앙값으로 퍼스널컬러 판단
    #     Lab_weight = [30, 20, 5]
    #     hsv_weight = [10, 1, 1]
    #     if(tone_analysis.is_warm(Lab_b, Lab_weight)):
    #         if(tone_analysis.is_spr(hsv_s, hsv_weight)):
    #             tone = '봄웜톤(spring)'
    #         else:
    #             tone = '가을웜톤(fall)'
    #     else:
    #         print("쿨 여기까지??")
    #         if(tone_analysis.is_smr(hsv_s, hsv_weight)):
    #             tone = '여름쿨톤(summer)'
    #         else:
    #             tone = '겨울쿨톤(winter)'
            
    #     return tone
