// Constants
const FRICTION = 15; // value for how much player should slide when movement stops
const PLAYER_SPEED = 330; // player vertical speed

let INIT_ENEMY_SPAWN_RATE = 300;
let INIT_SPARKLE_SPAWN_RATE = 250;
let INIT_RUNNING_SPEED = -110;

// Global variables
var cursors;
var player;
var enemies;
var sparkles;
var gameOver = false;
var score = 0;
var clockTick = 0;
var enemySpawnRate = INIT_ENEMY_SPAWN_RATE;
var sparkleSpawnRate = INIT_SPARKLE_SPAWN_RATE;
var startTime;
var runningSpeed = INIT_RUNNING_SPEED; // speed of how objects move to the left to create illusion of player running
var startedGame = false;

class MainScene extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    preload() {
        this.load.audio('bg_music', '/static/loginscreen/assets/sounds/8bitpaparazzi.mp3');
        this.load.audio('old_bg_music', '/static/loginscreen/assets/sounds/8Bit.wav');
        this.load.audio('sparkle', '/static/loginscreen/assets/sounds/Confirm.wav');
        this.load.audio('gameTransition', '/static/loginscreen/assets/sounds/gameStart.mp3');
        this.load.audio('countdownSound', '/static/loginscreen/assets/sounds/countdown.mp3');
        this.load.audio('gameOver', '/static/loginscreen/assets/sounds/gameOver.mp3');
    }
    create() {
        // Get time that the game started (used for increasing difficulty)
        var clock = new Date();
        startTime = clock.getTime();

        // User Input
        cursors = this.input.keyboard.createCursorKeys();

        // Set up background
        this.map = this.make.tilemap({ key: "map" });
        const tileset = this.map.addTilesetImage("MagicForest", "grass");
    
        this.add.image(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, "bigGrass").setScale(100);

        this.map2 = this.make.tilemap({ key: "map" });
        const tileset2 = this.map.addTilesetImage("MagicForest", "accessories");
      
        // flower layer 1
        this.layer3 = this.map.createDynamicLayer('Accessories', tileset2, 0, 0);
        this.layer3.setScale(3);
        this.layer3.shuffle(0, 0, 1800, 1800);

        // flower layer 2
        this.layer4 = this.map2.createDynamicLayer('Accessories', tileset2, this.layer3.displayWidth * 0.75, 0);
        this.layer4.setScale(3);
        this.layer4.shuffle(0, 0, 1800, 1800);

        // Set up player
        player = this.physics.add.sprite(CANVAS_WIDTH / 20, CANVAS_HEIGHT / 2, 'player');
        player.setBounce(0.2);
        player.setCollideWorldBounds(true);
        player.anims.play('idleRight', true);
        player.setScale(SPRITE_SCALE);

        this.originalFrameRate = player.anims.msPerFrame;

        // Set up enemies
        enemies = this.add.group();

        // Set up sparkles
        sparkles = this.add.group();
        this.createUI();

        this.resizeBoundingBoxes();

        this.getAudioPermission();
        
        const element = this.add.dom(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2).createFromCache('startGame');
        playNoise('../static/loginscreen/assets/sounds/camera_shutter.m4a', 1);

        element.setOrigin(0.5);

        element.setPosition(-1000,-1000);

        element.addListener('click');
        let self = this; // need to save 'this' because 'this' changes meaning once inside the evemt listener. from https://stackoverflow.com/questions/28386051/problems-calling-a-function-inside-a-listener-onclick
        element.on('click', function (event) {
            if (event.target.name === "play") {
                if (event.target.id === "easy") {
                    INIT_ENEMY_SPAWN_RATE = 270;
                    INIT_SPARKLE_SPAWN_RATE = 250;
                    INIT_RUNNING_SPEED = -110;
                } else if (event.target.id === "medium") {
                    INIT_ENEMY_SPAWN_RATE = 220;
                    INIT_SPARKLE_SPAWN_RATE = 200;
                    INIT_RUNNING_SPEED = -210;
                } else if (event.target.id === "hard") {
                    INIT_ENEMY_SPAWN_RATE = 170;
                    INIT_SPARKLE_SPAWN_RATE = 150;
                    INIT_RUNNING_SPEED = -310;
                } else if (event.target.id === "extreme") {
                    INIT_ENEMY_SPAWN_RATE = 120;
                    INIT_SPARKLE_SPAWN_RATE = 100;
                    INIT_RUNNING_SPEED = -410;
                }

                runningSpeed = INIT_RUNNING_SPEED;
             
                self.music = this.scene.sound.add("bg_music", { loop: true });

                let gameBox = document.getElementsByClassName("gameBox")[0];
                gameBox.classList.add("animateAway");
                self.countdown(element);
            }
        });

        let homebg = this.add.sprite(CANVAS_WIDTH/2, CANVAS_HEIGHT/2,"vectorbg");
        let vectorSprite = this.add.sprite(CANVAS_WIDTH * 0.3, CANVAS_HEIGHT / 2, "vectorsprite").setScale(-1,1);
        let paparazziSprite = this.add.sprite(CANVAS_WIDTH * 0.75, CANVAS_HEIGHT / 2, "paparazzisprite");
        paparazziSprite.anims.play('paparazzi');

        setTimeout(function() {
            let transistionCover = self.add.sprite(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, 'transition');
            transistionCover.anims.play('transitionCover', false);
            transistionCover.setScale(2.2);
            self.children.bringToTop(transistionCover);
    
            let transitionReveal = self.add.sprite(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, 'transition');
            transitionReveal.setScale(2.2);
            transitionReveal.anims.play('transitionReveal', false);
            self.children.bringToTop(transitionReveal);

            var transitionSound = self.sound.add("gameTransition", { loop: false });
            transitionSound.play();
        }, 2000);
       
       setTimeout(function() {
            homebg.destroy();
            vectorSprite.destroy();
            paparazziSprite.destroy();
       }, 2600);

       setTimeout(function() {
        element.setPosition(CANVAS_WIDTH/2,CANVAS_HEIGHT/2);
        let gameBox = document.getElementsByClassName('gameBox')[0];
        gameBox.classList.add("animateIn");
       }, 3200);
    }
    update() {
        if (!startedGame) {
            return;
        }
        if (!gameOver) {
            this.children.bringToTop(this.scoreText);
            
            // move background
            this.layer3.x += (runningSpeed / 60.0);
            this.layer4.x += (runningSpeed / 60.0);

            // respawn background
            if (this.layer3.x <= -this.layer3.displayWidth) {
                this.layer3.x = this.layer4.x + this.layer4.displayWidth * 0.75;
                this.layer3.shuffle(0, 0, 1800, 1800);
            } else if (this.layer4.x <= -this.layer4.displayWidth) {
                this.layer4.x = this.layer3.x + this.layer3.displayWidth * 0.75;
                this.layer4.shuffle(0, 0, 1800, 1800);
            }
            
            clockTick++;
            // increase difficulty about every 10 seconds
            if (clockTick % 450 == 0) {
                this.increaseDifficulty();
            }

            //  Spawn in new enemies
            if (clockTick % enemySpawnRate < 1) {
                var enemy = new Enemy(this);
                this.physics.add.overlap(player, enemy, this.hitEnemy, null, this);
            }

            // Spawn in new sparkles
            if (clockTick % sparkleSpawnRate < 1) {
                var sparkle = new Sparkle(this);
                this.physics.add.overlap(player, sparkle, this.collectSparkle, null, this);
            }

            // Update existing enemies
            for (var i = 0; i < enemies.getChildren().length; i++) {
                var enemy = enemies.getChildren()[i];
                enemy.update(runningSpeed);
                if (enemy.body.x <= -100) {
                    enemy.destroy();
                }
            }

            // Update existing sparkles
            for (var i = 0; i < sparkles.getChildren().length; i++) {
                var sparkle = sparkles.getChildren()[i];
                sparkle.update(runningSpeed);
                if (sparkle.body.x <= -100) {
                    sparkle.destroy();
                }
            }

            // Handle user input/player movement
            if (cursors.up.isDown) {
                player.setVelocityY(-PLAYER_SPEED);
            } else if (cursors.down.isDown) {
                player.setVelocityY(PLAYER_SPEED);
            } else if (player.body.velocity.y > FRICTION) {
                player.setVelocityY(player.body.velocity.y - FRICTION);
            } else if (player.body.velocity.y < -FRICTION) {
                player.setVelocityY(player.body.velocity.y + FRICTION);
            } else {
                player.setVelocityY(0);
            }
        }
    }

    // Game over when the player touches an enemy
    hitEnemy(player, enemy) {
        gameOver = true;
        this.physics.pause();

        // Delete all enemies
        enemies.clear(true, true);

        // Delete all sparkles
        sparkles.clear(true, true);

        // reset player position
        player.y = CANVAS_HEIGHT / 2;
        player.msPerFrame = this.originalFrameRate;

        // reset background position
        this.layer3.x = 0;
        this.layer4.x = 2700;

        this.gameOver();

        player.anims.play("idleRight", true);
    }

    // create the score text UI
    createUI() {
        this.scoreText = this.add.text(0, 0, "", { fontSize: '32px', fill: '#FFF', fontFamily: 'videoGameFont' });
        this.scoreText.setPadding(10, 10, 10, 10);
        
        this.updateUI();
    }
   
    // called whenever a player gets a sparkle
    collectSparkle(player, sparkle) {
        this.sound.play('sparkle')

        sparkle.destroy();
        score += 1;
        this.updateUI();
    }

    // update the score text to match the current score value
    updateUI() {
        this.scoreText.text = "Sparkles: " + score;
        this.scoreText.x = CANVAS_WIDTH - this.scoreText.displayWidth * 1.1;
    }

    increaseDifficulty() {
        enemySpawnRate *= 0.85;
        sparkleSpawnRate *= 0.85;
        runningSpeed *= 1.2;
        player.anims.msPerFrame = player.anims.msPerFrame * 0.925;
    }

    // Display game over screen
    gameOver() {
        this.music.pause();
        this.sound.play("gameOver");

        this.scoreText.text = "";
        // code to add DOM elements is from https://labs.phaser.io/edit.html?src=src/game%20objects/dom%20element/css%20style%20object.js&v=3.60.0
        const element = this.add.dom(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2).createFromCache('gameOver');
        element.setOrigin(0.5);

        element.addListener('click');
        let self = this; // need to save 'this' because 'this' changes meaning once inside the evemt listener. from https://stackoverflow.com/questions/28386051/problems-calling-a-function-inside-a-listener-onclick
        element.on('click', function (event) {
            if (event.target.name === "replay") {
                if (event.target.id === "easy") {
                    INIT_ENEMY_SPAWN_RATE = 270;
                    INIT_SPARKLE_SPAWN_RATE = 250;
                    INIT_RUNNING_SPEED = -110;
                } else if (event.target.id === "medium") {
                    INIT_ENEMY_SPAWN_RATE = 220;
                    INIT_SPARKLE_SPAWN_RATE = 200;
                    INIT_RUNNING_SPEED = -210;
                } else if (event.target.id === "hard") {
                    INIT_ENEMY_SPAWN_RATE = 170;
                    INIT_SPARKLE_SPAWN_RATE = 150;
                    INIT_RUNNING_SPEED = -310;
                } else if (event.target.id === "extreme") {
                    INIT_ENEMY_SPAWN_RATE = 120;
                    INIT_SPARKLE_SPAWN_RATE = 100;
                    INIT_RUNNING_SPEED = -410;
                }
                let gameBox = document.getElementsByClassName("gameBox")[0];
                gameBox.classList.add("animate");
                self.replay(element);
            }
        });

        let el = document.getElementById("score");
        el.displayOriginX = 100;
        el.x = 100;
        el.innerHTML = "Sparkles collected: " + score;

        el = document.getElementById("totalSparkles");
        el.innerHTML = "Total sparkles:  " + "N/A";
        startedGame = false;

        this.updateSparklesInDB();
    }

    // Uses ajax to update the number of sparkles in the database
    updateSparklesInDB() {
        let currentSparklesInDB = 0;
        // first, get the number of sparkles that the user currently has
        $.ajax({
            url: '/get_sparkles/',
            type: "GET",
            dataType: "json",
            success: function (data) {
                currentSparklesInDB = data.sparkles;
                // calculate what the new sparkle value should be
                let newNumSparkles = currentSparklesInDB + score;
                // on success, post the new value
                $.ajax({
                    type: 'POST',
                    url: '/update_sparkles/',
                    data: {
                        sparkles: newNumSparkles,
                    },
                    success: function (data) {
                        // the success will automatically update the number of sparkles for user end of site
                        $("#score").text("Sparkles: " + score);
                        $("#totalSparkles").text("Total Sparkles: " + data);
                        $("#sparkles_status").text(data);
                    }
                })
            },
            error: function (error) {
                console.log(`Error ${error}`);
            }
        });
    }

    // replay the game - elementToDelete is either the gameover screen or start game screen
    replay(elementToDelete) {
        score = 0;
        this.updateUI();

        runningSpeed = INIT_RUNNING_SPEED;

        gameOver = false;
        this.countdown(elementToDelete);
        player.setVelocityY(0);
        this.physics.resume();


    }
    // Change size of sprite bounding boxes to align with the image size
    resizeBoundingBoxes() {
        // Set up bounding box for player
        player.body.setSize(player.displayWidth * 0.6, player.displayHeight * 0.5, true); // code for smaller bounding box: https://labs.phaser.io/edit.html?src=src/physics/arcade/smaller%20bounding%20box.js

        player.body.offset.y = player.displayHeight * 0.2;
    }

    // Countdown from 3 and then start the game. Remove elementToDelete from the screen
    countdown(elementToDelete) {
        let countdownText = this.add.text(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2, "3", { fontSize: '100px', fill: '#FFF', fontFamily: "videoGameFont"});
        countdownText.setOrigin(0.5);
        startedGame = true;
        sparkleSpawnRate = INIT_SPARKLE_SPAWN_RATE;
        enemySpawnRate = INIT_ENEMY_SPAWN_RATE;
        runningSpeed = INIT_RUNNING_SPEED;
        player.anims.play("right", true);

        var countdownSound = this.sound.add("countdownSound", { loop: false });
        countdownSound.play();
        let self = this;
        
        setTimeout(function () {
            countdownText.text = "2";
            setTimeout(function () {
                countdownText.text = "1";
                setTimeout(function () {
                    self.music.play();
                    elementToDelete.destroy();
                    countdownText.destroy();
                }, 1000);
            }, 1000);
        }, 1000);
    }

    getAudioPermission() {
        $.ajax({
            url: '/get_audio_preference/',
            type: "GET",
            dataType: "json",
            success: function (data) {
                if (!data.audio_preference) {
                    game.sound.mute = true;
                }
            }
        })   
    }
}