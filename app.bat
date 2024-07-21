@echo off
echo Activating virtual environment......
source webscan\bin\activate
cd deps
python app.py
deactivate
exit