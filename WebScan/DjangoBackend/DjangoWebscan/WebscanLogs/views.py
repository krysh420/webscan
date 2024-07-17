from django.http import JsonResponse


def index(request):
    jsonOutput = {"name":"joseph","surname":"joestar"}
    return JsonResponse(jsonOutput)

