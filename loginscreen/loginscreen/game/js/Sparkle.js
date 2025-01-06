
// code for creating custom phaser classes is from https://www.youtube.com/watch?v=qs5xmT6Upsc
class Sparkle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene) {
        // Place enemy at random y-value off of the right of the screen
        var x = CANVAS_WIDTH * 1.1;
        var y = Phaser.Math.Between(0, CANVAS_HEIGHT);
        super(scene, x, y, "sparkle");

        // Add to scene
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        sparkles.add(this);

        // Visuals
        this.play("sparkleIdle");
        this.setScale(SPRITE_SCALE);

        // Physics

        this.resizeBoundingBoxes();
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
    }
}