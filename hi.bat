@ECHO OFF
docker build -t 'test' --file 'C:\Users\Vaibhav Kathait\Desktop\mern1\webscan\Dockerfile'
:: this if for the local file but idk y i was facing error while using it as a script so yeah ig figure out something"
::since the above command won't work the actual command is 
::docker build -t 'test' .

docker run --name "nikto" test
docker start nikto
docker attach nikto
PAUSE
