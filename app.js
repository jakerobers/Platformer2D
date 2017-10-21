window.onload = function () {
  var LevelOne = function (game) {};
  LevelOne.prototype = {
    preload: function () {
      this.game.load.spritesheet("dude", "assets/dude.png", 32, 48);
      this.game.load.image("sky", "assets/sky.png");
      this.game.load.image("tile", "assets/tile_1.png");
      this.game.load.image("star", "assets/star.png");
    },
    create: function() {
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.game.add.sprite(0, 0, "sky");

      this.platforms = this.game.add.group();
      this.platforms.enableBody = true;

      this.star = this.game.add.group();
      this.star.enableBody = true;

      this.cursors = this.game.input.keyboard.createCursorKeys();

      var ground;

      // Create the platforms
      for (var i = 0; i < 25; i++) {
        ground = this.platforms.create(i*32, this.game.world.height - 32, "tile");
        ground.body.immovable = true;
      }

      ground = this.platforms.create(21*32, this.game.world.height - 5*32, "tile");
      ground.body.immovable = true;

      ground = this.platforms.create(14*32, this.game.world.height - 8*32, "tile");

      ground = this.platforms.create(8*32, this.game.world.height - 11*32, "tile");
      ground.body.immovable = true;

      ground = this.platforms.create(7*32, this.game.world.height - 11*32, "tile");
      ground.body.immovable = true;

      endLevelStar = this.star.create(7.5*32, this.game.world.height - 13*32, "star");
      endLevelStar.body.gravity.y = 100;
      endLevelStar.body.bounce = 0.2;

      this.player = this.game.add.sprite(32, this.game.world.height - 150, "dude");
      this.game.physics.arcade.enable(this.player);

      this.player.body.bounce.y = 0.2;
      this.player.body.gravity.y = 300;
      this.player.body.collideWorldBounds = true;
      this.player.animations.add("left", [0, 1, 2, 3], 10, true);
      this.player.animations.add("right", [5, 6, 7, 8], 10, true);

    },
    update: function() {
      var hitPlatform = this.game.physics.arcade.collide(this.player, this.platforms);
      this.game.physics.arcade.overlap(this.player, this.star, this.changeLevel, null, this);
      this.game.physics.arcade.collide(this.star, this.platforms);

      this.player.body.velocity.x = 0;

      if (this.cursors.left.isDown) {
        this.player.body.velocity.x = -150;
        this.player.animations.play("left");
      } else if (this.cursors.right.isDown) {
        this.player.body.velocity.x = 150;
        this.player.animations.play("right");
      } else {
        this.player.animations.stop();
        this.player.frame = 4;
      }

      if (this.cursors.up.isDown && this.player.body.touching.down && hitPlatform) {
        this.player.body.velocity.y = -280;
      }
    },

    changeLevel: function () {
      this.game.state.start("2");
    }
  };

  var LevelTwo = function(game) {}

  LevelTwo.prototype = {
    preload: function () {
      this.game.load.spritesheet("dude", "assets/dude.png", 32, 48);
      this.game.load.image("sky", "assets/sky.png");
      this.game.load.image("tile", "assets/tile_1.png");
      this.game.load.image("star", "assets/star.png");
    },
    create: function() {
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.game.add.sprite(0, 0, "sky");

      this.platforms = this.game.add.group();
      this.platforms.enableBody = true;

      this.star = this.game.add.group();
      this.star.enableBody = true;

      this.player = this.game.add.sprite(32, this.game.world.height - 150, "dude");
      this.game.physics.arcade.enable(this.player);

      this.player.body.bounce.y = 0.2;
      this.player.body.gravity.y = 300;
      this.player.body.collideWorldBounds = true;
      this.player.animations.add("left", [0, 1, 2, 3], 10, true);
      this.player.animations.add("right", [5, 6, 7, 8], 10, true);

      this.cursors = this.game.input.keyboard.createCursorKeys();

      var ground;

      // Create the platforms
      for (var i = 0; i < 25; i++) {
        ground = this.platforms.create(i*32, this.game.world.height - 32, "tile");
        ground.body.immovable = true;
      }
    },
    update: function() {
      var hitPlatform = this.game.physics.arcade.collide(this.player, this.platforms);
      this.game.physics.arcade.overlap(this.player, this.star, this.changeLevel, null, this);
      this.game.physics.arcade.collide(this.star, this.platforms);

      this.player.body.velocity.x = 0;

      if (this.cursors.left.isDown) {
        this.player.body.velocity.x = -150;
        this.player.animations.play("left");
      } else if (this.cursors.right.isDown) {
        this.player.body.velocity.x = 150;
        this.player.animations.play("right");
      } else {
        this.player.animations.stop();
        this.player.frame = 4;
      }

      if (this.cursors.up.isDown && this.player.body.touching.down && hitPlatform) {
        this.player.body.velocity.y = -280;
      }
    },

    changeLevel: function () {
      this.game.state.start("2");
    }
  };


  var game = new Phaser.Game(800,600, Phaser.AUTO, "");
  game.state.add("1", LevelOne);
  game.state.add("2", LevelTwo);
  game.state.start("1");

}
