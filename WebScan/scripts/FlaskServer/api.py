
from app import main_function
from datetime import datetime
from flask import Flask,jsonify,request
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

LOGNAME = 'LOG-' + datetime.now().strftime("%Y-%m-%d_%H-%M-%S") + '.log'
LOG_PATH = fr"../../logs/{LOGNAME}"
    

@app.route("/")
def index():
    return jsonify({"message":"Welcome to WebScan!"})


@app.route("/Logs",methods=['POST','GET'])
def Logs():
    if request.is_json and request.method == "POST":
        data=request.get_json()
        data = data['Data']
        url_to_be_tested = data['URL']
        is_https = data['is_https']
        port = data['port']
        if is_https=="True":
            is_https=True
        else:
            is_https=False
        resp=main_function(is_https,url_to_be_tested,port)
        return jsonify({"logs":resp})
    return jsonify({"message":"Welcome to WebScan!"})

if __name__ == '__main__':   
    app.run(debug=True)