from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from pathlib import Path
import json
from datetime import datetime
from app import main_function
import os

# Generating dynamic LogNames
# LOGNAME = 'LOG-' + datetime.now().strftime("%Y-%m-%d_%H-%M-%S") + '.log'

# Declaring path of logs and resolved logs
# LOG_PATH = fr"../../logs/{LOGNAME}"
LOG_PATH = fr"../../logs/LOG-2024-08-04_15-49-56.log"


def logs():
    try:
        #opening the files to be read
        file = open(LOG_PATH,'r')
        content = file.readlines()

        #some declarations for loop
        log_file_length=len(content)
        only_logs=[]
        start_value=0
        for i in content:
                if("+ Server" in i):
                    start_value=content.index(i)+1
        # for loop, which will only store logs and not the starter boilerplate content
        for i in range(start_value,log_file_length):
            if "See:" in content[i]:
                index=content[i].find("See:")
                content[i]=content[i].replace(content[i][index::],"")
            if "+" or "/:" in content[i]:
                content[i]=content[i].replace("+","")
                content[i]=content[i].replace("/:","")
            only_logs.append(content[i])
        file.close()
        return only_logs
    except FileNotFoundError:
        print("Waiting for user to start scanning.....")

# end point for getting url 
@csrf_exempt
def get_URL(request):
    if request.method == "POST":
        data = request.body.decode('utf-8')
        data = json.loads((data))
        data = data['Data']
        url_to_be_tested = data['URL']
        is_https = data['is_https']
        if is_https=="True":
            is_https=True
        else:
            is_https=False
        main_function(is_https,url_to_be_tested)
    return JsonResponse({"message":"there is nothing here"})



# end point to give json response of logs
@csrf_exempt
def Logs(request):
    if request.method == "GET":
        only_logs = logs()
        os.system('cmd /k ')
        return JsonResponse({"logs":only_logs})




