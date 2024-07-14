# Module imports
import logging
import docker
from datetime import datetime

# Initialise log file. This will overwrite the last log and make a new one. If you want that the previous log dont get deleted
# then replace f = open('output.log', 'w') with  f = open('output.log', 'a'). This will generate new logs inside same file without overwrites.
def initLog():
    f = open('output.log', 'w')
    f.writelines('\nLOG '+str(datetime.now())+'\n')
    f.close()

# Outputs contents of output.log in the terminal window. Each line of log is generated in this format: INFO:root:b'<output of command>\n'
# so to make it readable in terminal, decided to remove the extra parts 
def readLog():
    f = open('output.log', 'r')
    x = f.readlines()
    filter = ["INFO:root:b'", "\\n'"]
    filtered = ''
    for i in x:
        filtered = i.replace(filter[0], '')
        filtered = filtered.replace(filter[1], '')
        print(filtered)            
    f.close()

def main():
    client = docker.from_env()
    initLog()
    logging.basicConfig(filename='output.log', level=logging.INFO)    
    logging.info(client.containers.run("kalilinux/kali-rolling", "echo hello world"))
    readLog()

if __name__ == "__main__":
    main()
    
    
# PLAN FROM MY SIDE
# 1. Automate testing [DONE]
# 2. Store report in a log file [DONE]
# 3. Clear log each run [DONE]
# 4. Output contents of log excluding [INFO] and \n [DONE]
# 5. Let the clean log be sent to JS for display
# 6. Help with OpenAI integration to explain the vulnerabilities
# 7. Extract links from Nikto logs
# 8. Error and Exception handling 
# 9. Set the port of website hosted to something which do not interfere with other services
# 10. Ask user to give a part incase the default port is used already