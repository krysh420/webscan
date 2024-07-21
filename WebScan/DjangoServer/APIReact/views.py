from django.http import HttpResponse,JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def index(request):
    if request.method == "POST":
        data = request.body.decode('utf-8')
        url = json.loads((data))
        print("URL from the form is:",(url["url"]))
    return JsonResponse({"message":"hy"})

