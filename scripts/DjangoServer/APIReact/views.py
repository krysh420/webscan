from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from pathlib import Path
import json
from datetime import datetime

# Generating dynamic LogNames
# LOGNAME = 'LOG-' + datetime.now().strftime("%Y-%m-%d_%H-%M-%S") + '.log'

# Declaring path of logs and resolved logs
# LOG_PATH = fr"../../logs/{LOGNAME}"
LOG_PATH = r"../../logs/LOG-2024-07-26_18-32-26.log"


#opening the files to be read
file = open(LOG_PATH,'r')
content = file.readlines()

#some declarations for loop
log_file_length=len(content)
start_value=0
only_logs=[]


# assigning the values not by hard coding
for i in content:
    if i[0]=="+":
        start_value=content.index(i)

# for loop, which will only store logs and not the starter boilerplate content
for i in range(start_value,log_file_length):
    only_logs.append(content[i].strip())

file.close()

# end point for getting url 
@csrf_exempt
def get_URL(request):
    if request.method == "POST":
        data = request.body.decode('utf-8')
        url = json.loads((data))
        url_for_testing = url["url"]
    return JsonResponse({"message":"there is nothing here"})



# end point to give json response of logs
@csrf_exempt
def Logs(request):
    if request.method == "GET":
        return JsonResponse({"logs":only_logs})




