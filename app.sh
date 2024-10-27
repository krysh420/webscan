#!/bin/bash
echo Activating virtual environment......
source WebScan/WebScan/bin/activate
cd WebScan/scripts/FlaskServer
python3 api.py
cd ../..
deactivate             
