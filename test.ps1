Write-Output "Activating virtual environment......"
& "webscan\bin\Activate.ps1"

Set-Location -Path "scripts"
python.exe test.py

Start-Process deactivate