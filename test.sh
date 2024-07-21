echo Activating virtual environment......

source webscan/bin/activate

cd scripts
python test.py

deactivate
