#IMPORT ONLY WHAT YOU NEED

# For executing commands in terminal to setup things
from os import system, popen

# For checking OS
from platform import system as os_check # Gave an alias so it doesn't interfere with system from os module. It only has one use in this program

# To timestamp last setup
from datetime import datetime

# Setting up dependencies
def setup_req():
# Defining name of image
    global IMG_NAME 
    IMG_NAME = "nikto-img"

# Defining platform
    global PLATFORM
    print("Checking platform....")

# Using system() from os to check Operating System    
    PLATFORM = os_check()
    print("Detected OS: ", PLATFORM+"\n")

# Test for the engine
    print("Make sure that you have downloaded and installed Docker or Podman (NOTE: Docker/Podman Desktop is not required). Setup cannot proceed without it.")
    global ENGINE
    ENGINE = input("Enter what did you install (Docker or Podman): ")

    while(True):
        if ENGINE.lower() == "docker":
            system("docker run hello-world")
        
        elif ENGINE.lower() == "podman":
            system("podman run hello-world") # Could have used f"{engine} but if someone added something like dockman, it will just crash the program 
        
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
To add user to docker group, follow this guide: https://docs.docker.com/engine/install/linux-postinstall/
Retry the test.  """)
            print("The test will be run again. To stop, exit the setup using ctrl+c.\n")
        
        else:
            print("Enter a valid response")

# Installing Python modules
    print("Installing required modules")
    f = open("requirements.txt", "r") # Opening requirements file
    lines = f.readlines()

    for i in lines:
        if ENGINE.lower() == "docker":   # Why should I install podman module if I use docker
            if "podman" in i:
                continue                
        elif ENGINE.lower() == "podman": # Why should I install docker module if I use podman
            if "docker" in i:
                continue
        system(f"python -m pip install {i}") # Linux users may have to use python3 instead of python (While I understand a lot of core packages of Linux still depend on Python2, it doesnt mean that Python2 should be default)
    
    f.close()
    
    while True:
        module_install = input("Did all packages installed successfully? (Yes/No): ")
        
        if module_install.lower() == "yes":
            print("Setup will now continue...... \n")
            break
        elif module_install.lower() == "no":
            print("You can either retry using the setup or manually install packages by running 'pip install -r requirements.txt'. Make sure you have pip installed if you are a linux user. \nTo quit the setup, enter 'quit' in the prompt. Once installed, enter yes in the prompt. ")
            print("Some Linux distros now also manage packages externally, for those, you can either install by adding --break-system-packages flag when running above command or by manually installing them using whatever package manager the distro is using. \nYour distro may also flag python and python3 as different, you can fix that by either editing this file and adding python3 or installing 'python-is-python3' using your package manager (eg: apt).")
        elif module_install.lower() == "quit":
            print("Setup will now terminate. You can rerun the setup once all packages are installed...")
            quit()
        else:
            print("Enter a valid option.\n")

# Building kali image with nikto.
    print(f"Building {ENGINE.title()} image....")
    while True:
        system(f"{ENGINE} build . -t {IMG_NAME}") # Thank the devs for making podman and docker commands similar

        img_install = popen(f'{ENGINE} run {IMG_NAME} echo "Success"').read() # Using echo to make sure image is installed
        if img_install == """Success\n""":
            print("Image installation successful.\n") # Setup breaks out of loop only if image returns success
            break

        else:
            print(f"It appears the image did not install properly. Make sure you have {ENGINE.title()} installed and running. Linux users can try running 'sudo service {ENGINE.lower()} start'. You can also build the image yourself by using '{ENGINE.lower()} build . -t {IMG_NAME}' Be sure to keep name of image {IMG_NAME} else the app will not work. ")
            retry = input("Retry? (Yes/No): ") # Just read the else print statement. Its pretty self-explainatory
            if retry.lower() == "no":
                break # Or if you give up

    print("\nAll requirements have been successfully installed.\n")
    config_file() # Generating config file           
    print("\nApp is now ready to use. You can run 'test.py' to make sure everything is running \n")

def update_full(): # WORK PENDING
    print("placeholdre")
  

def update_img(): # Remove old image, create new one
# Image removal
    print("Removing old image....")
    system(f'{ENGINE} rmi -f {IMG_NAME}')
    
# Image rebuid    
    print("Making new image...")
    system(f'{ENGINE} build . -t {IMG_NAME}')
    
# Testing if image rebuilt    
    if popen(f'{ENGINE} run {IMG_NAME} echo "Success"').read() == "Success\n":
        print("Success")
    else:
        print("Fail")


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
1. Install dependencies
2. Check for Updates
3. Update only image 
4. Disclaimer
5. Exit
ONLY RUN OTHER COMMANDS ONCE YOU EXECUTE 1.
           ''')
    
    option = input("Enter your choice: ")
    if (option not in ('1','2','3','4','5')): # To handle people typing "yes" as an option to prompt
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
# 6. Make config file [DONE]
# 7. Test run [DONE]
# 8. Add image update functionality [DONE]
# 9. Add full update functionality 
# 10. Address sudo issue for docker [DONE WITH COMMENTS AND PROMPTS]
# 11. Add headsup for pip not being installed in READ.md
# 12. Check whether .config exists, also import variables from there to this if it exists