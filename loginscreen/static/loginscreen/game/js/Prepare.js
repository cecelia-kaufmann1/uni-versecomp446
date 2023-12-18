class Prepare extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    // Load in assets and give them names
    preload() {
        this.load.image('grass', '/static/loginscreen/assets/images/grass.png');
        this.load.image('bigGrass', '/static/loginscreen/assets/images/bigGrass.png');
        this.load.image('accessories', '/static/loginscreen/assets/sheets/grassSheet.png');
        this.load.image('vectorsprite', '/static/loginscreen/assets/vectorArt/default.png');
        this.load.image('vectorbg', '/static/loginscreen/assets/images/home_bg.png');
        this.load.tilemapTiledJSON('map', '/static/loginscreen/assets/sheets/universeTiles.json');
        this.load.spritesheet('player',
            '/static/loginscreen/assets/sheets/player.png',
            { frameWidth: 93, frameHeight: 75 }
        );
        this.load.spritesheet('enemy',
            '/static/loginscreen/assets/sheets/enemy.png',
            { frameWidth: 93, frameHeight: 75 }
        );
        this.load.spritesheet('sparkle',
            '/static/loginscreen/assets/sheets/sparkle.png',
            { frameWidth: 63, frameHeight: 63 }
        );
        this.load.spritesheet('transition',
            '/static/loginscreen/assets/sheets/transition.png',
            { frameWidth: 475, frameHeight: 265 }
        );

        this.load.html('gameOver', '/static/loginscreen/game/html/gameOver.html');
        this.load.html('startGame', '/static/loginscreen/game/html/startGame.html');
        this.load.html('score', '/static/loginscreen/game/html/score.html');

    }

    create() {
        this.add.text(20, 20, "Loading game...");
        this.scene.start("playGame");

        // var audio = new Audio('/static/loginscreen/assets/sounds/8Bit.wav');
        // audio.loop = true;
        // audio.muted = false;
        // audio.play();

        // Animations
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 6, end: 9 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'idleLeft',
            frames: this.anims.generateFrameNumbers('player', { start: 12, end: 13 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'idleRight',
            frames: this.anims.generateFrameNumbers('player', { start: 14, end: 15 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'enemy',
            frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 15 }),
            frameRate: 10,
            repeat: -1, 
        });

        this.anims.create({
            key: 'sparkleIdle',
            frames: this.anims.generateFrameNumbers('sparkle', { start: 0, end: 1 }),
            frameRate: 3,
            repeat: -1, 
        });

        this.anims.create({
            key: 'transitionCover',
            frames: this.anims.generateFrameNumbers('transition', { start: 0, end: 15 }),
            frameRate: 20,
            repeat: 0, 
            hideOnComplete: true,
        });
        this.anims.create({
            key: 'transitionReveal',
            frames: this.anims.generateFrameNumbers('transition', { start: 0, end: 31 }),
            frameRate: 20,
            repeat: 0, 
        });
    }
}