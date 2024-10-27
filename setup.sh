#!/bin/bash
echo Activating virtual environment......
cd WebScan
source WebScan/bin/activate
cd scripts
python3 setup.py
wait
cd ../..
deactivate