from flask_cors import CORS
from app import main_function
from datetime import datetime
from flask import Flask,jsonify,request

app = Flask(__name__)
CORS(app)

# LOGNAME = 'LOG-' + datetime.now().strftime("%Y-%m-%d_%H-%M-%S") + '.log'
# LOG_PATH = fr"../../logs/{LOGNAME}"
LOG_PATH = fr"../../logs/LOG-2024-08-05_19-01-10.log"

def logs():
    try:
        #opening the files to be read
        file = open(LOG_PATH,'r')
        content = file.readlines()
        #some declarations for loop
        only_logs=[]
        start_value=0
        stop_value=0
        for i in content:
            if("+ Server" in i):
                start_value=content.index(i)+1
            elif("+ ERROR" in i or "+ Scan terminated:" in i):
                stop_value=content.index(i)
                break
            else:
                continue

        # for loop, which will only store logs and not the starter boilerplate content
        for i in range(start_value,stop_value):
            if "See:" in content[i]:
                index=content[i].find("See:")
                content[i]=content[i].replace(content[i][index::],"")
                only_logs.append(content[i])
            if "+" or "/:" in content[i]:
                content[i]=content[i].replace("+","")
                content[i]=content[i].replace("/:","")
                only_logs.append(content[i])
        file.close()
        return only_logs
    except FileNotFoundError:
        print("Waiting for user to start scanning.....")

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
        main_function(is_https,url_to_be_tested)
    return jsonify({"message":"Welcome to WebScan!"})



# end point to give json response of logs
@app.route('/Logs',methods=['POST','GET'])
def Logs():
    if request.method == "GET":
        only_logs = logs()
        return jsonify({"logs":only_logs})
    
if __name__=="__main__":
    app.run(debug=False)