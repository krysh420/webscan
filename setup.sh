#!/bin/bash
echo Activating virtual environment......
cd WebScan
source .env/bin/activate && cd scripts && python3 setup.py && deactivate
cd ../..