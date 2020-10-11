# nginx静态服务配置
/conf/docker.conf
server {
    listen       80;
    location / {
        root   /var/www/html;
        index  index.html index.htm;
}
    location ~ \.(gif|jpg|png)$ {
        root /static;
        index index.html index.htm;
    }
}

# 根目录下建的文件。  compose配置 镜像。
docker-compose.yml
version: '3.1'
services:
  nginx:
    restart: always
    image: nginx
    ports:
      - 8091:80
    volumes:
      - ./nginx/conf.d/:/etc/nginx/conf.d
      - ./frontend/dist:/var/www/html/
      - ./static/:/static/