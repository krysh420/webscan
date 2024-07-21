Write-Output "Activating virtual environment......"
& "webscan\bin\Activate.ps1"

Set-Location -Path "scripts"
python.exe setup.py

Start-Process deactivate