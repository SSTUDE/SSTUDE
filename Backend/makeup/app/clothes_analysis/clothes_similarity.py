# 사용자의 퍼스널컬러 결과 가져와서 어울리는 색과 비교해서 점수 매기기
from database import connectMySQL
from service import changeId
from colormath.color_diff import delta_e_cie2000 #색차식(색을 수치화)
from colormath.color_objects import LabColor, sRGBColor
from colormath.color_conversions import convert_color
import numpy as np

# 퍼스널 컬러가져와서 
# 거기에 어울리는 색상들 추출하기
def my_color(userid, current_date, TargetLab):
    connect, curs = connectMySQL()
    with connect.cursor() as curs:
        query = """SELECT result FROM makeups WHERE member_id=%s AND DATE_FORMAT(current_date, '%%Y-%%m-%%d')=%s"""
        curs.execute(query, (userid, current_date.date()))
        result = curs.fetchone()[0]
    
    print(result)
    match_color, _, _, _, _, _, _ = changeId(result)
    
    
    similarities = []
    i = 0
    # sum = 0
    for idx, mc in enumerate(match_color):
        rgb = sRGBColor(int(mc[0:2], 16), int(mc[2:4], 16), int(mc[4:6], 16), is_upscaled=True)
        lab = convert_color(rgb, LabColor, through_rgb_type=sRGBColor)
        
        #### CIEDE2000 기준으로 차이 계산()
        delta_e = delta_e_cie2000(TargetLab, lab)
        # sum+=delta_e
        if similarities and min(similarities) > delta_e:
            i = idx
        
        similarities.append(delta_e)
        
    ## 차이가 많이나면,(즉 평균이 높으면 -> 높을수록 )
    
    # print(sum/len(match_color), sum)
    print(i, min(similarities), match_color[i])
    score = 100-int(min(similarities))
    print(final_score(score)) 
    # print(score)
    # print(final_score(100-sum/len(match_color)))
    
    
    return final_score(score)


# 어울리는 점수 도출하기 
# 그 색상들과 유사도를 측정해서 점수 메기기 

def final_score(score):
    if score>=90:
        return score
    elif score>=80:
        return score*0.9
    elif score>=70:
        return score*0.8
    elif score>=60:
        return score*0.7
    elif score>=50:
        return score*0.6
    else:
        return score*0.5
    