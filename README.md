# Welcome to the Uni-verse!

A capstone project for Macalester College's COMP 446 by Cecelia Kaufmann, Lucy Rubin, and Linda Lor

This interactive web application takes you into the world of unicorns, with the main goal of the unicorn being outrunning the paparazzi to collect sparkles! Then, go spend those sparkles at the store to show off to all your friends! Finally, go chat with other unicorns while you are dressed in your finest attire. 

This project uses the Django Framework to host the login and then a separate server to host the multiplayer/chatroom feature, which is then embedded within the wesbite. The game utilizes the Phaser Framework, and we also used Ajax for asychronous loading. For the front-end framework, we used HTML, CSS, and Javascript. 

To install and run Uni-verse: 
After cloning the above repository, here are the steps to get the uni-verse up and running. Please run these commands below. Running this command will download all of the software needed for the application to run. 

Mac Step by Step to Install:
First, ensure that you have the most up to date Python, which should be Python 3. Before begnning this process, you will want to be in the terminal and you will want to cd into the project directory. 
Step 1: in the terminal, run pip3 install -r requirements.txt 
Step 2: then, run pip install virtual env.  To run the second server, with need to open a second terminal, cd into the project, and install "npm install express". Once this is run, run python3 -m venv venv to create the virtual environment and then source venv/bin/activate to activate the virtual environment
Step 3: Next, run cd into .\loginscreen\ and lastly, run python manage.py runserver. Open a new terminal and run node server.js (this will activate the second terminal for the chat room). 
Step 4: Finally take the link that the first terminal gives and put it into your browser. From there, you should be able to go into the Uni-verse! When you are done, Ctrl + C to break and then type "deactivate" to deactivate the virtual environment. 

Windows Step by Step to Install:
First, ensure that you have the most up to date Python, which should be Python 3. Before begnning this process, you will want to be in the terminal and you will want to cd into the project directory. 
Step 1: in the terminal, run pip install -r requirements.txt
Step 2: then, run pip install virtualenv. To run the second server, with need to open a second terminal, cd into the project, and install "npm install express".
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

Get Sparkles Game Transition: Sound Effect from https://pixabay.com/sound-effects/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=6104

Get Sparkles Countdown: Sound Effect by Lesiakower on https://pixabay.com/sound-effects//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=151797

Get Sparkles Game Over: Sound Effect from https://pixabay.com/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=38507

Get Sparkles Paparazzi 8 bit song: https://www.youtube.com/watch?v=V0ZvdCeIPzM


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


Links to Resources:
Virtual Environment Set Up:
https://mothergeo-py.readthedocs.io/en/latest/development/how-to/venv-win.html

Django Documentation:
https://docs.djangoproject.com/en/5.0/
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django

Accessibility Components:
https://www.siteimprove.com/glossary/accessible-fonts/#:~:text=The%20most%20accessible%20fonts%20are,also%20considered%20to%20be%20accessible.

Django Login/Login Database Tutorial: 
https://learndjango.com/tutorials/django-login-and-logout-tutorial
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Django/Authentication

Chatroom:
Code for correctly positioning/parenting the phaser canvas: https://phaser.discourse.group/t/how-do-i-move-phaser-game-to-the-center-of-a-browser/8577 
Code for removing border form iframe: https://stackoverflow.com/questions/65034/remove-border-from-iframe
Custom scrollbar from Eye Catching Scrollbar #4 on https://css-tricks.com/classy-and-cool-custom-css-scrollbars-a-showcase/
Tag Inputs: https://www.w3schools.com/tags/tag_input.asp
Server:
Code for setting up mulitplyer server is from https://gamedevacademy.org/create-a-basic-multiplayer-game-in-phaser-3-with-socket-io-part-1/#Setting_up_the_server
Code for this line is from https://stackoverflow.com/questions/64923775/typeerror-require-listen-is-not-a-function
Code for disconnecting a socket:https://www.dynetisgames.com/2017/03/06/how-to-make-a-multiplayer-online-game-with-phaser-socket-io-and-node-js/ 
Code for sending messages to iframe: https://javascriptbit.com/transfer-data-between-parent-window-and-iframe-postmessage-api/ 


Virtual Environment and Requirements.txt file:
https://mothergeo-py.readthedocs.io/en/latest/development/how-to/venv-win.html

Get Sparkles Game: 
HTML and CSS for the 8bit style container: https://codepen.io/robdimarzo/pen/eYWmxKr
HTML and CSS for video game style buttons based off of: https://codepen.io/reulison/pen/WNNVPZq
Adding a custom font to phaser from: https://learn.yorkcs.com/2019/09/28/phaser-3-basics-custom-fonts/

