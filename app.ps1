Write-Output "Activating virtual environment......"
& "WebScan\WebScan\bin\Activate.ps1"

Set-Location -Path "WebScan"
Push-Location

Set-Location -Path "scripts\FlaskServer"
Start-Job -ScriptBlock { Start-Process python.exe api.py}
Start-Process python.exe app.py

Pop-location
deactivate