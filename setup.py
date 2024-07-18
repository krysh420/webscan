# For executing commands in terminal to setup things
import os

# For checking OS
from platform import system

# To timestamp last setup
from datetime import datetime

def setup_req():
    global IMG_NAME 
    IMG_NAME = "nikto-img"
    global PLATFORM
    print("Checking platform....")
    PLATFORM = system()
    print("Detected OS: ", PLATFORM+"\n")

    print("Make sure that you have downloaded and installed Docker or Podman (NOTE: Docker/Podman Desktop is not required). Setup cannot proceed without it.")
    global ENGINE
    ENGINE = input("Enter what did you install (Docker or Podman): ")

    while(True):
        if ENGINE.lower() == "docker":
            os.system("docker run hello-world")
        elif ENGINE.lower() == "podman":
            os.system("podman run hello-world")
        else:
            print("The given engine either does not exist or is not supported by this project at the moment.")
            print("Terminating setup...")
            quit()
        
        test = input("Did the 'Hello from Docker' executed properly? [It will show hello from docker for both podman and docker] (Yes/No): ")
        if test.lower() == "yes":
            print(f"{ENGINE.title()} has been succesfully installed.\n")
            break
        elif test.lower() == "no":
            print(f"""Make sure {ENGINE.title()} is installed, its services are online and its added to PATH (More important for Windows users).
Make sure you are connected to the internet.
Make sure you have sufficient privileges. 
Make sure your user is part of "docker" group if you are on Linux. Alternatively, you can run the python script as sudo, though it is not recommended.
To add user to docker group, follow the following link: https://docs.docker.com/engine/install/linux-postinstall/
Retry the test.  """)
            print("The test will be run again. To stop, exit the setup using ctrl+c.\n")
        else:
            print("Enter a valid response")

    print("Installing required modules")
    f = open("requirements.txt", "r")
    lines = f.readlines()
    for i in lines:
        if ENGINE.lower() == "docker":
            if "podman" in i:
                continue                
        elif ENGINE.lower() == "podman":
            if "docker" in i:
                continue
        os.system(f"python -m pip install {i}")
    while True:
        module_install = input("Did all packages installed successfully? (Yes/No): ")
        if module_install.lower() == "yes":
            print("Setup will now continue...... \n")
            break
        elif module_install.lower() == "no":
            print("You can either retry using the setup or manually install packages by running 'pip install -r requirements.txt'. Make sure you have pip installed if you are a linux user. \nTo quit the setup, enter 'quit' in the prompt. Once installed, enter yes in the prompt. ")
            print("Some Linux distros now also manage packages externally, for those, you can either install by adding --break-system-packages flag when running above command or by manually installing them using whatever package manager the distro is using.")
        elif module_install.lower() == "quit":
            print("Setup will now terminate. You can rerun the setup once all packages are installed...")
            quit()
        else:
            print("Enter a valid option.\n")

    print(f"Building {ENGINE.title()} image....")
    while True:
        os.system(f"{ENGINE} build {ENGINE} -t {IMG_NAME}")
        img_install = os.popen(f'{ENGINE} run {IMG_NAME} echo "Success"').read()
        if img_install == """Success\n""":
            print("Image installation successful.\n")
            break
        else:
            print(img_install)
            print(f"It appears the image did not install properly. Make sure you have {ENGINE.title()} installed and running. Linux users can try running 'sudo service {ENGINE.lower()} start'. You can also build the image yourself by using '{ENGINE.lower()} build . -t {IMG_NAME}' Be sure to keep name of image {IMG_NAME} else the app will not work. ")
            retry = input("Retry? (Yes/No): ")
            if retry.lower() == "no":
                break
    print("All requirements have been successfully installed.\n")
    config_file()           
    print("App is now ready to use. You can run 'test.py' to make sure everything is running \n")

def update_full():
    print("placeholdre")
  
def update_img():
    print("Removing old image....")
    os.system(f'{ENGINE} rmi -f {IMG_NAME}')
    print("Making new image...")
    os.system(f'{ENGINE} build . -t {IMG_NAME}')
    if os.popen(f'{ENGINE} run {IMG_NAME} echo "Success"').read() == "Success":
        print("Success")
    else:
        print("Fail")
    
def update_full():
    print("placeholdre")

def config_file():
    print("Creating up config file....")
    f = open(".config", "w")
    config = f'''OS: {PLATFORM.lower()}
ENGINE: {ENGINE.lower()}
IMAGE: {IMG_NAME}
LAST_UPDATE: {datetime.now()}'''
    f.writelines(config)
    print("Configuration file generated.")
    f.close()


def disclaimer():
    print("placeholdre")

def main():
    print('''\nChoose what you want to do:
1. Setup requirements
2. Check for Updates
3. Update only image 
4. Disclaimer
5. Exit
           ''')
    
    option = input("Enter your choice: ")
    if (option not in ('1','2','3','4','5')):
        option = int(input(("Enter a valid choice (1-5)")))
    
    elif option == '1':
        setup_req()
    
    elif option == '2':
        update_full()
    
    elif option == '3':
        update_img()
    
    elif option == '4':
        disclaimer()
    
    elif option == '5':
        quit()
    
if __name__ == "__main__":
    print('Welcome to Webscan Setup and Utility Software')
    print('Make sure you have read README.md to avoid errors while setting up.')
    while(True):
        main()



# SETUP REQUIREMENTS:
# 1. Check platform [DONE]
# 2. Asking user to install podman or docker [DONE]
# 3. Ask user what is installed and confirm check whether its running or not using helloworld image [DONE]
# 4. Installing required Python modules [DONE]
# 5. Building Image using docker or podman [DONE]
# 6. Make config file
# 7. Test run
# 8. Add image update functionality
# 9. Add full update functionality 
# 10. Address sudo issue for docker
# 11. Add headsup for pip not being installed in READ.md
# 12. Edit requirements.txt to exclude re and logging