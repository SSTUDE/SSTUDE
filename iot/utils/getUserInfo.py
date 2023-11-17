
import os
from face_recognition import load_image_file as loadImageFile
from face_recognition import face_encodings as encodeFace
from secrets import token_urlsafe

def from_users_folder():
	# 현재 디렉토리 내의 './users' 폴더에 있는 모든 폴더를 리스트업
	user_folders = [f for f in os.listdir('./users') if os.path.isdir(os.path.join('./users', f))]

	known_face_names = []
	known_face_encodings = []

	for user_folder in user_folders:
		user_image_path = os.path.join('./users', user_folder)
		
		# 해당 폴더에 있는 모든 파일을 리스트업
		user_images = [f for f in os.listdir(user_image_path) if os.path.isfile(os.path.join(user_image_path, f))]
		
		# 이미지가 없다면 무시
		if not user_images:
			continue

		# 첫 번째 이미지만 사용
		first_image_path = os.path.join(user_image_path, user_images[0])
		user_image = loadImageFile(first_image_path)
		
		# 이미지에서 얼굴 인코딩
		face_encodings = encodeFace(user_image)
		
		# 얼굴 인코딩이 있을 경우만 저장
		if face_encodings:
			known_face_encodings.append(face_encodings[0])
			known_face_names.append(user_folder)

	print(known_face_names)
	return known_face_encodings, known_face_names
	
def createUser():
    file_name = token_urlsafe(16)
    path = f'./users/{file_name}'
    os.makedirs(path)
    print("The new directory is created!")
    return file_name
