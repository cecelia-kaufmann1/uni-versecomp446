var config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 0 }
    }
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
  this.load.image('player', '../assets/vectorArt/player.png');
  this.load.image('otherPlayer', '../assets/images/logo.png');
  this.load.image('bigGrass', '../../assets/images/bigGrass.png');
  this.load.image('altbg', '../../assets/images/alt_bg.png');

  
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
  
  cursors = this.input.keyboard.createCursorKeys();

  this.add.image(0, 0,"bigGrass").setScale(100);
  focus(this);
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
    this.ship.setVelocity(xSpeed,ySpeed);
    this.ship.body.velocity.normalize().scale(MAX_SPEED);
  
    
    // emit player movement

    // store player position info
    var x = this.ship.x;
    var y = this.ship.y;
    var r = this.ship.rotation;
    

    // if the position has changed, emit a playerMovement event
    if (this.ship.oldPosition && (x !== this.ship.oldPosition.x || y !== this.ship.oldPosition.y || r !== this.ship.oldPosition.rotation)) {
      this.socket.emit('playerMovement', { x: this.ship.x, y: this.ship.y, xSpeed: this.ship.body.velocity.x});
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
  self.ship = self.physics.add.image(playerInfo.x, playerInfo.y, 'player').setOrigin(0.5, 0.5).setScale(0.3);
  if (playerInfo.team === 'blue') {
    // self.ship.setTint(0x0000ff);
  } else {
    // self.ship.setTint(0xff0000);
  }
  self.ship.setDrag(100);
  self.ship.setAngularDrag(100);
  self.ship.setMaxVelocity(200);
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