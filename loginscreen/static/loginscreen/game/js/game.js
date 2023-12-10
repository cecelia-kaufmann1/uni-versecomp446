// window.onload = function() {
//     var game = new Phaser.Game();
// }

const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 600;
const SPRITE_SCALE = 1.25;

  var config = {
    parent: 'game',
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
    backgroundColor: 0x000000,
    scene: [Prepare, MainScene],
    // pixelArt: true,
    physics: {
      default: "arcade",
      arcade:{
          debug: false,
          debugShowVelocity: false
      }
    }, 
    dom: {
      createContainer: true
    },
  }
  
  
  var game = new Phaser.Game(config);