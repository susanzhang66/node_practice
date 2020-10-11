# 08 docker-compose安装
apt install docker-compose


// docker-compose.yml
version: '3.1'
services:
 hello-world:
 image: hello-world


 # 09compose项目

 Compose项目是 Docker 官方的开源项目，负责实现对 Docker 容器集群的快速编排。

# docker-compose.yml
version: '3.1'
services:
mongo:
image: mongo
restart: always
ports:
- 27017:27017
mongo-express:
image: mongo-express
restart: always
ports:
- 8000:8081