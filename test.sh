echo Activating virtual environment......
source WebScan/WebScan/bin/activate
cd scripts
python3 test.py
cd ..
deactivate