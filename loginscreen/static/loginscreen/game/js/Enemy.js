
// code for creating custom phaser classes is from https://www.youtube.com/watch?v=qs5xmT6Upsc
class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
         // Place enemy at random y-value off of the right of the screen
        var x = CANVAS_WIDTH * 1.1;
        var y = Phaser.Math.Between(0,CANVAS_HEIGHT);
        super(scene, x, y, "enemy");

        // Add to scene
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        enemies.add(this);

        // Visuals
        this.play("enemy");
        this.setScale(SPRITE_SCALE);


        // Physics
        this.slime_offset = 0;
        // this.body.velocity.x = -70;
        this.acceleration = 5;

        this.resizeBoundingBoxes();

        this.ENEMY_Y_SPEED = 120; // speed of enemies oscillating on y-axis
        this.ENEMY_MAX_DISTANCE = 100;  // distance enemies oscillate

        this.body.velocity.y = this.ENEMY_Y_SPEED;
        this.acceleration = -5;

        
    }

     // Change size of sprite bounding boxes to align with the image size
     resizeBoundingBoxes() {
        // Change these based on sprite size
        this.body.setSize(this.displayWidth * 0.6, this.displayHeight * 0.5, true);
        // code for smaller bounding box: https://labs.phaser.io/edit.html?src=src/physics/arcade/smaller%20bounding%20box.js
        this.body.offset.y = this.displayHeight * 0.2;

        
    }
    
    update(xSpeed) {
        // Move to the left
        this.body.velocity.x = xSpeed;
    
        if (this.body.velocity.y >= this.ENEMY_Y_SPEED){
            this.acceleration = -1.1;
        } else if (this.body.velocity.y <= -this.ENEMY_Y_SPEED) {
            this.acceleration = 1.1;
        }
        this.body.velocity.y += this.acceleration;
       
    }
}