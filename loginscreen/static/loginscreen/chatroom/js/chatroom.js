const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 600;
var config = {
  // type: Phaser.AUTO,
  parent: 'phaser-example',
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
  this.load.image('player', '../../assets/vectorArt/player.png');
  this.load.image('bottom1', '../../assets/images/clothes/bottom1.png');
  this.load.image('bottom2', '../../assets/images/clothes/bottom2.png');
  this.load.image('bottom3', '../../assets/images/clothes/bottom3.png');
  this.load.image('bottom4', '../../assets/images/clothes/bottom4.png');
  this.load.image('bottom5', '../../assets/images/clothes/bottom5.png');
  this.load.image('bottom6', '../../assets/images/clothes/bottom6.png');
  this.load.image('top2', '../../assets/images/clothes/top2.png');
  this.load.image('top3', '../../assets/images/clothes/top3.png');
  this.load.image('bigGrass', '../../assets/images/bigGrass.png');
  this.load.image('altbg', '../../assets/images/alt_bg.png');

  this.load.image('accessories', '../../assets/sheets/grassSheet.png');
  this.load.tilemapTiledJSON('map', '../../assets/sheets/universeTiles.json');

  this.load.html('chatInput', 'html/chatInput.html');

}

function create() {
  var self = this;
  
  this.socket = io();
  this.otherPlayers = this.physics.add.group();
 
  // populate all of the players for the current user
  this.socket.on('currentPlayers', function (players) {
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

  this.socket.on('showNewChat', function(text) {
    console.log("showNewChat");
    addNewChat(text);
  });

  cursors = this.input.keyboard.createCursorKeys();

  this.add.image(0, 0, "bigGrass").setScale(100);

  this.map2 = this.make.tilemap({key: "map"});
        const tileset2 = this.map2.addTilesetImage("MagicForest", "accessories");
        
        // flower layer 1
        this.layer3 = this.map2.createDynamicLayer('Accessories', tileset2, 0, 0);
        this.layer3.setScale(3);
        this.layer3.shuffle(0,0,1800,1800);

  // focus: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus
  focus(this);

  

  const element = this.add.dom(CANVAS_WIDTH * 0, CANVAS_HEIGHT).createFromCache('chatInput');
  element.setOrigin(0,1);
  let chatLog = document.getElementById("chatLog");


  

  

  // put scrollbar at bottom is from: https://stackoverflow.com/questions/40903462/how-to-keep-a-scrollbar-always-bottom
  chatLog.scrollTop = chatLog.scrollHeight - chatLog.clientHeight;

  let submitChatButton = document.getElementById("submitchat");
  submitChatButton.addEventListener("click", function() {
    submitChat(self);
  });


  // fixing the space bar for sending chats from: https://stackoverflow.com/questions/1987439/space-bar-not-working-in-form-fields
let chatInput = document.getElementById("chat");
chatInput.addEventListener("keydown", (event) => {
  if (event.key == " "){
    chatInput.value += " ";
  }
}); 



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
  container.list.forEach(function(child) {
    let itemType = child.itemType;
   
    child.flipX = bool;
    if (bool) {
      if (itemType == "skirt") {
        child.setOrigin(-0.2,-1.1);
      } else if (itemType == "top"){
        child.setOrigin(-1,-1.1);
      } else if (itemType == "bottom"){
        child.setOrigin(-0.3,-0.9);
      }
    } else {
      if (itemType == "skirt") {
        child.setOrigin(-2,-1.1);
      } else if (itemType == "top"){
        child.setOrigin(-0.6,-1.1);
      } else if (itemType == "bottom"){
        child.setOrigin(-1.9,-0.9);
      }
    }
    
  }, this);
}
function addPlayer(self, playerInfo) {
  self.ship = self.add.container();
  self.ship.x = playerInfo.x;
  self.ship.y = playerInfo.y;
  self.physics.world.enable(self.ship);
  let baseImage = self.physics.add.image(0,0, 'player').setOrigin(0, 0).setScale(0.3);
  self.ship.add(baseImage);

  putOnClothes(self, self.ship, playerInfo);
  
  if (playerInfo.team === 'blue') {
    // self.ship.setTint(0x0000ff);
  } else {
    // self.ship.setTint(0xff0000);
  }
  self.ship.body.setDrag(100);
  self.ship.body.setAngularDrag(100);
  self.ship.body.setMaxVelocity(200);

  self.ship.body.setCollideWorldBounds(true);

}

function addOtherPlayers(self, playerInfo) {
  
  const otherPlayer = self.add.container();
  otherPlayer.x = playerInfo.x;
  otherPlayer.y = playerInfo.y;
  self.physics.world.enable(otherPlayer);
  let baseImage = self.physics.add.image(0,0, 'player').setOrigin(0, 0).setScale(0.3)
  otherPlayer.add(baseImage);

  putOnClothes(self, otherPlayer, playerInfo);
  otherPlayer.playerId = playerInfo.playerId;
  self.otherPlayers.add(otherPlayer);
}

function putOnClothes(self, sprite, playerInfo) {
  
  
  
  playerInfo.wearing.forEach((item) => {
    let id = item;
    let name = clothes[id].name;
    let itemType = clothes[id].type;
    console.log("wearing: " + itemType);
   
    var clothingItem = self.physics.add.image(0, 0, name).setScale(0.3);
    if (itemType == "skirt") {
      clothingItem.setOrigin(-2,-1.1);
    } else if (itemType == "top"){
      clothingItem.setOrigin(-0.6,-1.1);
    } else if (itemType == "bottom"){
      clothingItem.setOrigin(-1.9,-0.9);
    }
    clothingItem.itemType = itemType;
    sprite.add(clothingItem);
    // for (let i = 0; i < wearing.length; i++) {
        //     let id = wearing[i];
        //     let item = clothes[wearing[i]].name;
        //     let itemType = clothes[wearing[i]].type;
        //     console.log("reaindg: " + id);
        //     // putOn(item, itemType, id);
        // }
  });
}

var clothes;
// fetch json file from: https://stackoverflow.com/questions/7346563/loading-local-json-file
fetch("../../Inner Screen Files/clothes.json")
    .then(response => response.json())
    .then(json => {

        clothes = json.clothes;
        // put on each item that user is currently wearing
        // for (let i = 0; i < wearing.length; i++) {
        //     let id = wearing[i];
        //     let item = clothes[wearing[i]].name;
        //     let itemType = clothes[wearing[i]].type;
        //     console.log("reaindg: " + id);
        //     // putOn(item, itemType, id);
        // }
       
    });



// if there is a valid message in the chatbox, emit a signal that there is a new chat
function submitChat(self) {
  let chatInput = document.getElementById("chat");
  let text = chatInput.value;
  if (text){
    self.socket.emit('newChat', text);
  }
}

// add a new chat to the chatlog
function addNewChat(text) {
  let chatLog = document.getElementById("chatLog");
  let chatInput = document.getElementById("chat");
  let message = document.createElement("div");
  message.classList.add("message");
  message.innerHTML = "username: " + text;
  chatLog.appendChild(message);
  chatInput.value = "";

  // put scrollbar at bottom is from: https://stackoverflow.com/questions/40903462/how-to-keep-a-scrollbar-always-bottom
  chatLog.scrollTop = chatLog.scrollHeight - chatLog.clientHeight;
  
}

