Write-Output "Activating virtual environment......"
& "WebScan\bin\Activate.ps1"

Push-Location

Set-Location -Path "scripts"
python.exe test.py

Pop-location
deactivate