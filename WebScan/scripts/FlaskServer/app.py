# Module imports
# ONLY IMPORT WHAT YOU NEED

# To log output
import logging 

# For paths (World would be a better place if Windows also used '/' to navigate directories instead of '\')
from pathlib import Path

# To manage container
import docker
import podman
from podman import PodmanClient

# To timestamp logs
from datetime import datetime 

# To extract links from logs
from re import findall 

# Global variables
global ENGINE, PLATFORM, IMG_NAME

# Declare log name
LOGNAME = 'LOG-' + datetime.now().strftime("%Y-%m-%d_%H-%M-%S") + '.log'

# Declaring log path
log_dir = Path('../../logs')
log_dir.mkdir(parents=True, exist_ok=True)

# IGNORE (Colors)
BLACK = '\033[30m'
RED = '\033[31m'
GREEN = '\033[32m'
YELLOW = '\033[33m' # orange on some systems
BLUE = '\033[34m'
MAGENTA = '\033[35m'
CYAN = '\033[36m'
LIGHT_GRAY = '\033[37m'
DARK_GRAY = '\033[90m'
BRIGHT_RED = '\033[91m'
BRIGHT_GREEN = '\033[92m'
BRIGHT_YELLOW = '\033[93m'
BRIGHT_BLUE = '\033[94m'
BRIGHT_MAGENTA = '\033[95m'
BRIGHT_CYAN = '\033[96m'
WHITE = '\033[97m'

RESET = '\033[0m' # called to return to standard terminal text color

# Initialise log file.
def init_log():
    with open(log_dir / LOGNAME, 'w') as f:
        f.writelines('\nLOG ' + str(datetime.now()) + '\n')


# Outputs contents of output.log in the terminal window. Each line of log is generated in this format: INFO:root:b'<output of command>\n'
# so to make it readable in terminal, decided to remove the extra parts 
def read_log():
    f = open(log_dir / LOGNAME, 'r')
    
    x = f.readlines() # Not needed now but still keeping
    filter = ["INFO:root:"]
    filtered = ''
    for i in x:
        filtered = i.replace(filter[0], '')
        print(filtered)            
    
    f.close()

# Extract link in a seperate file
def extract_links():
    f = open('links.txt', 'w')
    f.write("")
    with open(log_dir / LOGNAME) as file:
        for line in file:
            urls = findall(r'https?://(?:[-\w.]|(?:%[\da-fA-F]{2}))+', line)
            f.write(str(urls)+'\n')
    
    f.close()

def read_config():
    print(BLUE + "Checking for configuration file...." + RESET)
    CONF_DIR = Path('../.config')

    if CONF_DIR.is_file(): # If config file is already present, call main function
        print(GREEN + "Configuration file found!" + RESET)
        f = open(CONF_DIR,"r") # Open config file
        lines = f.readlines() 
        for i in lines: # Store values from config file into their respective (global) variables
            global PLATFORM, ENGINE, IMG_NAME 
            if "OS"in i:
                PLATFORM = i.replace("OS: ", '')
                PLATFORM = PLATFORM.replace("\n", '')
            elif "ENGINE" in i:
                ENGINE = i.replace("ENGINE: ", '')
                ENGINE = ENGINE.replace("\n",'')
            elif "IMAGE" in i:
                IMG_NAME = i.replace("IMAGE: ",  '')
                IMG_NAME = IMG_NAME.replace("\n",'')
            elif "API_KEY" in i:
                API_KEY = i.replace("API_KEY: ", '')
                API_KEY = API_KEY.replace("\n", '')
        f.close()
        print(f'{MAGENTA}OS: {BRIGHT_MAGENTA}{PLATFORM}{RESET}',f'\n{GREEN}ENGINE: {ENGINE}{RESET}',f'\n{BRIGHT_BLUE}IMAGE: {IMG_NAME}{RESET}')
    else: # Else ask user to run setup script and exit the app
        print(RED + "Configuration file not present. Run setup script to make a new one.\nExiting app...." + RESET)
        quit()

# Function to manage Podman
def podman_run(command):
    try:
# You can change the url if your podman is installed elsewhere
        CLIENT = PodmanClient(base_url="unix:///run/user/1000/podman/podman.sock")
        CONTAINER = CLIENT.containers.create(
            image=IMG_NAME,
            command=command,
            network_mode='host',
            detach=True
        )
        CONTAINER.start()
        CONTAINER.wait()  # Wait for the container to complete

        for line in CONTAINER.logs(stream=True):
            logging.info(line.strip().decode('utf-8'))
    except Exception as e:
        print(f"{RED} + An error occurred:{BRIGHT_RED} {e} {RESET}")
        return str(e)
    
# Function to manage Docker
def docker_run(command):
    try:
# You change the client path by uncommenting the line below and putting your address to 
        # CLIENT = docker.DockerClient(base_url='unix://var/run/docker.sock')
        CLIENT = docker.from_env() # Be sure to comment this when you do so
        CONTAINER = CLIENT.containers.run(
            image=IMG_NAME, 
            command=command, 
            network_mode='host', 
            detach=True
        )
        for line in CONTAINER.logs(stream=True):
            logging.info(line.strip().decode('utf-8'))
    except Exception as e:
        print(f"{RED} + An error occurred:{BRIGHT_RED} {e} {RESET}")
        return str(e)


def main_function(ssl,url):
    read_config() # Setup will not run if config not present
    init_log()
    # Log configuration
    logging.basicConfig(filename=log_dir / LOGNAME, filemode='a', level=logging.INFO, format='%(message)s')
    print(BRIGHT_BLUE + "Scan in progress... Wait till its done." + RESET)
    if ENGINE.lower() == "docker":
        if ssl == True:
            docker_run(f"nikto -h {url} -ssl")
        else:  
            docker_run(f"nikto -h {url}")

    elif ENGINE.lower() == "podman":
        if ssl == False:
            podman_run(["nikto", "-h", url, "--ssl"])
        else:
            podman_run(["nikto", "-h", url])
    read_log()
    extract_links()

        #opening the files to be read
    LOG_PATH = fr"../../logs/{LOGNAME}"
    file = open(LOG_PATH,'r')
    content = file.readlines()
    # some declarations for loop
    only_logs=[]
    ind_log = {}
    start_value=0
    stop_value=0
    for i in content:
        if("+ Server" in i):
            start_value=content.index(i)+1
        elif("+ ERROR" in i or "+ Scan terminated:" in i):
            stop_value=content.index(i)
            break
        else:
            continue
    # for loop, which will only store logs and not the starter boilerplate content
    # for i in range(start_value,stop_value):
    for i in range(start_value,stop_value):
        if "See:" or "+"  in content[i]:
            index=content[i].find("See:")
            content[i]=content[i].replace(content[i][index::],"")
            content[i]=content[i].replace("+","")
            ind_log = {}
            if  "/:" in content[i]:
                content[i]=content[i].replace("/:","")
                ind_log['log']=content[i]
                ind_log['id']=i
                only_logs.append(ind_log)
            else:
                ind_log['log']=content[i]
                ind_log['id']=i
                only_logs.append(ind_log)
    file.close()
    print(BRIGHT_GREEN + "Scan completed, Log saved in logs folder." + RESET)
    return only_logs

    

    
# PLAN FROM MY SIDE
# 1. Automate testing [DONE]
# 2. Store report in a log file [DONE]
# 3. Clear log each run [DONE] {NOT NEEDED NOW}
# 4. Output contents of log excluding [INFO] and \n [DONE]
# 5. Let the clean log be sent to JS for display [DONE]
# 6. Help with OpenAI integration to explain the vulnerabilities 
# 7. Extract links from Nikto logs [DONE]
# 8. Add support for podman [DONE]
# 9. Ask user to give a part incase the default port is used already
# 10. Add functionality to update the image [DONE in setup]
# 11. Error and Exception handling [WORKING]
# 12. Add user specific podman enabling warning



