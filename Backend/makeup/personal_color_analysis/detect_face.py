# coding: utf-8
# import the necessary packages
from imutils import face_utils
import numpy as np
import dlib
import cv2
import matplotlib.pyplot as plt
import os

class DetectFace:
    def __init__(self, url):
        self.detector = dlib.get_frontal_face_detector()
        #    analysis(os.path.join(dirpath,imgpath))로, 이미지 경로 지정해주기

        # current_directory = os.getcwd()
        # relative_path = 'resource\shape_predictor_68_face_landmarks.dat'
        # path = os.path.join(current_directory, relative_path)
        print(url)
        
        path = 'C:/Users/SSAFY/Desktop/S09P31D204/Backend/makeup/personal_color_analysis/resource/shape_predictor_68_face_landmarks.dat'
        self.predictor = dlib.shape_predictor(path)

        #face detection part
        self.img = cv2.imread(url)
        if self.img is None:
            
            raise ValueError(f"Failed to load image from {url} {self.img}")

        # resp = urllib.request.urlopen(url)
        # image = np.asarray(bytearray(resp.read()), dtype=np.uint8)
        # self.img = cv2.imdecode(image, -1) #cv2.IMREAD_COLOR
        
        
        # if self.img.shape[0]>500:
        #    self.img = cv2.resize(self.img, dsize=(0,0), fx=0.8, fy=0.8)

        # init face parts
        self.right_eyebrow = []
        self.left_eyebrow = []
        self.right_eye = []
        self.left_eye = []
        self.left_cheek = []
        self.right_cheek = []

        # detect the face parts and set the variables
        self.detect_face_part()


    # return type : np.array
    def detect_face_part(self):
        face_parts = [[],[],[],[],[],[],[]]
        # detect faces in the grayscale image
        rect = self.detector(cv2.cvtColor(self.img, cv2.COLOR_BGR2GRAY), 1)[0]

        # determine the facial landmarks for the face region, then
        # convert the landmark (x, y)-coordinates to a NumPy array
        shape = self.predictor(cv2.cvtColor(self.img, cv2.COLOR_BGR2GRAY), rect)
        shape = face_utils.shape_to_np(shape)

        idx = 0
        # loop over the face parts individually
        print("face_utils = ",len(shape))
        for (name, (i, j)) in face_utils.FACIAL_LANDMARKS_IDXS.items():
            if idx>=len(face_parts): break
            # print(i,j)
            # print(shape[i:j])
            # print(idx,len(face_parts))
            print(name)
            face_parts[idx] = shape[i:j]
            idx += 1
        # face_parts = face_parts[1:5]

        shape_info = self.img.shape
        X = np.array([[0, 0], [shape_info[1], 0], [shape_info[1],  shape_info[0]],[0, shape_info[0]] ])
        print("1. ==", X)
        print("2. ==", face_parts[0])
        print("3. ==", face_parts[1])
        print("4. ==", face_parts[2])
        naver = self.extract_face_part(X)
        # cv2.imshow("filtered", naver)
        # cv2.imshow("filter nono", self.img)
        # cv2.waitKey(0)
        # set the variables
        # Caution: this coordinates fits on the RESIZED image.
        self.right_eyebrow = self.extract_face_part(face_parts[2])
        cv2.imshow("right_eyebrow", self.right_eyebrow)
        cv2.waitKey(0)
        # cv2.imshow("right_eyebrow", self.right_eyebrow)
        # cv2.waitKey(0)
        self.left_eyebrow = self.extract_face_part(face_parts[3])
        cv2.imshow("left_eyebrow", self.left_eyebrow)
        cv2.waitKey(0)
        self.right_eye = self.extract_face_part(face_parts[4])
        cv2.imshow("right_eye", self.right_eye)
        cv2.waitKey(0)
        self.left_eye = self.extract_face_part(face_parts[5])
        cv2.imshow("left_eye", self.left_eye)
        cv2.waitKey(0)
        # Cheeks are detected by relative position to the face landmarks
        self.left_cheek = self.img[shape[29][1]:shape[33][1], shape[4][0]:shape[48][0]]
        cv2.imshow("left_cheek", self.left_cheek)
        cv2.waitKey(0)
        self.right_cheek = self.img[shape[29][1]:shape[33][1], shape[54][0]:shape[12][0]]
        cv2.imshow("right_cheek", self.right_cheek)
        cv2.waitKey(0)
    # parameter example : self.right_eye
    # return type : image
    def extract_face_part(self, face_part_points):
        (x, y, w, h) = cv2.boundingRect(face_part_points)
        crop = self.img[y:y+h, x:x+w]
        adj_points = np.array([np.array([p[0]-x, p[1]-y]) for p in face_part_points])

        # Create an mask
        mask = np.zeros((crop.shape[0], crop.shape[1]))
        cv2.fillConvexPoly(mask, adj_points, 1)
        mask = mask.astype(np.bool_)

        crop[np.logical_not(mask)] = [255,0,0]

        return crop
    