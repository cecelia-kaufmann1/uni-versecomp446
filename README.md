# Welcome to the Uni-verse!

A capstone project for Macalester College's COMP 446 by Cecelia Kaufmann, Lucy Rubin, and Linda Lor

This interactive web application takes you into the world of unicorns, with the main goal of the unicorn being outrunning the papparazzi to collect sparkles! Then, go spend those sparkles at the store to show off to all your friends! Finally, go chat with other unicorns while you are dressed in your finest attire. 

This project uses the Django Framework to host the login and then a separate server to host the multiplayer/chatroom feature, which is then embedded within the wesbite. The game utilizes the Phaser Framework, and we also used Ajax for asychronous loading. For the front-end framework, we used HTML, CSS, and Javascript. 

To install and run Uni-verse: 
After cloning the above repository, here are the steps to get the uni-verse up and running. Please run these commands below. Running this command will download all of the software needed for the application to run. 

Mac Step by Step to Install:
First, ensure that you have the most up to date Python, which should be Python 3. Before begnning this process, you will want to be in the terminal and you will want to cd into the project directory. 
Step 1: in the terminal, run pip3 install -r requirements.txt 
Step 2: then, run pip install virtual env. To run the second server, you will also want to do npm install express. Once this is run, run python3 -m venv venv to create the virtual environment and then source venv/bin/activate to activate the virtual environment
Step 3: Next, run cd into .\loginscreen\ and lastly, run python manage.py runserver. Open a new terminal and run node server.js (this will activate the second terminal for the chat room). 
Step 4: Finally take the link that the first terminal gives and put it into your browser. From there, you should be able to go into the Uni-verse! When you are done, Ctrl + C to break and then type "deactivate" to deactivate the virtual environment. 

Windows Step by Step to Install:
First, ensure that you have the most up to date Python, which should be Python 3. Before begnning this process, you will want to be in the terminal and you will want to cd into the project directory. 
Step 1: in the terminal, run pip install -r requirements.txt
Step 2: then, run pip install virtualenv. To run the second server, you will also want to do npm install express.
Step 3: run virtualenv --python uni-versecomp446 venv to create the new virtual environment. Then to activate the environment, run .\venv\Scripts\activate
Step 4: Next, run cd into .\loginscreen\ and lastly, run python manage.py runserver. Open a new terminal and run node server.js (this will activate the second terminal for the chat room). 
Step 5: Finally take the link that the terminal gives and put it into your browser. From there, you should be able to go into the Uni-verse! When you are done, Ctrl + C to break and then type "deactivate" to deactivate the virtual environment. 


Credits:
GAME ASSETS
Unicorn Base and Clothing Assets 
Linda Lor 

Unicorn Dress Up Backdrop
Linda Lor

Unicorn Sparkles Collection Backdrop 
Lucy Rubin

Unicorn Sparkles Sprites 
Linda Lor 

Unicorn Sparkles Music
https://soundcloud.com/timbeek/8bit-dna-loop 
BRANDING
Button Design 
Lucy Rubin

Home Backdrop Image
Linda Lor 

Gradient Home Backdrop Image
<a href="https://www.freepik.com/free-vector/pastel-gradient-1_34294700.htm#query=rainbow%20gradient&position=12&from_view=keyword&track=ais&uuid=e76850eb-714b-43a7-a460-e20b131b0199">Image by juicy_fish</a> on Freepik

Site Link

Rainbow Icon NOT USED YET
https://www.hiclipart.com/free-transparent-background-png-clipart-itxob/download 

Universe Logo
Linda Lor 
