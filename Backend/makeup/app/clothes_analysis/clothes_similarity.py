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
    
    # print(result)
    match_color, _, _, _, _, _, _ = changeId(result)
    
    match_color = ['FFDAB9', 'FFDEAD', 'FFE4B5', 'FFB6C1', 'FFA07A', 'FF7F50', 'FF6347', 'FFD700', 'FFA500','FF8C00', 
     'F08080','D8BFD8', 'D2B48C', 'CD5C5C', 'BDB76B', 'BC8F8F', 'B0C4DE','B0E57C', '9ACD32', '98FB98', 
     '9370DB', 'F4A460', 'DEB887', 'FFE4E1', 'E6E6FA', 'FFC0CB', 'FFB347', 'F5BA59', 'E97451', 'E95C4B',
     'E89866', 'E39191', 'DEA5A4', 'D9A6A9', 'D68A59', 'D6738A', 'D0417E', 'C46210', 'C19A6B',  'BC987E',
     'B94E48', 'B2EC5D', 'B0BFDE', 'AE98AA', 'AD8884', 'AD6DAD', 'A67B5B', 'A3C1AD', 'A1CAF1', '9E5B40', 
     '9EBD9E', '9A6EAE', '967117', '967BB6', '954535', '9470C4', '926F5B','578363', '8DB600', '87A96B',
     '836953', '80461B', '77DD77', '76D7EA', '72A0C1', '71A6D2', '6F4E37', '6C541E', '6A5ACD', '66ADA4',
     '6456B7', '624E9A', '60A57F', '5D8AA8', '5B92E5', '44798E', '42647F','3A8EBA', '3A75C4', '39627C'
    ]
    
    similarities = []
    i = 0
    sum = 0
    for idx, mc in enumerate(match_color):
        rgb = sRGBColor(int(mc[0:2], 16), int(mc[2:4], 16), int(mc[4:6], 16), is_upscaled=True)
        lab = convert_color(rgb, LabColor, through_rgb_type=sRGBColor)
        
        #### CIEDE2000 기준으로 차이 계산()
        delta_e = delta_e_cie2000(TargetLab, lab)
        sum+=delta_e
        if similarities and min(similarities) > delta_e:
            i = idx
        
        similarities.append(delta_e)
    
    print(sum/len(match_color), sum)
    print(i, min(similarities), match_color[i])
    score = 100-int(min(similarities))
    print(score)
    
    
    return score



# 어울리는 점수 도출하기 
# 그 색상들과 유사도를 측정해서 점수 메기기 