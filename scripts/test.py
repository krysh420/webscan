import docker
import podman
from podman import PodmanClient
from pathlib import Path

global ENGINE, PLATFORM, IMG_NAME

print("This test is just for all Python and Docker based things")
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

read_config()
print(f"Testing {ENGINE}.....")


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
    print(log)
    
    log = Client.containers.run(IMG_NAME, "echo Test successful.")
    log = log.strip().decode('utf-8')
    print(log)

elif ENGINE.lower() == "podman":
    Client = PodmanClient(base_url="unix:///run/user/1000/podman/podman.sock") # You can change the url if your podman is installed elsewhere

    command1 = ["nikto", "-V"]
    output1 = podman_run(Client, IMG_NAME, command1)
    print(output1)

    command2 = ["echo", "Test successful."]
    output2 = podman_run(Client, IMG_NAME, command2)
    print(output2)