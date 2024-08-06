# Module imports, all of these are part of Python Standard Library. No need to install them
# ONLY IMPORT WHAT YOU NEED

# For executing commands in terminal to setup things
from os import system, popen

# For checking OS
from platform import system as os_check # Gave an alias so it doesn't interfere with system from os module. It only has one use in this program

# To timestamp last setup
from datetime import datetime

# To check presence of configuration file
from pathlib import Path

import subprocess
from time import sleep

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
    if PLATFORM.lower().strip() == "windows":
        system('color')

# Test for the engine
    print(YELLOW + "Make sure that you have downloaded and installed Docker or Podman (NOTE: Docker/Podman Desktop is not required). Setup cannot proceed without it." + RESET)
    global ENGINE
    ENGINE = input(f"{BRIGHT_YELLOW}Enter what did you install (Docker or Podman):{RESET} ")

    while(True):
        if ENGINE.lower() == "docker":
            system("docker run hello-world")
        
        elif ENGINE.lower() == "podman":
            system("podman run hello-world") # Could have used f"{engine} but if someone added something like dockman, it will just crash the program 
        
        else:
            print(RED + "The given engine either does not exist or is not supported by this project at the moment." + RESET)
            print(BRIGHT_RED + "Terminating setup..." + RESET)
            quit()

        
        test = input(f"{BRIGHT_YELLOW}Did the 'Hello from Docker' executed properly? [It will show hello from docker for both podman and docker] (Yes/No):{RESET} ")
        if test.lower() == "yes":
            print(BRIGHT_GREEN + f"{ENGINE.title()} has been succesfully installed.\n" + RESET)
            break

        elif test.lower() == "no":
            print(f"""{BLUE}Make sure {ENGINE.title()} is installed, its services are online and its added to PATH (More important for Windows users).
Make sure you are connected to the internet.
Make sure you have sufficient privileges. 
Make sure your user is part of "docker" group if you are on Linux. Alternatively, you can run the python script as sudo, though it is not recommended.
To add user to docker group, follow this guide: {RESET}{CYAN}https://docs.docker.com/engine/install/linux-postinstall/{RESET}{BLUE}
Retry the test.{RESET}  """)
            print(MAGENTA + "The test will be run again. To stop, exit the setup using ctrl+c.\n" + RESET)
        
        else:
            print(RED + "Enter a valid response" + RESET)

# Installing Python modules
    print(MAGENTA + "Installing required modules" + RESET)
    if (PLATFORM.lower()).rstrip() == "windows":
        system("python.exe -m pip install -r requirements.txt")
    else:
        system("python3 -m pip install -r requirements.txt") # Linux and MacOS have same way (God bless UNIX based OSes)
    
    while True:
        module_install = input(BRIGHT_YELLOW + "Did all packages installed successfully? (Yes/No): " + RESET)
        
        if module_install.lower() == "yes":
            print(BRIGHT_GREEN + "Setup will now continue...... \n" + RESET)
            break
        elif module_install.lower() == "no":
            print(f"""{BLUE}You can either retry using the setup or manually install packages by running {CYAN}'pip install -r requirements.txt'{BLUE}. Make sure you have pip installed if you are a linux user. \nTo quit the setup, enter 'quit' in the prompt. Once installed, enter yes in the prompt.
Windows users need to ensure Python is added to path.
Some Linux distros now also manage packages externally, for those, you can either install by adding --break-system-packages flag when running above command or by manually installing them using whatever package manager the distro is using. \n{RESET}""")
            try_again = input(f"{BRIGHT_YELLOW}Retry with --break-system-packages? [It should be harmless because this project does not use any package on which core features of Linux depend and is running in a virtual env] (Yes/No):{RESET} ")
            
            if try_again.lower() == "yes":
            
                system("pip install --break-system-packages -r requirements.txt")
            
            else:
                print(BRIGHT_RED + "Setup will now terminate. You can rerun the setup once all packages are installed..." + RESET)
                quit()
        elif module_install.lower() == "quit":
            print(RED + "Setup will now terminate. You can rerun the setup once all packages are installed..." + RESET)
            quit()
        else:
            print(RED + "Enter a valid option.\n" + RESET)

# Building kali image with nikto.
    print(f"{MAGENTA}Building {ENGINE.title()} image....{RESET}")
    while True:
        system(f"{ENGINE} build . -t {IMG_NAME}") # Thank the devs for making podman and docker commands similar

        img_install = popen(f'{ENGINE} run {IMG_NAME} echo "Success"').read() # Using echo to make sure image is installed
        if img_install == """Success\n""":
            print(BRIGHT_GREEN + "Image installation successful.\n" + RESET) # Setup breaks out of loop only if image returns success
            break

        else:
            print(f"{BLUE}It appears the image did not install properly. Make sure you have {ENGINE.title()} installed and running.\nLinux users can try running {CYAN}'sudo service {ENGINE.lower()} start'{BLUE}. You can also build the image yourself by using {CYAN}'{ENGINE.lower()} build . -t {IMG_NAME}'{BLUE} Be sure to keep name of image {IMG_NAME} else the app will not work.{RESET} ")
            retry = input("Retry? (Yes/No): ") # Just read the else print statement. Its pretty self-explainatory
            if retry.lower() == "no":
                print(BRIGHT_RED + "Exiting setup. Run setup again after building image." + RESET)
                quit() # Or if you give up

    print(BRIGHT_GREEN + "\nAll requirements have been successfully installed.\n" + RESET)
    print(MAGENTA + "Creating up config file...." + RESET)
    config_file() # Generating config file           
    print(BRIGHT_YELLOW + "\nApp is now ready to use. You can run 'test.py' to make sure everything is running \n" + RESET)

def update_full(): # Update entire project 
    print(BRIGHT_YELLOW + "Performing full update")
    print("Pulling files from Github...")
    system('git init')
    system('git pull')
    print("Updating image...")
    update_img()
    print("Recreating configuration file...." + RESET)
    config_file()


    
def run_guiApp():
    # Start the React app
    title="FLASK"

    # Wait for both processes to complete
    try:
       subprocess.run('cd ReactApp && start cmd /k npm run dev',shell=True)
       subprocess.run(f'start cmd /k "flask.bat"',shell=True)
       
    except KeyboardInterrupt:
        print("Shutting down servers...")
    

def update_img(): # Remove old image, create new one
# Image removal
    print(BRIGHT_YELLOW + "Removing old image....")
    system(f'{ENGINE} rmi -f {IMG_NAME}')
    
# Image rebuid    
    print("Making new image..." + RESET)
    system(f'{ENGINE} build . -t {IMG_NAME}')
    
# Testing if image rebuilt    
    if popen(f'{ENGINE} run {IMG_NAME} echo "Success"').read() == "Success\n":
        print(BRIGHT_GREEN + "Success" + RESET)
    else:
        print("Fail")


def config_file(): # Generates Config file
    f = open(".config", "w") 
    config = f'''OS: {PLATFORM.lower()}
ENGINE: {ENGINE.lower()}
IMAGE: {IMG_NAME}
LAST_UPDATE: {datetime.now()}'''
    f.writelines(config)
    print(BRIGHT_YELLOW + "Configuration file generated." + RESET)
    f.close()


def disclaimer(): # We aint responsible if you try to run this on Microsoft servers or smthn
    print(f'''{BRIGHT_RED}**Disclaimer** {RESET}
{YELLOW}          
Unauthorized use of this tool on any site without explicit permission from the site owner is strictly prohibited. 
This project is released under the {MAGENTA}MIT License.{YELLOW} By using this tool, you agree that the creators of this project {BRIGHT_RED}cannot{YELLOW} be held liable for any unethical or unauthorized use. 
Users are solely responsible for ensuring that their use of this tool complies with all applicable laws and regulations.{RESET}''')


def main():
    print(f'''\n{BRIGHT_YELLOW}Choose what you want to do:
{GREEN}1. Install dependencies
{YELLOW}2. Check for Updates
{MAGENTA}3. Run the GUI App
{WHITE}4. Update only image 
{BRIGHT_RED}5. Disclaimer
{BRIGHT_CYAN}6. Exit
           {RESET}''')
    
    option = input("Enter your choice: ")
    if (option not in ('1','2','3','4','5')): # To handle people typing "yes" as an option to prompt
        option = int(input((RED + "Enter a valid choice (1-5)" + RESET)))
    
    elif option == '1':
        setup_req()
    
    elif option == '2':
        update_full()


    elif option == '3':
        run_guiApp()
    
    elif option == '4':
        update_img()
    
    elif option == '5':
        disclaimer()
    
    elif option == '6':
        quit()
    
if __name__ == "__main__":
    print(BRIGHT_MAGENTA + '\nWelcome to Webscan Setup and Utility Software')
    print('Make sure you have read README.md to avoid errors while setting up.' + RESET)
    CONF_DIR = Path('../.config')
    print(BLUE + "Checking for configuration file...." + RESET)
    while(True):
        if CONF_DIR.is_file(): # If config file is already present, call main function
            print(GREEN + "Configuration file found!" + RESET)
            f = open("../.config","r") # Open config file
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
            main()
        else:
            print(RED + "Configuration file not found. Executing function to set up dependencies..."+ RESET) # Else if no config file, call setup function to install deps
            setup_req()
            disclaimer() # Must show disclaimer atleast once


# SETUP REQUIREMENTS:
# 1. Check platform [DONE]
# 2. Asking user to install podman or docker [DONE]
# 3. Ask user what is installed and confirm check whether its running or not using helloworld image [DONE]
# 4. Installing required Python modules [DONE]
# 5. Building Image using docker or podman [DONE]
# 6. Make config file [DONE]
# 7. Test run [DONE]
# 8. Add image update functionality [DONE]
# 9. Add full update functionality [DONE]
# 10. Address sudo issue for docker [DONE WITH COMMENTS AND PROMPTS]
# 11. Add headsup for pip not being installed in READ.md
# 12. Check whether .config exists, also import variables from there to this if it exists [DONE]
# 13. Heads up for setting execution policy for Windows user
# 14. Give chmod +x for scripts heads up linux