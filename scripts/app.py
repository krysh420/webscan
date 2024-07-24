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
LOGNAME = 'LOG-'+str(datetime.now())+'.log' 

# Declaring log path
log_dir = Path('../logs')
log_dir.mkdir(parents=True, exist_ok=True)

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

    with open(log_dir / LOGNAME) as file:
        for line in file:
            urls = findall(r'https?://(?:[-\w.]|(?:%[\da-fA-F]{2}))+', line)
            f.write(str(urls)+'\n')
    
    f.close()

def read_config():
    print("Checking for configuration file....")
    CONF_DIR = Path('.config')

    if CONF_DIR.is_file(): # If config file is already present, call main function
        print("Configuration file found!")
        f = open(".config","r") # Open config file
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
        f.close()
        print(f'OS: {PLATFORM}',f'\nENGINE: {ENGINE}',f'\nIMAGE: {IMG_NAME}')
    else: # Else ask user to run setup script and exit the app
        print("Configuration file not present. Run setup script to make a new one.\nExiting app....")
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
        print(f"An error occurred: {e}")
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
        print(f"An error occurred: {e}")
        return str(e)


def main():
    read_config() # Setup will not run if config not present
    url = "127.0.0.1:5000" # Input will be taken from JS
    
    init_log()
    # Log configuration
    logging.basicConfig(filename=log_dir / LOGNAME, filemode='a', level=logging.INFO, format='%(message)s')
    print("Scan in progress... Wait till its done.")
    if ENGINE.lower() == "docker":
        docker_run(f"nikto -h {url}")

    elif ENGINE.lower() == "podman":
        podman_run(["nikto", "-h", f"{url}"])

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
# 8. Add support for podman [DONE]
# 9. Ask user to give a part incase the default port is used already
# 10. Add functionality to update the image [DONE in setup]
# 11. Error and Exception handling [WORKING]
# 12. Add user specific podman enabling warning