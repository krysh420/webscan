Write-Output "Activating virtual environment......"
& "WebScan\.env\bin\Activate.ps1"

Set-Location -Path "WebScan"
Push-Location

Set-Location -Path "scripts"
python.exe setup.py

Pop-location
deactivate