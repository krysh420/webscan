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

$folderPath = "E:\Projects\WebScan\WebScan\scripts\FlaskServer\ReactApp"

if (Test-Path -Path $folderPath -PathType Container) {
    Write-Host "The folder exists."
} else {
    Write-Host "The folder does not exist."
}


