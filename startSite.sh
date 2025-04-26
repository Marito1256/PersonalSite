docker stop PersonalSite
docker rm PersonalSite
docker rmi marito1256/cairparavel-webserver
docker pull marito1256/cairparavel-webserver:latest
docker run --name PersonalSite -d -p 5000:5000 marito1256/cairparavel-webserver:latest
