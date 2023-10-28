import cv2
import numpy as np
from sklearn.cluster import KMeans
import matplotlib.pyplot as plt
from skimage import io
from itertools import compress

class DominantColors:

    CLUSTERS = None
    IMAGE = None
    COLORS = None
    LABELS = None

    '''
    클러스터 수 :3개(3개 색상)
    '''
    def __init__(self, image, clusters=3):
        self.CLUSTERS = clusters
        #RGB로 변환
        img = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        #이미지를 2D배열로 변환(높이*너비(이미지 총 픽셀), 3개 색상RGB)
        self.IMAGE = img.reshape((img.shape[0] * img.shape[1], 3))

        #k-means로 픽셀 클러스터링 및 학습
        kmeans = KMeans(n_clusters = self.CLUSTERS)
        kmeans.fit(self.IMAGE)

        # 주요 색상, 레이블 저장
        self.COLORS = kmeans.cluster_centers_
        self.LABELS = kmeans.labels_


    def getHistogram(self):
        #클러스터 수만큼 레이블 만듬-> 빈도수를 전체합으로 나눔
        numLabels = np.arange(0, self.CLUSTERS+1)
        (hist, _) = np.histogram(self.LABELS, bins = numLabels)
        hist = hist.astype("float")
        hist /= hist.sum()

        # 주요색상을 변수에 저장
        colors = self.COLORS
        colors = colors[(-hist).argsort()]
        hist = hist[(-hist).argsort()]
        for i in range(self.CLUSTERS):
            colors[i] = colors[i].astype(int) #색상 정수형으로 변환
        
        '''
        Blue mask 제거(얼굴색은 주로 노랑+빨강색상이기 때문에
        파란색인 영역은 피부색에서 벗어난 영역임
        '''
        fil = [colors[i][2] < 250 and colors[i][0] > 10 for i in range(self.CLUSTERS)]
        colors = list(compress(colors, fil))
        return colors, hist #주요 색상, 빈도수
    
    
    
    
    
    
    

    # def plotHistogram(self):
    #     colors, hist = self.getHistogram()
    #     #creating empty chart
    #     chart = np.zeros((50, 500, 3), np.uint8)
    #     start = 0

    #     #creating color rectangles
    #     for i in range(len(colors)):
    #         end = start + hist[i] * 500
    #         r,g,b = colors[i]
    #         #using cv2.rectangle to plot colors
    #         cv2.rectangle(chart, (int(start), 0), (int(end), 50), (r,g,b), -1)
    #         start = end

    #     #display chart
    #     plt.figure()
    #     plt.axis("off")
    #     plt.imshow(chart)
    #     plt.show()

    #     return colors

    # def rgb_to_hex(self, rgb):
    #     return '#%02x%02x%02x' % (int(rgb[0]), int(rgb[1]), int(rgb[2]))
