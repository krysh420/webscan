@echo off
echo Activating virtual environment......
source webscan\bin\activate
cd scripts
python.exe test.py
deactivate
exit