Write-Output "Activating virtual environment......"
& "WebScan\bin\Activate.ps1"

Push-Location

Set-Location -Path "scripts"
python.exe app.py

Pop-location
deactivate