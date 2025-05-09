# Exit immediately if any command fails
$ErrorActionPreference = "Stop"

# Define variables
$IMAGE_NAME = "cairparavel-webserver"
$TAGGED_IMAGE = "marito1256/cairparavel-webserver:latest"
$CONTAINER_NAME = "cairparavel_container"
$PORT = "5000"
$DOCKERFILE_PATH = "."  # Adjust if needed

Write-Host "🔹 Starting Docker Desktop..."
Start-Process "C:\Program Files\Docker\Docker\Docker Desktop.exe"

#Write-Host "🔹 Stopping and removing any existing container named $CONTAINER_NAME..."
#docker stop $CONTAINER_NAME 2>$null
#docker rm $CONTAINER_NAME 2>$null

Write-Host "🔹 Building updated Docker image..."
docker build --no-cache -t $IMAGE_NAME $DOCKERFILE_PATH

Write-Host "🔹 Tagging image as $TAGGED_IMAGE..."
docker tag $IMAGE_NAME $TAGGED_IMAGE

#Write-Host "🔹 Logging into Docker Hub..."
#docker login

Write-Host "🔹 Pushing new image to Docker Hub..."
docker push $TAGGED_IMAGE

Write-Host "🔹 Listing all running containers..."
docker ps

Write-Host "🔹 Cleaning up old containers..."
docker system prune -f

Write-Host "🔹 🔹 🔹 Update Complete 🔹 🔹 🔹"

