# 사용자의 퍼스널컬러 결과 가져와서 어울리는 색과 비교해서 점수 매기기
from database import connectMySQL
from service import changeId
from colormath.color_diff import delta_e_cie2000 #색차식(색을 수치화)
from colormath.color_objects import LabColor, sRGBColor
from colormath.color_conversions import convert_color
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity  # 코사인 유사도 계산을 위한 scikit-learn 라이브러리 import


# 퍼스널 컬러가져와서 
# 거기에 어울리는 색상들 추출하기
def my_color(userid, current_date, TargetLab):
    connect, curs = connectMySQL()
    with connect.cursor() as curs:
        query = """SELECT result FROM makeups WHERE member_id=%s AND DATE_FORMAT(current_date, '%%Y-%%m-%%d')=%s"""
        curs.execute(query, (userid, current_date))
        result = curs.fetchone()[0]
    
    match_color, _, _, _, _, _ = changeId(result)
    
    similarities = []
    # 16진수를 10진수로 변환(RGB) =>이차원 배열들로 저장할까...
    for mc in match_color:
        rgb = sRGBColor(int(mc[0:2], 16), int(mc[2:4], 16), int(mc[4:6], 16), is_upscaled=True)
        lab = convert_color(rgb, LabColor, through_rgb_type=sRGBColor)
        # base_lab = np.array([lab.lab_l, lab.lab_a, lab.lab_b])
        # print(base_lab)
        
        #### CIEDE2000 기준으로 차이 계산
        delta_e = delta_e_cie2000(TargetLab, lab)
        print(delta_e)
        # similarity_score = 100 - delta_e
        # print(similarity_score)
        
        # similarities.append(similarity_score)
    
    # cosine_similarities = cosine_similarity([lab_color1, lab_color2], [lab_color1, lab_color2])

    
    return 1



# 어울리는 점수 도출하기 
# 그 색상들과 유사도를 측정해서 점수 메기기 