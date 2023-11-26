# 📜Porting Manual


## 📝목차
1) [시스템 환경 및 버전정보](#1-시스템-환경-및-버전정보)
2) [포트 정보](#2-포트-정보)
3) [서버 연결](#3-서버-연결)
4) [Docker Swarm](#5-Docker-Swarm)
5) [빌드 및 배포](#4-빌드-및-배포)
6) [Jenkins](#6-Jenkins)
7) [Traefik](#7-Traefik) 




## 1. ⚙시스템 환경 및 버전정보

- Web FrontendIDE : Visual Studio Code 1.84.2
- Android Frnotend IDE : Android Studio Giraffe
- Backend IDE : Intellij Ultimate 2023.1.3
- AI/ML IDE: Visual Studio Code 1.84
- Embedded: Raspberry pi 4B, Debian 12, L80-M3y(GPS 센서), HQ camera module 6mm 광각렌즈 3MP
- Backend : SpringBoot 2.7.13, JDK 11
- Android : Gradle 8.0, Kotlin 1.7.20
- React : React 18.2.0
- AI/ML : FAST API 0.104, PYTHON 3.11.4
- CI CD : AWS EC2 instance - ubuntu 22.04, Docker Swam, Jenkins, traefik:v2.4
- DB : MySQL 8.0.33, Redis 7.2.1, MongoDB 7.0.2

<br>

## 2. 🔌포트 정보

| Port | 이름                          |
|:-----|:----------------------------|
| 8000 | Gateway Service   |
| 8011 | Account Service                       |
| 8012 | Statistic Service                       |
| 8013 | Makeup Service                       |
| 8014 | Health Service                       |
| 8015 | Businfo Service                       |
| 8080 | Jenkins Docker Container    |
| 8081 | Traefik Container    |
| 6379 | Redis Docker Container      |
| 3306 | MySQL Docker Container                   |
| 27017 | MongoDB Docker Container    |

<br>

## 3. 💻 서버 연결



3.1. 포트 개방
```
$ sudo ufw allow {portnumer} 
$ sudo ufw status
```


3.2. 도커 설치 후 실행
```
$ sudo apt update
$ sudo apt-get install docker.io
```

3.3 보안 정책 수정
```aidl
EC2 서비스 페이지 -> 네트워크 및 보안 -> 보안그룹 -> 인바운드 규칙 편집
```

<br>



## 4. 🐋Docker Swarm

4.1 도커스웜 설치
```
$ sudo docker swarm init --advertise-addr [매니저노드ip]
```

4.2 매니저 노드 & 워크 노드
```
To add a worker to this swarm, run the following command:

    docker swarm join --token [token값] [ip주소]

To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.

```

4.3 Overlay Network
```
$ sudo docker network create -d overlay [네트워크 이름]

```

4.4 DB 서비스 설치
```
# MySQL
$ sudo docker service create --name mysql --network mynetwork --constraint 'node.role==manager' --replicas 1 -e MYSQL_ROOT_PASSWORD=[비밀번호] -p 3306:3306 mysql:8.0

# Redis
$ sudo docker service create --name redis --network mynetwork --constraint 'node.role==manager' --replicas 1 -p 6379:6379 redis

# Mongo
$ sudo docker service create --name mongo --network mynetwork --constraint 'node.role==manager' --replicas 1 -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=[비밀번호] -p 27017:27017 mongo
```

<br>

## 5. 🚀 빌드 및 배포

5.1. Dockerfile 작성

```dockerfile
# Dockerfile
FROM adoptopenjdk/openjdk11
ARG JAR_FILE=build/libs/*.jar
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
```

5.2. 로컬에서 도커 이미지 빌드 및 푸시
```
docker build -t {사용자명}/{이미지파일명} .
docker push {사용자명}/{이미지파일명}
```



5.3. EC2에서 도커 서비스 pull 및 실행
```
$ sudo docker service create --name health --network mynetwork -e PASSWORD=[패스워드] -e TZ=Asia/Seoul --constraint 'node.role==worker' --replicas 2 -p 8014:8014 [도커이미지이름]
```




<br>


## 6. 🏭Jenkins

6.1. Jenkins 설치 (매니저 노드)
```
# Jenkins
$ sudo docker run -d \
-u root \
-p 8080:8080 \
--name=jenkins \
-v /home/ubuntu/docker/jenkins-data:/var/jenkins_home \
-v /var/run/docker.sock:/var/run/docker.sock \
-v /usr/bin/docker:/usr/bin/docker \
jenkins/jenkins
```

6.2. Jenkins Pipeline script
```
pipeline {
    agent any
    environment {
        DOCKER_IMAGE = [도커이미지이름]
        PASSWORD = [비밀번호]
    }
    stages {
        stage('Checkout') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'gitlab', usernameVariable: 'GIT_USERNAME', passwordVariable: 'GIT_PASSWORD')]) {
                    sh """
                        rm -rf myrepo
                        mkdir myrepo
                        cd myrepo
                        git init
                        git remote add origin https://lab.ssafy.com/s09-final/S09P31D204.git
                        git config core.sparseCheckout true
                        echo "Backend/busstation/*" > .git/info/sparse-checkout
                        git pull https://${GIT_USERNAME}:${GIT_PASSWORD}@lab.ssafy.com/s09-final/S09P31D204.git [브랜치이름]
                    """
                }
            }
        }
        stage('Build Project') {
            steps {
                dir('myrepo/Backend/busstation') {
                    sh "chmod +x gradlew"
                    sh "./gradlew build" 
                } 
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    dir('myrepo/Backend/busstation') {
                        sh "docker build --build-arg JAR_FILE=build/libs/busstation-0.0.1-SNAPSHOT.jar -t ${DOCKER_IMAGE} ."
                    }
                }
            }
        }
        stage('Push Docker Image'){
            steps{
                script{
                    withCredentials([usernamePassword(credentialsId: 'docker', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) { 
                        sh("echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin")
                        sh "docker push ${DOCKER_IMAGE}"
                    }   
                }   
            }  
        } 
        stage('Deploy'){
            steps{
                sshagent(['ubuntu']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ubuntu@k9d204.p.ssafy.io "sudo docker service rm businfo || true"
                        ssh -o StrictHostKeyChecking=no ubuntu@k9d204.p.ssafy.io "sudo docker service update --image ${DOCKER_IMAGE} businfo || sudo docker service create --name businfo --network mynetwork -e PASSWORD=${PASSWORD} -e TZ=Asia/Seoul --constraint 'node.role==worker' --replicas 2 -p 8015:8015 ${DOCKER_IMAGE}"
                    """
                }   
            } 
        }
        stage('Clean up'){
             steps{
                 sshagent(['ubuntu']) {
                     sh """
                         ssh -o StrictHostKeyChecking=no ubuntu@k9d204.p.ssafy.io "sudo docker image prune -a -f"
                         ssh -o StrictHostKeyChecking=no ubuntu@k9d204a.p.ssafy.io "sudo docker image prune -a -f"
                         ssh -o StrictHostKeyChecking=no ubuntu@3.38.177.111 "sudo docker image prune -a -f"
                     """
                 }
             }
         }
    }
}

```

 
<br>

## 7. 🌐Traefik

7.1 설정 폴더 및 파일 생성
```
sudo mkdir /etc/traefik
sudo touch /etc/traefik/traefik.yml
sudo touch /etc/traefik/acme.json
sudo touch /etc/traefik/dynamic_conf.yml
```

7.2. Traefik 설정파일
```
#dynamic_conf.yml
http:
  services:
    greeting:
      loadBalancer:
        servers:
          - url: "http://k9d204a.p.ssafy.io:8000"
          - url: "http://3.38.177.111:8000"

  routers:
    greeting-http:
      entryPoints:
        - http
      rule: "Host(`k9d204.p.ssafy.io`)"
      service: greeting
      middlewares:
        - redirect_to_https
    greeting-https:
      entryPoints:
        - https
      rule: "Host(`k9d204.p.ssafy.io`)"
      service: greeting
      tls:
        certResolver: letsencrypt

  middlewares:
    redirect_to_https:
      redirectScheme:
        scheme: https
        permanent: true



# traefik.yml
log:
  level: error

entryPoints:
  http:
    address: ":80"
  https:
    address: ":443"
  traefik:
    address: ":8081"

api:
  dashboard: true
  insecure: true

providers:
  docker:
    endpoint: "unix:///var/run/docker.sock"
    exposedByDefault: false
    swarmMode: true  
    network: "mynetwork"
  file:
    filename: "/etc/traefik/dynamic_conf.yml"
    watch: true

certificatesResolvers:
  letsencrypt:
    acme:
      email: "your@email.com"
      storage: "/etc/traefik/acme.json"
      httpChallenge:
        entryPoint: "http"

```

7.3. Traefik 설치
```

$ sudo docker service create --name traefik \
    --mode global  \
    --publish 80:80 --publish 443:443 --publish 8081:8080 \
    --mount type=bind,source=/var/run/docker.sock,target=/var/run/docker.sock \
    --mount type=bind,source=/etc/traefik/traefik.yml,target=/etc/traefik/traefik.yml \
    --mount type=bind,source=/etc/traefik/acme.json,target=/acme.json \
    traefik \
    --configFile=/etc/traefik/traefik.yml

```


