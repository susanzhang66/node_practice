# 拉取官方镜像 - 面向docker的只读模板
docker pull nginx
# 查看
docker images nginx
# 启动镜像
mkdir www
echo 'hello docker!!' >> www/index.html
# 启动
# www目录里面放一个index.html
# 8000:服务器（实体机）映射 80:nginx端口（虚拟机）；  2. $PWD/www 映射 虚拟机usr/share/nginx/html（docker的默认路径），3.镜像的名字 nginx
docker run -p 8000:80 -v $PWD/www:/usr/share/nginx/html nginx
# 后台启动
docker run -p 80:80 -v $PWD/www:/usr/share/nginx/html -d nginx
# 停止
docker stop ff6
# 查看进程
docker ps
docker ps -a // 查看全部
# 伪终端 ff6容器的uuid
# -t 选项让Docker分配一个伪终端（pseudo-tty）并绑定到容器的标准输入上，
# -i 则让容器的标准输入保持打开
# 伪终端 ff6容器的uuid
docker exec -it ff6 /bin/bash
# 删除镜像  f66(是容器的id)
docker rm ff6

# 进入docker的伪终端 
docker exec -it ff6 /bin/bash



