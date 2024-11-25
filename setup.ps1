Write-Output "Activating virtual environment......"
& "WebScan\.env\bin\Activate.ps1"

Set-Location -Path "WebScan"
Push-Location

Set-Location -Path "scripts\FlaskServer\ReactApp"
Start-Process npm -ArgumentList 'install'

Set-Location -Path "../../"
python.exe setup.py

Write-Output "App is now ready to use! ReOpen the terminal window and run .\app.ps1"

Pop-location
deactivate
