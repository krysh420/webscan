# For executing commands in terminal to setup things
import os

# For checking platform
from platform import system

def setupReq():
    print("Checking platform....")
    platform = system()
    print("Detected OS: ", platform)

    print("Make sure that you have downloaded and installed Docker or Podman (NOTE: Docker/Podman Desktop is not required). Setup cannot proceed without it.")
    engine = input("Enter what did you install (Docker or Podman): ")

    while(True):
        if engine.lower() == "docker":
            os.system("docker run hello-world")
        elif engine.lower() == "podman":
            os.system("podman run hello-world")
        else:
            print("The given engine either does not exist or is not supported by this project at the moment.")
        
        test = input("Did the 'Hello from Docker' executed properly? [It will show hello from docker for both podman and docker] (Yes/No): ")
        if test.lower() == "yes":
            print(f"{engine.title()} has been succesfully installed.")
            break
        elif test.lower() == "no":
            print(f"""Make sure {engine.title()} is installed, its services are online and its added to PATH (More important for Windows users).
Make sure you are connected to the internet.
Make sure you have sufficient privileges.
Retry the test.  """)
            print("The test will be run again. To stop, exit the setup using ctrl+c.\n")
        else:
            print("Enter a valid response")

    print("Installing required modules")
    f = open("requirements.txt", "r")
    lines = f.readlines()
    for i in lines:
        if engine.lower() == "docker":
            if "podman" in i:
                continue                
        elif engine.lower() == "podman":
            if "docker" in i:
                continue
        os.system(f"python -m pip install {i}")    



            
    
def updateFull():
    print("placeholdre")
  
def updateImg():
    print("placeholdre")

def updateFull():
    print("placeholdre")

def disclaimer():
    print("placeholdre")

def main():
    print('''Choose what you want to do:
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
        setupReq()
    elif option == '2':
        updateFull()
    elif option == '3':
        updateImg()
    elif option == '4':
        disclaimer()
    elif option == '5':
        quit()
    
if __name__ == "__main__":
    print('Welcome to Webscan Setup and Utility Software')
    while(True):
        main()



# SETUP REQUIREMENTS:
# 1. Check platform [DONE]
# 2. Asking user to install podman or docker [DONE]
# 3. Ask user what is installed and confirm check whether its running or not using helloworld image [DONE]
# 4. Installing required Python modules [DONE]
# 5. Building Image using docker or podman 
# 6. Make config file
# 7. Test run