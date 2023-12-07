class Prepare extends Phaser.Scene {

    constructor() {
        var music;
        super("bootGame");
    }


    // Load in assets and give them names
    preload() {
        this.load.image('grass', '../../assets/images/grass.png');
        this.load.image('bigGrass', '../../assets/images/bigGrass.png');
        this.load.image('accessories', '../../assets/sheets/grassSheet.png');
        this.load.tilemapTiledJSON('map', '../../assets/sheets/universeTiles.json');
        this.load.spritesheet('player',
            '../../assets/sheets/player.png',
            { frameWidth: 93, frameHeight: 75 }
        );
        this.load.spritesheet('enemy',
            '../../assets/sheets/enemy.png',
            { frameWidth: 93, frameHeight: 75 }
        );
        this.load.spritesheet('sparkle',
            '../../assets/sheets/sparkle.png',
            { frameWidth: 63, frameHeight: 63 }
        );
       
        this.load.html('gameOver', '../html/gameOver.html');
        this.load.html('startGame', '../html/startGame.html');

        this.load.html('score', '../html/score.html');

        // this.load.audio('sparkles', '../../assets/sounds/8Bit.wav');

    }


    create() {
        this.add.text(20, 20, "Loading game...");
        this.scene.start("playGame");

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


        var audio = new Audio( '../../assets/sounds/8Bit.wav');
        audio.loop = true;
        audio.play();   

    }
}