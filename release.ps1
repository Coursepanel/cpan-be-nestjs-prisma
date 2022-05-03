aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 526867055655.dkr.ecr.ap-south-1.amazonaws.com
docker-compose build backend
docker tag coursemap_backend:latest 526867055655.dkr.ecr.ap-south-1.amazonaws.com/coursemap-backend:latest
docker push 526867055655.dkr.ecr.ap-south-1.amazonaws.com/coursemap-backend:latest