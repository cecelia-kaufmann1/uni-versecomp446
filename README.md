# Welcome to the Uni-verse!

A capstone project from COMP 446 by Cecelia Kaufmann, Lucy Rubin, and Linda Lor

This interactive web application takes you into the world of unicorns, with the main goal of the unicorn being outrunning the papparazzi to collect sparkles! Then, go spend those sparkles at the store to show off to all your friends!




To install and run Uni-verse: 
After cloning the above repository, here are the steps to get the uni-verse up and running. Please run these commands below. Running this command will download all of the software needed for the application to run. 

Mac Step by Step to Install:
First, ensure that you have the most up to date Python, which should be Python 3. Before begnning this process, you will want to be in the terminal and you will want to cd into the project directory. 
Step 1: in the terminal, run pip3 install -r requirements.txt 
Step 2: then, run pip install virtual env
Once this is run, run python3 -m venv venv to create the virtual environment and then source venv/bin/activate to activate the virtual environment
Step 3: Next, run cd into .\loginscreen\ and lastly, run python manage.py runserver
Step 4: Finally take the link that the terminal gives and put it into your browser. From there, you should be able to go into the Uni-verse! When you are done, Ctrl + C to break and then type "deactivate" to deactivate the virtual environment. 

Windows Step by Step to Install:
First, ensure that you have the most up to date Python, which should be Python 3. Before begnning this process, you will want to be in the terminal and you will want to cd into the project directory. 
Step 1: in the terminal, run pip install -r requirements.txt
Step 2: then, run pip install virtualenv
Step 3: run virtualenv --python uni-versecomp446 venv to create the new virtual environment. Then to activate the environment, run .\venv\Scripts\activate
Step 4: Next, run cd into .\loginscreen\ and lastly, run python manage.py runserver
Step 5: Finally take the link that the terminal gives and put it into your browser. From there, you should be able to go into the Uni-verse! When you are done, Ctrl + C to break and then type "deactivate" to deactivate the virtual environment. 