/**
 * Created by 1 on 18.06.17.
 */
(function () {
    var GameInitialize = function GameInitialize() {
      var DEBUG_MODE = false,
          GAME_SPEED = 180,
          SCENE = 'game',
          TITLE_TEXT = 'Runner',
          LOADING_TEXT = "Loading...",
          DEVELOPER_COPYRIGHT_TEXT = "Developer\nEugene Obrezkov\nghaiklor@gmail.com",
          GRAPHIC_COPYRIGHT_TEXT = "Graphic\nDmitry Lezhenko\ndima.lezhenko@gmail.com",
          CANVAS_WIDTH = window.innerWidth || document.documentElement.clientWidth || document.getElementsByTagName('body')[0].clientWidth,
          CANVAS_HEIGHT = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
        if (CANVAS_WIDTH > 720) {
            CANVAS_WIDTH = 720;
        }
        if (CANVAS_HEIGHT > 1280) {
            CANVAS_HEIGHT = 1280;
        }
        var Background,
            Bird,
            Town,
            TitleText, InstructionsText, DeveloperCopyrightText, GraphicCopyrightText, ScoreText, HighScoreTitleText, HighScoreText, PostScoreText, LoadingText,
            isScorePosted = false;
        var gameScore = 0;


        var BootGameState = new Phaser.State();

        BootGameState.create = function () {
            LoadingText = Game.add.text(Game.world.width/2,Game.world.height/2,LOADING_TEXT,{
                font: "32px",
                fill: "#ffffff",
                stroke: "#000000",
                strokeThickness: 3,
                align: 'center'
            });
            LoadingText.anchor.setTo(0.5,0.5);

            Game.state.start("Preloader",false,false);

        };

        var PreloderGameState = new Phaser.State();
        PreloderGameState.preload = function () {
            loadAssets();
        };
        PreloderGameState.create = function () {
            Game.state.start("MainMenu",false,false);
        };
        var MainMenuState = new Phaser.State();

        MainMenuState.create = function() {

            isScorePosted = false;

            createBackground();
            Bird = Game.add.sprite(100, 300, 'bird');
            Bird.anchor.setTo(0.5, 0.5);
            Bird.animations.add('flying', [0, 1, 2, 3, 2, 1, 0], 20, true);
            Bird.animations.play('flying');
            Town = Game.add.tileSprite(0, Game.world.height - 128, Game.world.width, 128, 'town');

        };

        MainMenuState.update = function() {
            Town.tilePosition.x -= 1;
        };

        var loadAssets = function () {
            Game.load.spritesheet('bird', 'img/bird.png', 48, 35);
            Game.load.spritesheet('clouds', 'img/clouds.png', 64, 34);
            Game.load.image('town', 'img/town.png');
            Game.load.image('pipe', 'img/pipe.png');
        };

        var createBackground = function createBackground() {
            Background = Game.add.graphics(0, 0);
            Background.beginFill(0x53BECE, 1);
            Background.drawRect(0, 0, Game.world.width, Game.world.height);
            Background.endFill();
        };
        //Инициализация игры
        var Game = new Phaser.Game(CANVAS_WIDTH, CANVAS_HEIGHT, Phaser.CANVAS, SCENE, null, false, false);
        Game.raf = new Phaser.RequestAnimationFrame(Game);
        Game.antialias = true;
        Game.raf.start();

        Game.state.add('Boot', BootGameState, false);
        Game.state.add('Preloader', PreloderGameState, false);
        Game.state.add('MainMenu', MainMenuState, false);
        // Game.state.add('Game', GameState, false);
        // Game.state.add('GameOver', GameOverState, false);

        //Запуск загрузки
        Game.state.start('Boot');

    };
    WebFont.load({
        google: {
            families: ['Press+Start+2P']
        },
        active: function () {
            GameInitialize();
        }
    });
})();
