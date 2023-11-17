from subprocess import check_output as chkopt
import secrets
import json

def getSerial():
    try:
        output = chkopt(['cat', '/proc/cpuinfo']).decode()

        # 결과에서 'Serial' 정보 추출
        lines = output.split('\n')
        serial = None
        for line in lines:
            if line.startswith('Serial'):
                serial = line.split(':')[-1].strip()
                break

        if serial:
            print("Serial 정보:", serial)
            return serial
        else:
            print("Serial 정보를 찾을 수 없습니다.")
    except Exception as e:
        print("Error: make random string")

    # 16자리 랜덤 문자열 생성
    random_string = secrets.token_hex(8)  # 16자리의 랜덤 문자열 생성
    print("랜덤 문자열:", random_string)
    return random_string
    
def loadUserInfo(file_name):
    # 파일이 존재하는지 확인
    try:
        with open(file_name, 'r') as f:
            data = json.load(f)
	    
    except :
        # 파일이 존재하지 않으면 새로운 파일을 생성하고 기본 정보를 저장
        data = {
            "userInfo": "",
            "serialNum": getSerial()
        }
        with open(file_name, 'w') as f:
            json.dump(data, f)
	    
    return data

def updateUserInfo(file_name, userName):
    
    # 파일을 불러옵니다
    data = loadUserInfo(file_name)
    
    # 사용자 정보를 업데이트합니다.
    data["userInfo"] = userName

    # 업데이트된 데이터를 파일에 다시 저장합니다.
    with open(file_name, 'w') as f:
        json.dump(data, f)
