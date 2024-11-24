Write-Output "Activating virtual environment......"
& "WebScan\WebScan\bin\Activate.ps1"

Set-Location -Path "WebScan"
Push-Location

Set-Location -Path "scripts\FlaskServer"
Start-Process python.exe -ArgumentList "api.py"

Set-Location -Path "ReactApp"
Start-Process npm -ArgumentList 'run', 'dev'


Pop-location
deactivate