# Run this command to create Docker Image
docker build -t app-nodejs:1.0.0 .

# Start Docker Image
docker run -d -p8080:8080 app-nodejs

