#!/bin/bash
echo Activating virtual environment......
cd WebScan
source .env/bin/activate && cd scripts/FlaskServer && python3 api.py & cd scripts/FlaskServer/ReactApp && npm run dev && deactivate
cd ../../../../