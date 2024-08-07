# import threading
from app import main_function
from datetime import datetime
from flask import Flask,jsonify,request
from flask_cors import CORS
# from watchdog.observers import Observer
# from watchdog.events import FileSystemEventHandler
import os.path
app = Flask(__name__)
CORS(app)

LOGNAME = 'LOG-' + datetime.now().strftime("%Y-%m-%d_%H-%M-%S") + '.log'
LOG_PATH = fr"../../logs/{LOGNAME}"

# class FileChangeHandler(FileSystemEventHandler):
#     def __init__(self, file_path, update_callback):
#         self.file_path = file_path
#         self.update_callback = update_callback

# def on_modified(self, event):
#     if event.src_path == self.file_path:
#         self.update_callback(self.file_path)


# def logs():
    

@app.route("/")
def index():
    return jsonify({"message":"Welcome to WebScan!"})


@app.route("/getURL",methods=['POST','GET'])
def get_URL():
    if request.is_json and request.method == "POST":
        data=request.get_json()
        data = data['Data']
        url_to_be_tested = data['URL']
        is_https = data['is_https']
        if is_https=="True":
            is_https=True
        else:
            is_https=False
        resp=main_function(is_https,url_to_be_tested)
        return jsonify({"logs":resp})
    # return jsonify({"logs":resp})
    return jsonify({"message":"Welcome to WebScan!"})



# end point to give json response of logs
# @app.route('/Logs',methods=['POST','GET'])
# def Logs():
#     if request.method == "GET":
#         only_logs = logs()
#         return jsonify({"logs":only_logs})
    
if __name__ == '__main__':   
    app.run(debug=True)
    # observer = Observer()
    # if os.path.isfile(LOG_PATH):
    #     try:
    #         handler = FileChangeHandler(LOG_PATH, logs)
    #         observer.schedule(handler, path=LOG_PATH, recursive=False)
    #         observer_thread = threading.Thread(target=observer.start)
    #         observer_thread.start()
    #     except FileNotFoundError:
    #         print("Waiting for user to start the scan...")
    #         observer.join()
    # else:
    #     print("Waiting for the user to start scanning")