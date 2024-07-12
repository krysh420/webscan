import logging
import docker
from datetime import datetime

def initialise_log():
    f = open('output.log', 'w')
    f.writelines('\nLOG '+str(datetime.now())+'\n')

def read_log():
    f = open('output.log', 'r')
    x = f.readlines()
    filter = ["INFO:root:b'", "\\n'"]
    filtered = ''
    for i in x:
        filtered = i.replace(filter[0], '')
        filtered = filtered.replace(filter[1], '')
        print(filtered)            
    f.close()

if __name__ == "__main__":
    initialise_log()
    logging.basicConfig(filename='output.log', level=logging.INFO)
    client = docker.from_env()
    logging.info(client.containers.run("kalilinux/kali-rolling", "echo hello world"))
    read_log()
    
    
    
    # PLAN FROM MY SIDE
    # 1. Automate testing [DONE]
    # 2. Store report in a log file [DONE]
    # 3. Clear log each run [DONE]
    # 4. Output contents of log excluding [INFO] and \n [DONE]