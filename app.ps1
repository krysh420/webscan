Write-Output "Activating virtual environment......"
& "webscan\bin\Activate.ps1"

Push-Location

Set-Location -Path "scripts"
python.exe app.py

Pop-location
deactivate