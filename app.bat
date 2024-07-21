@echo off
echo Activating virtual environment......
call webscan\bin\Activate.ps1
cd scripts
python.exe app.py
deactivate