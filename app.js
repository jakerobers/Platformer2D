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

      this.endLevelStar = this.star.create(7.5*32, this.game.world.height - 13*32, "star");
      this.endLevelStar.body.gravity.y = 100;
      this.endLevelStar.body.bounce = 0.2;

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
      this.game.load.image("potion", "assets/potion.png");
    },
    create: function() {
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.game.add.sprite(0, 0, "sky");

      this.platforms = this.game.add.group();
      this.platforms.enableBody = true;

      this.star = this.game.add.group();
      this.star.enableBody = true;

      this.potionGroup = this.game.add.group();
      this.potionGroup.enableBody = true;

      this.potion = this.game.add.sprite(96, this.game.world.height - 150, "potion");
      this.potion.scale.setTo(0.1434, 0.1666);
      this.game.physics.arcade.enable(this.potion);
      this.potion.body.gravity.y = 300;

      this.player = this.game.add.sprite(32, this.game.world.height - 150, "dude");
      this.game.physics.arcade.enable(this.player);

      this.player.body.bounce.y = 0.2;
      this.player.body.gravity.y = 300;
      this.player.body.collideWorldBounds = true;
      this.player.animations.add("left", [0, 1, 2, 3], 10, true);
      this.player.animations.add("right", [5, 6, 7, 8], 10, true);

      this.playerVelocity = 100;

      this.cursors = this.game.input.keyboard.createCursorKeys();

      var ground;

      // Create the platforms
      for (var i = 0; i < 25; i++) {
        ground = this.platforms.create(i*32, this.game.world.height - 32, "tile");
        ground.body.immovable = true;
      }
      ground = this.platforms.create(16*32, this.game.world.height - 5*32, "tile");
      ground.body.immovable = true;

      ground = this.platforms.create(10*32, this.game.world.height - 9*32, "tile");
      ground.body.immovable = true;

      ground = this.platforms.create(15*32, this.game.world.height - 12*32, "tile");
      ground.body.immovable = true;
      ground = this.platforms.create(16*32, this.game.world.height - 12*32, "tile");
      ground.body.immovable = true;


      this.endLevelStar = this.star.create(15.5*32, this.game.world.height - 14*32, "star");
      this.endLevelStar.body.gravity.y = 100;
      this.endLevelStar.body.bounce = 0.2;

    },
    update: function() {
      var hitPlatform = this.game.physics.arcade.collide(this.player, this.platforms);
      this.game.physics.arcade.overlap(this.player, this.star, this.changeLevel, null, this);
      this.game.physics.arcade.overlap(this.player, this.potion, this.speedBoost, null, this);

      this.game.physics.arcade.collide(this.star, this.platforms);
      this.game.physics.arcade.collide(this.potion, this.platforms);

      this.player.body.velocity.x = 0;

      if (this.cursors.left.isDown) {
        this.player.body.velocity.x = -1 * this.playerVelocity;
        this.player.animations.play("left");
      } else if (this.cursors.right.isDown) {
        this.player.body.velocity.x = this.playerVelocity;
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
      this.game.state.start("3");
    },

    speedBoost: function() {
      this.playerVelocity = 200;
      this.potion.kill();

      setTimeout(function() {
        this.playerVelocity = 100;
      }.bind(this), 4000);

    }
  };

// ===========================================================

  var LevelThree = function(game) {}

  LevelThree.prototype = {
    preload: function () {
      this.game.load.spritesheet("dude", "assets/dude.png", 32, 48);
      this.game.load.image("sky", "assets/sky.png");
      this.game.load.image("tile", "assets/tile_1.png");
      this.game.load.image("star", "assets/star.png");
      this.game.load.image("wings", "assets/wings.png");
    },
    create: function() {
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.game.add.sprite(0, 0, "sky");

      this.platforms = this.game.add.group();
      this.platforms.enableBody = true;

      this.star = this.game.add.group();
      this.star.enableBody = true;

      this.wingGroup = this.game.add.group();
      this.wingGroup.enableBody = true;

      this.wings = this.game.add.sprite(5.5*32, this.game.world.height - 11*32, "wings");
      this.wings.scale.setTo(0.294, 0.178);
      this.game.physics.arcade.enable(this.wings);
      this.wings.body.gravity.y = 300;

      this.player = this.game.add.sprite(32, 50, "dude");
      this.game.physics.arcade.enable(this.player);

      this.player.body.bounce.y = 0.2;
      this.player.body.gravity.y = 300;
      this.player.body.collideWorldBounds = true;
      this.player.animations.add("left", [0, 1, 2, 3], 10, true);
      this.player.animations.add("right", [5, 6, 7, 8], 10, true);

      this.playerVelocity = 150;

      this.cursors = this.game.input.keyboard.createCursorKeys();

      var ground;
      ground = this.platforms.create(6*32, this.game.world.height - 9*32, "tile");
      ground.body.immovable = true;

      ground = this.platforms.create(24*32, this.game.world.height - 1*32, "tile");
      ground.body.immovable = true;
      ground = this.platforms.create(23*32, this.game.world.height - 1*32, "tile");
      ground.body.immovable = true;

      this.endLevelStar = this.star.create(23.5*32, this.game.world.height - 3*32, "star");
      this.endLevelStar.body.gravity.y = 100;
      this.endLevelStar.body.bounce = 0.2;
    },
    update: function() {
      var hitPlatform = this.game.physics.arcade.collide(this.player, this.platforms);
      this.game.physics.arcade.overlap(this.player, this.star, this.changeLevel, null, this);
      this.game.physics.arcade.overlap(this.player, this.wings, this.fly, null, this);

      this.game.physics.arcade.collide(this.star, this.platforms);
      this.game.physics.arcade.collide(this.wings, this.platforms);

      this.player.body.velocity.x = 0;

      if (this.cursors.left.isDown) {
        this.player.body.velocity.x = -1 * this.playerVelocity;
        this.player.animations.play("left");
      } else if (this.cursors.right.isDown) {
        this.player.body.velocity.x = this.playerVelocity;
        this.player.animations.play("right");
      } else {
        this.player.animations.stop();
        this.player.frame = 4;
      }

      if (this.cursors.up.isDown && this.player.body.touching.down && hitPlatform) {
        this.player.body.velocity.y = -280;
      }

      if (this.player.bottom === this.game.world.height) {
        this.game.state.start("1");
      }
    },

    changeLevel: function () {
      this.game.state.start("1");
    },

    fly: function() {
      this.player.body.gravity.y = 150;
      this.wings.kill();

      setTimeout(function() {
        if (this.game.state.current === "3") {
          this.player.body.gravity.y = 300;
        }
      }.bind(this), 4000);
    }
  };



  //===========================================================
  var game = new Phaser.Game(800,600, Phaser.AUTO, "");
  game.state.add("1", LevelOne);
  game.state.add("2", LevelTwo);
  game.state.add("3", LevelThree);
  game.state.start("1");
}
