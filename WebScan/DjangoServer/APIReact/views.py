from django.http import HttpResponse,JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

# Declaring path of logs and resolved logs
LOG_PATH = r"Logs\Logs.txt"
RES_LOG_PATH = r"Logs\ResLogs.txt"


# opening the files
log_file = open(LOG_PATH,"r")
res_log_file = open(RES_LOG_PATH,"r")


# reading the very first line
log_file_content = log_file.readline()
res_log_file_content = res_log_file.readline()


# initialising the list to be sent to react in json response 
final_response_logs=[]
final_response_res_logs=[]


# populating final_response_logs list with logs
while (log_file_content!=""):
    json_logs = {}
    json_logs["log"]=log_file_content
    final_response_logs.append(json_logs)
    log_file_content = log_file.readline()


# populating final_response_res_logs list with resolved logs
while (res_log_file_content!=""):
    json_res_logs = {}
    json_res_logs["ResLog"]=res_log_file_content
    final_response_res_logs.append(json_res_logs)
    res_log_file_content = res_log_file.readline()


# closing the files
log_file.close()
res_log_file.close()


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
        return JsonResponse({"logs":final_response_logs})


# end point to give json response of res logs
@csrf_exempt
def Res_Logs(request):
    if request.method == "GET":
        return JsonResponse({"ResLogs":final_response_res_logs})

