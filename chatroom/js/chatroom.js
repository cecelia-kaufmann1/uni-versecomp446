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
      debug: true,
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
  this.load.image('skirt', '../../assets/images/clothes/bottom1.png');
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
          otherPlayer.flipX = false;
        } else if (playerInfo.xSpeed > 0) {
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
     
    } else if (cursors.right.isDown) {
      xSpeed = 1;
      this.ship.flipX = true;
      
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

function addPlayer(self, playerInfo) {
  self.ship = self.add.container();
  self.physics.world.enable(self.ship);
  let baseImage = self.physics.add.image(playerInfo.x, playerInfo.y, 'player').setOrigin(0.5, 0.5).setScale(0.3)
  

  var skirt = self.physics.add.image(playerInfo.x, playerInfo.y, 'skirt').setScale(0.3);
  skirt.setOrigin(-0.5,0.2);
  self.ship.add(baseImage);
  self.ship.add(skirt);
  // skirt.anchor.setTo(0.5, 0.5);
  // self.ship.addChild(skirt);


  
  if (playerInfo.team === 'blue') {
    // self.ship.setTint(0x0000ff);
  } else {
    // self.ship.setTint(0xff0000);
  }
  self.ship.body.setDrag(100);
  self.ship.body.setAngularDrag(100);
  self.ship.body.setMaxVelocity(200);
}

function addOtherPlayers(self, playerInfo) {
  const otherPlayer = self.add.sprite(playerInfo.x, playerInfo.y, 'player').setOrigin(0.5, 0.5).setScale(0.3)
  // if (playerInfo.team === 'blue') {
  //   otherPlayer.setTint(0x0000ff);
  // } else {
  //   otherPlayer.setTint(0xff0000);
  // }
  otherPlayer.playerId = playerInfo.playerId;
  self.otherPlayers.add(otherPlayer);
}

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

