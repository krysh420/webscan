# Module imports

# To log output
import logging 

# To manage container
import docker 

# To timestamp logs
from datetime import datetime 

# To extract links from logs
import re 

# Declare log name
logName = 'LOG-'+str(datetime.now())+'.log' 

# Initialise log file. This will overwrite the last log and make a new one. If you want that the previous log dont get deleted
# then replace f = open('output.log', 'w') with  f = open('output.log', 'a'). This will generate new logs inside same file without overwrites.
def initLog():
    f = open(f'./logs/{logName}', 'w')
    f.writelines('\nLOG '+str(datetime.now()))
    f.close()


# Outputs contents of output.log in the terminal window. Each line of log is generated in this format: INFO:root:b'<output of command>\n'
# so to make it readable in terminal, decided to remove the extra parts 
def readLog():
    global logName
    f = open(f'./logs/{logName}', 'r')
    x = f.readlines()
    filter = ["INFO:root:"]
    filtered = ''
    for i in x:
        filtered = i.replace(filter[0], '')
        print(filtered)            
    f.close()


def extractLinks():
    global logName
    f = open('links.txt', 'w')
    with open(f'./logs/{logName}') as file:
        for line in file:
            urls = re.findall('https?://(?:[-\w.]|(?:%[\da-fA-F]{2}))+', line)
            f.write(str(urls)+'\n')
    f.close()

def main():
    global logName

# You change the client path by uncommenting the line below and putting your address to 
    # client = docker.DockerClient(base_url='unix://var/run/docker.sock')
    client = docker.from_env() # be sure to comment this line when you do that
    container = client.containers.run("kalilinux/kali-rolling", "apt update", detach=True)
    
    initLog()
    logging.basicConfig(filename=f'./logs/{logName}',filemode='a', level=logging.INFO)    
    
    for line in container.logs(stream=True):
        logging.info(line.strip().decode('utf-8')) # To have clean logs
    
    readLog()
    extractLinks()

if __name__ == "__main__":
    main()
    
    
# PLAN FROM MY SIDE
# 1. Automate testing [DONE]
# 2. Store report in a log file [DONE]
# 3. Clear log each run [DONE]
# 4. Output contents of log excluding [INFO] and \n [DONE]
# 5. Let the clean log be sent to JS for display [DONE]
# 6. Help with OpenAI integration to explain the vulnerabilities 
# 7. Extract links from Nikto logs 
# 8. Error and Exception handling 
# 9. Set the port of website hosted to something which do not interfere with other services 
# 10. Ask user to give a part incase the default port is used already
# 11. Add functionality to update the docker image
# 12. Add support for podman