@echo off
echo Activating virtual environment......
call webscan\bin\activate
cd scripts
python.exe app.py
deactivate