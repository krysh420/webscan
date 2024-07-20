# Module imports
# ONLY IMPORT WHAT YOU NEED

# To log output
import logging 

# For paths (World would be a better place if Windows also used '/' to navigate directories instead of '\')
from pathlib import Path

# To manage container
import docker 

# To timestamp logs
from datetime import datetime 

# To extract links from logs
from re import findall 

# Global variables
global ENGINE, PLATFORM, IMG_NAME

f = open(".config", "r")
# Declare log name
LOGNAME = 'LOG-'+str(datetime.now())+'.log' 

# Initialise log file.
def init_log():
    f = open(Path(f'logs/{LOGNAME}'), 'w')
    f.writelines('\nLOG '+str(datetime.now()))
    f.close()


# Outputs contents of output.log in the terminal window. Each line of log is generated in this format: INFO:root:b'<output of command>\n'
# so to make it readable in terminal, decided to remove the extra parts 
def read_log():
    f = open(Path(f'logs/{LOGNAME}'), 'r')
    
    x = f.readlines()
    filter = ["INFO:root:"]
    filtered = ''
    for i in x:
        filtered = i.replace(filter[0], '')
        print(filtered)            
    
    f.close()


def extract_links():
    f = open('links.txt', 'w')

    with open(Path(f'logs/{LOGNAME}')) as file:
        for line in file:
            urls = findall('https?://(?:[-\w.]|(?:%[\da-fA-F]{2}))+', line)
            f.write(str(urls)+'\n')
    
    f.close()

def main():
# You change the client path by uncommenting the line below and putting your address to 
    # client = docker.DockerClient(base_url='unix://var/run/docker.sock')
    client = docker.from_env() # Be sure to comment this line when you do that
    container = client.containers.run("nikto-img", "nikto -V", detach=True)
    
    init_log()
    logging.basicConfig(filename=Path(f'logs/{LOGNAME}'),filemode='a', level=logging.INFO)    
    
    for line in container.logs(stream=True):
        logging.info(line.strip().decode('utf-8')) # To have clean logs
    
    read_log()
    extract_links()

if __name__ == "__main__":
    main()
    
    
# PLAN FROM MY SIDE
# 1. Automate testing [DONE]
# 2. Store report in a log file [DONE]
# 3. Clear log each run [DONE] {NOT NEEDED NOW}
# 4. Output contents of log excluding [INFO] and \n [DONE]
# 5. Let the clean log be sent to JS for display [DONE]
# 6. Help with OpenAI integration to explain the vulnerabilities 
# 7. Extract links from Nikto logs [DONE]
# 8. Add support for podman
# 9. Ask user to give a part incase the default port is used already
# 10. Add functionality to update the docker image
# 11. Error and Exception handling 