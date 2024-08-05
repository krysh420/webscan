import docker
import podman
from podman import PodmanClient
from pathlib import Path

global ENGINE, PLATFORM, IMG_NAME

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

print(BRIGHT_YELLOW + "This test is just for all Python and Docker based things" + RESET)
def read_config():
    print(BLUE + "Checking for configuration file...." + RESET)
    CONF_DIR = Path('.config')

    if CONF_DIR.is_file(): # If config file is already present, call main function
        print(GREEN + "Configuration file found!" + RESET) 
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
        print(f'{MAGENTA}OS: {PLATFORM}{RESET}',f'\n{GREEN}ENGINE: {ENGINE}{RESET}',f'\n{BRIGHT_BLUE}IMAGE: {IMG_NAME}{RESET}')
    else: # Else ask user to run setup script and exit the app
        print(BRIGHT_RED + "Configuration file not present. Run setup script to make a new one.\nExiting app...." + RESET)
        quit()

read_config()
print(f"{BLUE}Testing {ENGINE}.....{RESET}")


def podman_run(client, image, command):
    try:
        container = client.containers.create(
            image=image,
            command=command,
            remove=True,
            detach=False
        )
        container.start()
        container.wait()  # Wait for the container to complete
        logs = container.logs(stdout=True, stderr=True, stream=False)
        return b''.join(logs).decode('utf-8').strip()
    except Exception as e:
        print(f"An error occurred: {e}")
        return str(e)
    
if ENGINE.lower() == "docker":
    Client = docker.from_env()

    log = Client.containers.run(IMG_NAME, "nikto -V")
    log = log.strip().decode('utf-8')
    print(GREEN + log + RESET)
    
    log = Client.containers.run(IMG_NAME, "echo Test successful.")
    log = log.strip().decode('utf-8')
    print(BRIGHT_GREEN + log + RESET)

elif ENGINE.lower() == "podman":
    Client = PodmanClient(base_url="unix:///run/user/1000/podman/podman.sock") # You can change the url if your podman is installed elsewhere

    command1 = ["nikto", "-V"]
    output1 = podman_run(Client, IMG_NAME, command1)
    print(GREEN + output1 + GREEN)

    command2 = ["echo", "Test successful."]
    output2 = podman_run(Client, IMG_NAME, command2)
    print(BRIGHT_GREEN + output2 + RESET)