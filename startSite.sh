docker stop CairParavel
docker rm CairParavel
docker rmi marito1256/cairparavel-webserver
docker pull marito1256/cairparavel-webserver:latest
docker run --name CairParavel -d -p 5000:5000 marito1256/cairparavel-webserver:latest
