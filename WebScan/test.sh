echo Activating virtual environment......
source WebScan/bin/activate
cd scripts
python test.py
cd ..
deactivate