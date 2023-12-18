const CANVAS_WIDTH = 950;
const CANVAS_HEIGHT = 530;
var config = {
  type: Phaser.AUTO,
  parent: 'game',
  width: CANVAS_WIDTH,
  height: CANVAS_HEIGHT,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 0 }
    }
  },
  dom: {
    createContainer: true
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }, 
  scale : {
    mode:  Phaser.Scale.RESIZE,
   }
};
var game = new Phaser.Game(config);
var cursors;
function preload() {

  this.load.image('default', 'static/loginscreen/assets/vectorArt/default.png');
  this.load.image('red', 'static/loginscreen/assets/vectorArt/red.png');
  this.load.image('orange', 'static/loginscreen/assets/vectorArt/orange.png');
  this.load.image('yellow', 'static/loginscreen/assets/vectorArt/yellow.png');
  this.load.image('green', 'static/loginscreen/assets/vectorArt/green.png');
  this.load.image('blue', 'static/loginscreen/assets/vectorArt/blue.png');
  this.load.image('purple', 'static/loginscreen/assets/vectorArt/purple.png');
  this.load.image('pink', 'static/loginscreen/assets/vectorArt/pink.png');
  this.load.image('white', 'static/loginscreen/assets/vectorArt/white.png');
  this.load.image('lightbrown', 'static/loginscreen/assets/vectorArt/lightbrown.png');
  this.load.image('medbrown', 'static/loginscreen/assets/vectorArt/medbrown.png');
  this.load.image('brown', 'static/loginscreen/assets/vectorArt/brown.png');
  this.load.image('black', 'static/loginscreen/assets/vectorArt/black.png');

  this.load.image('bottom1', '../static/loginscreen/assets/images/clothes/bottom1.png');
  this.load.image('bottom2', '../static/loginscreen/assets/images/clothes/bottom2.png');
  this.load.image('bottom3', '../static/loginscreen/assets/images/clothes/bottom3.png');
  this.load.image('bottom4', '../static/loginscreen/assets/images/clothes/bottom4.png');
  this.load.image('bottom5', '../static/loginscreen/assets/images/clothes/bottom5.png');
  this.load.image('bottom6', '../static/loginscreen/assets/images/clothes/bottom6.png');
  this.load.image('bottom7', '../static/loginscreen/assets/images/clothes/bottom7.png');
  this.load.image('bottom8', '../static/loginscreen/assets/images/clothes/bottom8.png');
  this.load.image('bottom9', '../static/loginscreen/assets/images/clothes/bottom9.png');
  this.load.image('bottom10', '../static/loginscreen/assets/images/clothes/bottom10.png');
  this.load.image('bottom11', '../static/loginscreen/assets/images/clothes/bottom11.png');
  this.load.image('bottom12', '../static/loginscreen/assets/images/clothes/bottom12.png');
  this.load.image('bottom13', '../static/loginscreen/assets/images/clothes/bottom13.png');
  this.load.image('bottom14', '../static/loginscreen/assets/images/clothes/bottom14.png');
  this.load.image('bottom15', '../static/loginscreen/assets/images/clothes/bottom15.png');
  this.load.image('bottom16', '../static/loginscreen/assets/images/clothes/bottom16.png');
  this.load.image('bottom17', '../static/loginscreen/assets/images/clothes/bottom17.png');
  this.load.image('bottom18', '../static/loginscreen/assets/images/clothes/bottom18.png');
  this.load.image('bottom19', '../static/loginscreen/assets/images/clothes/bottom19.png');
  this.load.image('bottom20', '../static/loginscreen/assets/images/clothes/bottom20.png');
  this.load.image('bottom21', '../static/loginscreen/assets/images/clothes/bottom21.png');

  this.load.image('top1', '../static/loginscreen/assets/images/clothes/top1.png');
  this.load.image('top2', '../static/loginscreen/assets/images/clothes/top2.png');
  this.load.image('top3', '../static/loginscreen/assets/images/clothes/top3.png');
  this.load.image('top4', '../static/loginscreen/assets/images/clothes/top4.png');
  this.load.image('top5', '../static/loginscreen/assets/images/clothes/top5.png');
  this.load.image('top6', '../static/loginscreen/assets/images/clothes/top6.png');
  this.load.image('top7', '../static/loginscreen/assets/images/clothes/top7.png');
  this.load.image('top8', '../static/loginscreen/assets/images/clothes/top8.png');
  this.load.image('top9', '../static/loginscreen/assets/images/clothes/top9.png');
  this.load.image('top10', '../static/loginscreen/assets/images/clothes/top10.png');
  this.load.image('top11', '../static/loginscreen/assets/images/clothes/top11.png');
  this.load.image('top12', '../static/loginscreen/assets/images/clothes/top12.png');
  this.load.image('top13', '../static/loginscreen/assets/images/clothes/top13.png');
  this.load.image('top14', '../static/loginscreen/assets/images/clothes/top14.png');
  this.load.image('top15', '../static/loginscreen/assets/images/clothes/top15.png');
  this.load.image('top16', '../static/loginscreen/assets/images/clothes/top16.png');

  this.load.image('feet1', '../static/loginscreen/assets/images/clothes/feet1.png');
  this.load.image('feet2', '../static/loginscreen/assets/images/clothes/feet2.png');
  this.load.image('feet3', '../static/loginscreen/assets/images/clothes/feet3.png');
  this.load.image('feet4', '../static/loginscreen/assets/images/clothes/feet4.png');
  this.load.image('feet5', '../static/loginscreen/assets/images/clothes/feet5.png');
  this.load.image('feet6', '../static/loginscreen/assets/images/clothes/feet6.png');
  this.load.image('feet7', '../static/loginscreen/assets/images/clothes/feet7.png');
  this.load.image('feet8', '../static/loginscreen/assets/images/clothes/feet8.png');
  this.load.image('feet9', '../static/loginscreen/assets/images/clothes/feet9.png');
  this.load.image('feet10', '../static/loginscreen/assets/images/clothes/feet10.png');
  this.load.image('feet11', '../static/loginscreen/assets/images/clothes/feet11.png');
  this.load.image('feet12', '../static/loginscreen/assets/images/clothes/feet12.png');

  this.load.image('backwardshat', '../static/loginscreen/assets/images/clothes/backwardshat.png');
  this.load.image('hat', '../static/loginscreen/assets/images/clothes/hat.png');
  this.load.image('partyhat', '../static/loginscreen/assets/images/clothes/partyhat.png');
  this.load.image('tophat', '../static/loginscreen/assets/images/clothes/tophat.png');
  this.load.image('carrot', '../static/loginscreen/assets/images/clothes/carrot.png');
  this.load.image('icecream', '../static/loginscreen/assets/images/clothes/icecream.png');
  this.load.image('headphones', '../static/loginscreen/assets/images/clothes/headphones.png');
  this.load.image('earring', '../static/loginscreen/assets/images/clothes/earring.png');
  this.load.image('pearls', '../static/loginscreen/assets/images/clothes/pearls.png');
  this.load.image('glasses', '../static/loginscreen/assets/images/clothes/glasses.png');
  this.load.image('monocle', '../static/loginscreen/assets/images/clothes/monocle.png');
  this.load.image('eyeliner1', '../static/loginscreen/assets/images/clothes/eyeliner1.png');
  this.load.image('eyeliner2', '../static/loginscreen/assets/images/clothes/eyeliner2.png');
  this.load.image('stache', '../static/loginscreen/assets/images/clothes/stache.png');
  this.load.image('nose', '../static/loginscreen/assets/images/clothes/nose.png');

  this.load.image('bigGrass', '../static/loginscreen/assets/images/bigGrass.png');
  this.load.image('cafebg', '../static/loginscreen/assets/images/fae_cafe.png')
  this.load.image('altbg', '../static/loginscreen/assets/images/alt_bg.png');
  this.load.image('singleSparkle', '../static/loginscreen/assets/images/singleSparkle.png');
  

  this.load.image('accessories', '../static/loginscreen/assets/sheets/grassSheet.png');
  this.load.tilemapTiledJSON('map', '../static/loginscreen/assets/sheets/universeTiles.json');

  this.load.html('chatInput', '../static/loginscreen/chatroom/html/chatInput.html');
}


var username = "Unknown user";
var wearing = [];
var owns = [];
var color = "default";

function create() {

  var self = this;
  this.socket = io();
  this.otherPlayers = this.physics.add.group();
  
  // listen for a message from the chatroom_template.html django file
  window.addEventListener('message', function (event) {
    username = event.data.username; // current player username
    wearing = event.data.wearing; // current player wearing
    owns = event.data.owns; // current player owns
    color = event.data.color; // current player avatar color
    self.socket.emit('updatePlayerUsernameAndWearing', username, wearing, owns, color); // save the data to the server
  });

  // update another player based on the new username and wearing data
  this.socket.on("updatePlayer", function (playerInfo) {
    // find the client version of the given player
    self.otherPlayers.getChildren().forEach(function (otherPlayer) {
      if (playerInfo.playerId === otherPlayer.playerId) { // match found
        // add username text below the avatar
        let usernameText = self.add.text(50, 100, playerInfo.username, { fontSize: '15px', fill: '#FFF' });
        usernameText.setOrigin(0.5,0.5);
        otherPlayer.add(usernameText);
        
        usernameText.itemType = "text";

        // put clothes on the avatar
        putOnClothes(self, otherPlayer, playerInfo);
      }
    });
  });

  // update current player based on the new username and wearing data
  this.socket.on("updateSelf", function (playerInfo, players) {
     // check if player is already online
    let numTimesLoggedIn = 0;
    Object.keys(players).forEach(function (id) {
      if (players[id].username === playerInfo.username) {
        numTimesLoggedIn++;
      }
    });

    // if you are already in the chatroom, force a disconnect
    if (numTimesLoggedIn > 1) {
      // code to force a disconnect: https://stackoverflow.com/questions/5048231/force-client-disconnect-from-server-with-socket-io-and-nodejs
      self.socket.disconnect();

      window.parent.postMessage("Disconnect user", "*");
    }
   
    // add username text below the avatar
    let usernameText = self.add.text(50, 100, playerInfo.username, { fontSize: '15px', fill: '#FFF' });
    usernameText.setOrigin(0.5,0.5);
    self.ship.add(usernameText);
    usernameText.itemType = "text";

    // put clothes on the avatar
    putOnClothes(self, self.ship, playerInfo);

    // tell the server that the updating has finished for this player
    self.socket.emit("selfFinishedUpdating");
  });

  // populate all of the players for the current user
  this.socket.on('currentPlayers', function (players, myPlayerInfo) {
  
    Object.keys(players).forEach(function (id) {
      // add the current player
      if (players[id].playerId === self.socket.id) {
        
        addPlayer(self, players[id]);
      } else {
        // add all other players
        addOtherPlayers(self, players[id]);
      }
    });
  });

  // update other players when a new player joins
  this.socket.on('newPlayer', function (playerInfo) {
    addOtherPlayers(self, playerInfo);
  });

  // remove player from everyone else when they disconnect
  this.socket.on('remove', function (playerId) {
    self.otherPlayers.getChildren().forEach(function (otherPlayer) {
      if (playerId === otherPlayer.playerId) {
        otherPlayer.destroy();
      }
    });
  });

  this.socket.on('playerMoved', function (playerInfo) {

    self.otherPlayers.getChildren().forEach(function (otherPlayer) {
      if (playerInfo.playerId === otherPlayer.playerId) {
        otherPlayer.setPosition(playerInfo.x, playerInfo.y);

        if (playerInfo.xSpeed < 0) {
          setPlayerFlipX(otherPlayer, false);
          otherPlayer.flipX = false;
        } else if (playerInfo.xSpeed > 0) {
          setPlayerFlipX(otherPlayer, true);
          otherPlayer.flipX = true;
        }
      }
    });
  });

  this.socket.on('showNewChat', function (text, user) {
    addNewChat(text, user);
  });

  cursors = this.input.keyboard.createCursorKeys();

  this.add.image(0, 320, "cafebg").setScale(0.7,0.7).setOrigin(0,0.55);

  // focus: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus
  focus(this);

  const element = this.add.dom(CANVAS_WIDTH * 0, CANVAS_HEIGHT).createFromCache('chatInput');
  element.setOrigin(0, 1);
  let chatLog = document.getElementById("chatLog");

  // put scrollbar at bottom is from: https://stackoverflow.com/questions/40903462/how-to-keep-a-scrollbar-always-bottom
  chatLog.scrollTop = chatLog.scrollHeight - chatLog.clientHeight;
  let submitChatButton = document.getElementById("submitchat");
  submitChatButton.addEventListener("click", function () {
    submitChat(self, username);
  });

  // fixing the space bar for sending chats from: https://stackoverflow.com/questions/1987439/space-bar-not-working-in-form-fields
  let chatInput = document.getElementById("chat");
  chatInput.addEventListener("keydown", (event) => {
    if (event.key == " ") {
      chatInput.value += " ";
    } else if (event.key == "Enter") {
      submitChat(self, username);
    }
  });

  this.boundaries = this.physics.add.staticGroup();
 
  this.boundaries.create(0, 230, 'bigGrass').setScale(2.9, 9).setTint(0xff0000).setOrigin(0,0).setAlpha(0).refreshBody();
  this.boundaries.create(0, 0, 'bigGrass').setScale(8, 4.3).setTint(0xff0000).setOrigin(0,0).setAlpha(0).refreshBody();
  this.boundaries.create(250, 18, 'bigGrass').setScale(10, 2).setTint(0xff0000).setOrigin(0,0).setAlpha(0).refreshBody();
}

const MAX_SPEED = 120;
var xSpeed = 0;
var ySpeed = 0;

// handle player movement
function update() {

  if (this.ship) {

    if (cursors.left.isDown) {
      xSpeed = -1;
      this.ship.flipX = false;
      setPlayerFlipX(this.ship, false);
    } else if (cursors.right.isDown) {
      xSpeed = 1;
      this.ship.flipX = true;
      setPlayerFlipX(this.ship, true);
    } else {
      xSpeed = 0;
    }

    if (cursors.up.isDown) {
      ySpeed = -1;
    } else if (cursors.down.isDown) {
      ySpeed = 1;
    } else {
      ySpeed = 0;
    }
    this.ship.body.setVelocity(xSpeed, ySpeed);
    this.ship.body.velocity.normalize().scale(MAX_SPEED);

    // store player position info
    var x = this.ship.x;
    var y = this.ship.y;
    var r = this.ship.rotation;

    // if the position has changed, emit a playerMovement event
    if (this.ship.oldPosition && (x !== this.ship.oldPosition.x || y !== this.ship.oldPosition.y || r !== this.ship.oldPosition.rotation)) {
      this.socket.emit('playerMovement', { x: this.ship.x, y: this.ship.y, xSpeed: this.ship.body.velocity.x });
    }
    // save old position data
    this.ship.oldPosition = {
      x: this.ship.x,
      y: this.ship.y,
      rotation: this.ship.rotation
    };
  }
}

// flip the player horizontally based on bool
function setPlayerFlipX(container, bool) {
  container.list.forEach(function (child) {
    let itemType = child.itemType;
    if (itemType != "text") {
      child.flipX = bool;
    }

    if (bool) {
      if (itemType == "skirt") {
        child.setOrigin(-0.2, -1.1);
      } else if (itemType == "top") {
        child.setOrigin(-1, -1.1);
      } else if (itemType == "bottom") {
        child.setOrigin(-0.3, -0.9);
      }  else if (itemType == "feet") {
        child.setOrigin(-.2, -8);
      } else if (itemType == "backcap") {
        child.setOrigin(-1.1, -0.3);
      }  else if (itemType == "cap") {
        child.setOrigin(-1.4, -0.3);
      } else if (itemType == "partyhattype") {
        child.setOrigin(-4.5, 0.3);
      } else if (itemType == "tophattype") {
        child.setOrigin(-2, 0.3);
      } else if (itemType == "carrothorn") {
        child.setOrigin(-3.8, 0.3);
      } else if (itemType == "icecreamhorn") {
        child.setOrigin(-1.6, 0.1);
      } else if (itemType == "headphonestype") {
        child.setOrigin(-2.25, -0.1);
      } else if (itemType == "necklace") {
        child.setOrigin(-2, -6);
      }  else if (itemType == "glassestype") {
        child.setOrigin(-1.15, -0.8);
      }  else if (itemType == "monocletype") {
        child.setOrigin(-1.9, -0.6);
      }  else if (itemType == "eyeliner") {
        child.setOrigin(-3.3, -1.25);
      }  else if (itemType == "mustache") {
        child.setOrigin(-7.5, -5.8);
      } else if (itemType == "nosetype") {
        child.setOrigin(-8.5, -2.8);
      }
    } else {
      if (itemType == "skirt") {
        child.setOrigin(-2, -1.1);
      } else if (itemType == "top") {
        child.setOrigin(-0.6, -1.1);
      } else if (itemType == "bottom") {
        child.setOrigin(-1.9, -0.9);
      }  else if (itemType == "feet") {
        child.setOrigin(-0.39, -8);
      } else if (itemType == "backcap") {
        child.setOrigin(-0.29, -0.3);
      }  else if (itemType == "cap") {
        child.setOrigin(0, -0.3);
      } else if (itemType == "partyhattype") {
        child.setOrigin(-1.5, 0.3);
      } else if (itemType == "tophattype") {
        child.setOrigin(-0.8, 0.3);
      } else if (itemType == "carrothorn") {
        child.setOrigin(-0.7, 0.3);
      } else if (itemType == "icecreamhorn") {
        child.setOrigin(-0.25, 0.1);
      } else if (itemType == "headphonestype") {
        child.setOrigin(-1.25, -0.1);
      } else if (itemType == "necklace") {
        child.setOrigin(-1, -6);
      }  else if (itemType == "glassestype") {
        child.setOrigin(-.25, -0.8);
      }  else if (itemType == "monocletype") {
        child.setOrigin(-.5, -0.6);
      }  else if (itemType == "eyeliner") {
        child.setOrigin(-1.5, -1.25);
      }  else if (itemType == "mustache") {
        child.setOrigin(0.1, -5.8);
      } else if (itemType == "nosetype") {
        child.setOrigin(0.5, -2.8);
      }
    }
  }, this);
}

// add avatar for the current player
function addPlayer(self, playerInfo) {
  self.ship = self.add.container();
  self.ship.x = playerInfo.x;
  self.ship.y = playerInfo.y;
  self.physics.world.enable(self.ship);
  let baseImage = self.physics.add.image(0, 0, "default").setOrigin(0, 0).setScale(0.3);

  self.ship.add(baseImage);

  self.ship.body.setDrag(100);
  self.ship.body.setAngularDrag(100);
  self.ship.body.setMaxVelocity(200);
  self.ship.username = playerInfo.username;

  self.ship.body.setCollideWorldBounds(true);
  self.physics.add.collider(self.ship, self.boundaries);

  makeParticleEmitter(self, self.ship);
}

// add avatar for other player
function addOtherPlayers(self, playerInfo) {

  const otherPlayer = self.add.container();
  otherPlayer.x = playerInfo.x;
  otherPlayer.y = playerInfo.y;
  self.physics.world.enable(otherPlayer);
  let baseImage = self.physics.add.image(0, 0, "default").setOrigin(0, 0).setScale(0.3)
  otherPlayer.add(baseImage);

  let usernameText = self.add.text(50, 100, playerInfo.username, { fontSize: '15px', fill: '#FFF' });
  usernameText.setOrigin(0.5,0.5);
  otherPlayer.add(usernameText);
  usernameText.itemType = "text";

  otherPlayer.playerId = playerInfo.playerId;
  otherPlayer.username = playerInfo.username;

  putOnClothes(self, otherPlayer, playerInfo);

  self.otherPlayers.add(otherPlayer);

  makeParticleEmitter(self, otherPlayer);
}

// add a sparkle particle emitter to the given sprite for 1 second
function makeParticleEmitter(self, sprite) {

  const particles = self.add.particles('singleSparkle');
  particles.setPosition(sprite.body.halfWidth,sprite.body.height);
  
  particles.createEmitter({
    quantity: 5,
   
    speed: 120,
    lifespan: 500,
    alpha: { start: 1, end: 0 },
    frequency: 100,
    scale: 0.4
  });

  sprite.add(particles);
  sprite.bringToTop(particles);
  self.time.delayedCall(1000, ()=>{
    particles.destroy();
});
}

// put clothes on the given sprite
function putOnClothes(self, sprite, playerInfo) {
  let color = playerInfo.color;
  if (color) {
    if (typeof(playerInfo.color.color) == "string"){
      color = playerInfo.color.color;
    } 
    let colorImage = self.physics.add.image(0, 0, color).setOrigin(0, 0).setScale(0.3);
    sprite.add(colorImage);
  }
 
  let wearingArray = playerInfo.wearing;
  if (typeof (playerInfo.wearing) == "string") {
    wearingArray = convertStringToArray(playerInfo.wearing);
  }
  if (typeof (playerInfo.wearing.wearing) == "string") {
    wearingArray = convertStringToArray(playerInfo.wearing.wearing);
  }
  let ownsArray = playerInfo.owns;

  if (typeof (playerInfo.owns.owns) == "string") {
    ownsArray = convertStringToArray(playerInfo.owns.owns);
  }
 
  wearingArray.forEach((item) => {
   
    let id = item;
    let name = clothes[id].name;
    let itemType = clothes[id].type;

    // if any of the clothes in wearing aren't also owned, do not put them on.
    if (ownsArray.includes(id)) {
      var clothingItem = self.physics.add.image(0, 0, name).setScale(0.3);
      if (itemType == "skirt") {
        clothingItem.setOrigin(-2, -1.1);
      } else if (itemType == "top") {
        clothingItem.setOrigin(-0.6, -1.1);
      } else if (itemType == "bottom") {
        clothingItem.setOrigin(-1.9, -0.9);
      } else if (itemType == "feet") {
        clothingItem.setOrigin(-0.39, -8);
      } else if (itemType == "backcap") {
        clothingItem.setOrigin(-0.29, -0.3);
      }  else if (itemType == "cap") {
        clothingItem.setOrigin(0, -0.3);
      } else if (itemType == "partyhattype") {
        clothingItem.setOrigin(-1.5, 0.3);
      } else if (itemType == "tophattype") {
        clothingItem.setOrigin(-0.8, 0.3);
      } else if (itemType == "carrothorn") {
        clothingItem.setOrigin(-0.7, 0.3);
      } else if (itemType == "icecreamhorn") {
        clothingItem.setOrigin(-0.25, 0.1);
      } else if (itemType == "headphonestype") {
        clothingItem.setOrigin(-1.25, -0.1);
      } else if (itemType == "necklace") {
        clothingItem.setOrigin(-1, -6);
      }  else if (itemType == "glassestype") {
        clothingItem.setOrigin(-.25, -0.8);
      }  else if (itemType == "monocletype") {
        clothingItem.setOrigin(-.5, -0.6);
      }  else if (itemType == "eyeliner") {
        clothingItem.setOrigin(-1.5, -1.25);
      }  else if (itemType == "mustache") {
        clothingItem.setOrigin(0.1, -5.8);
      } else if (itemType == "nosetype") {
        clothingItem.setOrigin(0.5, -2.8);
      }

      if (!(itemType == "feet" || itemType == "eyeliner")){ // make sure that feet are behind other clothes
        sprite.bringToTop(clothingItem);
    } 
      clothingItem.itemType = itemType;
      sprite.add(clothingItem);
    }
  });
}

// convert a string into an array for wearing or owns arrays
function convertStringToArray(str) {
  let newArray = [];
  if (str !== "null") {
    str = str.slice(0, str.length - 1); // take off final comma

    newArray = str.split(",");

    for (let i = 0; i < newArray.length; i++) {
      newArray[i] = parseInt(newArray[i]);
    }
  } else {
    // keep it as an empty array
  }
  return newArray;
}

var clothes;
// fetch json file from: https://stackoverflow.com/questions/7346563/loading-local-json-file
fetch("../chatroom/json/clothes.json")
  .then(response => response.json())
  .then(json => {

    clothes = json.clothes;
  });

// if there is a valid message in the chatbox, emit a signal that there is a new chat
function submitChat(self, user) {
  let chatInput = document.getElementById("chat");
  let text = chatInput.value;
  if (text) {
    self.socket.emit('newChat', text, user);
  }
}

// add a new chat to the chatlog
function addNewChat(text, user) {
  let chatLog = document.getElementById("chatLog");
  let chatInput = document.getElementById("chat");
  let message = document.createElement("div");
  message.classList.add("message");
  message.innerHTML = user + ": " + text;
  chatLog.appendChild(message);
  chatInput.value = "";

  // put scrollbar at bottom is from: https://stackoverflow.com/questions/40903462/how-to-keep-a-scrollbar-always-bottom
  chatLog.scrollTop = chatLog.scrollHeight - chatLog.clientHeight;
}

