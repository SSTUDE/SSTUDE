import dump


def changeId(result):
    if result=='봄웜':
        match_color = dump.spring_tone[0]
        hair = dump.spring_tone[1]
        accessary = dump.spring_tone[2]
        expl = dump.spring_tone[3]
        skin = dump.spring_tone[4]
        eye = dump.spring_tone[5]
        eng = dump.spring_tone[7]
        
    elif result=='여름쿨':
        match_color = dump.summer_tone[0]
        hair = dump.summer_tone[1]
        accessary = dump.summer_tone[2]
        expl = dump.summer_tone[3]
        skin = dump.summer_tone[4]
        eye = dump.summer_tone[5]
        eng = dump.summer_tone[7]
        
    elif result=='가을웜':
        match_color = dump.fall_tone[0]
        hair = dump.fall_tone[1]
        accessary = dump.fall_tone[2]
        expl = dump.fall_tone[3]
        skin = dump.fall_tone[4]
        eye = dump.fall_tone[5]
        eng = dump.fall_tone[7]
        
    elif result=='겨울쿨':
        match_color = dump.winter_tone[0]
        hair = dump.winter_tone[1]
        accessary = dump.winter_tone[2]
        expl = dump.winter_tone[3]
        skin = dump.winter_tone[4]
        eye = dump.winter_tone[5]
        eng = dump.winter_tone[7]
        
    return match_color, hair, accessary, expl, skin, eye, eng