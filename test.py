import docker

global ENGINE, PLATFORM, IMG_NAME

print("This test is just for all Python and Docker based things")
print("Reading configuration file....")
f = open('.config', 'r')
CONFIG = f.readlines()

for i in CONFIG:
    if "OS"in i:
        PLATFORM = i.replace("OS: ", '')
        PLATFORM = PLATFORM.replace("\n", '')
    elif "ENGINE" in i:
        ENGINE = i.replace("ENGINE: ", '')
        ENGINE = ENGINE.replace("\n",'')
    elif "IMAGE" in i:
        IMG_NAME = i.replace("IMAGE: ",  '')
        IMG_NAME = IMG_NAME.replace("\n",'')
    print(i)

f.close()

client = docker.from_env()

print(f"Testing {ENGINE}.....")
log = client.containers.run(IMG_NAME, "nikto -V")
log = log.strip().decode('utf-8')
print(log)
log = client.containers.run(IMG_NAME, f"echo {ENGINE} test successful.")
log = log.strip().decode('utf-8')

print(log)