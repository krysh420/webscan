from django.urls import path

from . import views

# declaring separate end points for a good data fetching experience

urlpatterns = [
    path("getURL", views.get_URL, name="URL"),
    path("Logs", views.Logs, name="logs"),
    # path("ResLogs", views.Res_Logs, name="resLogs"),
]