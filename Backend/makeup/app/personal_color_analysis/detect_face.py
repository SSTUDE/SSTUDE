
from imutils import face_utils
import numpy as np
import dlib
import cv2
# import matplotlib.pyplot as plt
import os

class DetectFace:
    def __init__(self, url):
        #얼굴 감지
        self.detector = dlib.get_frontal_face_detector()
        
        # 얼굴 특징점 예측하는 데 훈련된 dat파일 사용
        current_directory = os.getcwd()
        relative_path = 'personal_color_analysis/resource/shape_predictor_68_face_landmarks.dat'
        path = os.path.join(current_directory, relative_path)
        # path = 'C:/Users/SSAFY/Desktop/S09P31D204/Backend/makeup/personal_color_analysis/resource/shape_predictor_68_face_landmarks.dat'
        
        # dat파일로 얼굴의 특징점 예측
        self.predictor = dlib.shape_predictor(path)

        # 이미지 읽어오기 
        self.img = cv2.imread(url)
        if self.img is None:
            raise ValueError(f"Failed to load image from {url} {self.img}")

        # 얼굴 부분별 저장
        self.right_eyebrow = []
        self.left_eyebrow = []
        self.right_eye = []
        self.left_eye = []
        self.left_cheek = []
        self.right_cheek = []

        self.detect_face_part()



    def detect_face_part(self):
        face_parts = [[],[],[],[],[],[],[]]
        # 이미지크기를 1로하고, BGR->그레이스케일 이미지로 변환해서 얼굴 감지
        rect = self.detector(cv2.cvtColor(self.img, cv2.COLOR_BGR2GRAY), 1)[0]

        # 이미지를 gray스케일로 변환 후 이전얼굴위치(rect)와 이미지를 사용해 특징점 예측
        # =>numpy배열로 shape만들어서 face_part에 저장하려고
        shape = self.predictor(cv2.cvtColor(self.img, cv2.COLOR_BGR2GRAY), rect)
        shape = face_utils.shape_to_np(shape)

        #얼굴의 각 부위별로 face_parts에 저장
        idx = 0
        for (name, (i, j)) in face_utils.FACIAL_LANDMARKS_IDXS.items():
            if idx>=len(face_parts): break
            face_parts[idx] = shape[i:j]
            idx += 1
        # face_parts = face_parts[1:5]

        shape_info = self.img.shape
        X = np.array([[0, 0], [shape_info[1], 0], [shape_info[1],  shape_info[0]],[0, shape_info[0]] ])
        naver = self.extract_face_part(X) 
        
        # 얼굴 확인
        # cv2.imshow("filtered", naver)
        # cv2.imshow("filter nono", self.img)
        # cv2.waitKey(0)
        # cv2.waitKey(0)
        
        # 변수에 각 부분 할당
        self.right_eyebrow = self.extract_face_part(face_parts[2])
        self.left_eyebrow = self.extract_face_part(face_parts[3])
        self.right_eye = self.extract_face_part(face_parts[4])
        self.left_eye = self.extract_face_part(face_parts[5])
        self.left_cheek = self.img[shape[29][1]:shape[33][1], shape[4][0]:shape[48][0]]
        self.right_cheek = self.img[shape[29][1]:shape[33][1], shape[54][0]:shape[12][0]]

    # 필터씌우기
    def extract_face_part(self, face_part_points):
        #얼굴에 사각형 입히고 부위 잘라내기
        (x, y, w, h) = cv2.boundingRect(face_part_points)
        crop = self.img[y:y+h, x:x+w]
        adj_points = np.array([np.array([p[0]-x, p[1]-y]) for p in face_part_points])

        # 해당 얼굴 부위 이미지 크기와 같은 크기의 영행렬(mask)을 생성
        mask = np.zeros((crop.shape[0], crop.shape[1]))
        cv2.fillConvexPoly(mask, adj_points, 1)
        #boolean으로 바꿔서 
        mask = mask.astype(np.bool_)

        # 얼굴부위가 아닌곳은 파란색으로 채워서 강조
        crop[np.logical_not(mask)] = [255,0,0]

        return crop
    