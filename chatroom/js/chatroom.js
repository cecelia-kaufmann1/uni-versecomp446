const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 600;
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
  }
};
var game = new Phaser.Game(config);
var cursors;
function preload() {

  this.load.image('player', 'static/loginscreen/assets/vectorArt/player.png');
  this.load.image('bottom1', '../static/loginscreen/assets/images/clothes/bottom1.png');
  this.load.image('bottom2', '../static/loginscreen/assets/images/clothes/bottom2.png');
  this.load.image('bottom3', '../static/loginscreen/assets/images/clothes/bottom3.png');
  this.load.image('bottom4', '../static/loginscreen/assets/images/clothes/bottom4.png');
  this.load.image('bottom5', '../static/loginscreen/assets/images/clothes/bottom5.png');
  this.load.image('bottom6', '../static/loginscreen/assets/images/clothes/bottom6.png');
  this.load.image('top2', '../static/loginscreen/assets/images/clothes/top2.png');
  this.load.image('top3', '../static/loginscreen/assets/images/clothes/top3.png');
  this.load.image('bigGrass', '../static/loginscreen/assets/images/bigGrass.png');
  this.load.image('altbg', '../static/loginscreen/assets/images/alt_bg.png');
  

  this.load.image('accessories', '../static/loginscreen/assets/sheets/grassSheet.png');
  this.load.tilemapTiledJSON('map', '../static/loginscreen/assets/sheets/universeTiles.json');

  this.load.html('chatInput', '../static/loginscreen/chatroom/html/chatInput.html');

}


var username = "Unknown user";
var wearing = [];
var owns = [];
function create() {


  var self = this;
  this.socket = io();
  this.otherPlayers = this.physics.add.group();

  // listen for a message from the chatroom_template.html django file
  window.addEventListener('message', function (event) {
    username = event.data.username; // current player username
    wearing = event.data.wearing; // current player wearing
    owns = event.data.owns; // current player owns
    self.socket.emit('updatePlayerUsernameAndWearing', username, wearing, owns); // save the data to the server
  });

  // update another player based on the new username and wearing data
  this.socket.on("updatePlayer", function (playerInfo) {
    // find the client version of the given player
    self.otherPlayers.getChildren().forEach(function (otherPlayer) {
      if (playerInfo.playerId === otherPlayer.playerId) { // match found
        // add username text below the avatar
        let usernameText = self.add.text(0, 100, playerInfo.username, { fontSize: '15px', fill: '#FFF' });
        otherPlayer.add(usernameText);
        usernameText.itemType = "text";

        // put clothes on the avatar
        putOnClothes(self, otherPlayer, playerInfo);
      }
    });
  });

  // update current player based on the new username and wearing data
  this.socket.on("updateSelf", function (playerInfo) {
    // add username text below the avatar
    let usernameText = self.add.text(0, 100, playerInfo.username, { fontSize: '15px', fill: '#FFF' });
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
    // console.log("new player");
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
        // otherPlayer.setRotation(playerInfo.rotation);
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
    // console.log("showNewChat: text =",text, "user=",user);
    addNewChat(text, user);
  });

  cursors = this.input.keyboard.createCursorKeys();

  this.add.image(0, 0, "bigGrass").setScale(100);

  this.map2 = this.make.tilemap({ key: "map" });
  const tileset2 = this.map2.addTilesetImage("MagicForest", "accessories");

  // flower layer 1
  this.layer3 = this.map2.createDynamicLayer('Accessories', tileset2, 0, 0);
  this.layer3.setScale(3);
  this.layer3.shuffle(0, 0, 1800, 1800);

  // focus: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus
  focus(this);


  const element = this.add.dom(CANVAS_WIDTH * 0, CANVAS_HEIGHT).createFromCache('chatInput');
  element.setOrigin(0, 1);
  let chatLog = document.getElementById("chatLog");

  // put scrollbar at bottom is from: https://stackoverflow.com/questions/40903462/how-to-keep-a-scrollbar-always-bottom
  chatLog.scrollTop = chatLog.scrollHeight - chatLog.clientHeight;
  let submitChatButton = document.getElementById("submitchat");
  submitChatButton.addEventListener("click", function () {
    // console.log("self.username:", username);
    submitChat(self, username);
  });


  // fixing the space bar for sending chats from: https://stackoverflow.com/questions/1987439/space-bar-not-working-in-form-fields
  let chatInput = document.getElementById("chat");
  chatInput.addEventListener("keydown", (event) => {
    if (event.key == " ") {
      chatInput.value += " ";
    }
  });

  this.boundaries = this.physics.add.staticGroup();
  this.boundaries.create(0, 320, 'bigGrass').setScale(2.9, 6).setTint(0xff0000).setOrigin(0,0).setAlpha(0).refreshBody();

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


    // emit player movement

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
      }
    } else {
      if (itemType == "skirt") {
        child.setOrigin(-2, -1.1);
      } else if (itemType == "top") {
        child.setOrigin(-0.6, -1.1);
      } else if (itemType == "bottom") {
        child.setOrigin(-1.9, -0.9);
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
  let baseImage = self.physics.add.image(0, 0, 'player').setOrigin(0, 0).setScale(0.3);

  self.ship.add(baseImage);

  if (playerInfo.team === 'blue') {
    // self.ship.setTint(0x0000ff);
  } else {
    // self.ship.setTint(0xff0000);
  }
  self.ship.body.setDrag(100);
  self.ship.body.setAngularDrag(100);
  self.ship.body.setMaxVelocity(200);
  self.ship.username = playerInfo.username;

  self.ship.body.setCollideWorldBounds(true);
  self.physics.add.collider(self.ship, self.boundaries);


}

// add avatar for other player
function addOtherPlayers(self, playerInfo) {

  const otherPlayer = self.add.container();
  otherPlayer.x = playerInfo.x;
  otherPlayer.y = playerInfo.y;
  self.physics.world.enable(otherPlayer);
  let baseImage = self.physics.add.image(0, 0, 'player').setOrigin(0, 0).setScale(0.3)
  otherPlayer.add(baseImage);

  let usernameText = self.add.text(0, 100, playerInfo.username, { fontSize: '15px', fill: '#FFF' });
  otherPlayer.add(usernameText);
  usernameText.itemType = "text";

  otherPlayer.playerId = playerInfo.playerId;
  otherPlayer.username = playerInfo.username;

  putOnClothes(self, otherPlayer, playerInfo);

  self.otherPlayers.add(otherPlayer);
}

function putOnClothes(self, sprite, playerInfo) {

  let wearingArray = playerInfo.wearing;
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
      }
      clothingItem.itemType = itemType;
      sprite.add(clothingItem);
    }
  });
}



function convertStringToArray(str) {
  let newArray = [];
  if (str !== "null") {
    str = str.slice(0, str.length - 1); // take off final comma

    newArray = str.split(",");

    for (let i = 0; i < newArray.length; i++) {
      newArray[i] = parseInt(newArray[i]);
    }
  } else {
    console.log("twas null");
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
    // console.log("emit: ", user);
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

