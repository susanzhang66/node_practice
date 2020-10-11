# Dockerfile  定制镜像

# 告诉它哪个镜像 写。
FROM nginx:latest
# 定制镜像 执行的指定
RUN echo '<h1>Hello, Kaikeba!</h1>' > /usr/share/nginx/html/index.html


# 定制 ngigx镜像 : kaikeba 是版本号，（ . :是dockerFile的路径）
docker build -t nginx:kaikeba .
# 运行
docker run -p 80:80 nginx:kaikeba
 