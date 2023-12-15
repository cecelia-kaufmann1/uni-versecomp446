// window.onload = function() {
//     var game = new Phaser.Game();
// }

const CANVAS_WIDTH = 950;
const CANVAS_HEIGHT = 530;
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
    scale : {
     mode:  Phaser.Scale.RESIZE,
    }
  }
  
  
  var game = new Phaser.Game(config);