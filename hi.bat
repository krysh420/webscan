@ECHO OFF
docker build -t 'test' --file 'C:\Users\Vaibhav Kathait\Desktop\mern1\webscan\Dockerfile'

docker run --name "nikto" test
docker start nikto
docker attach nikto
PAUSE