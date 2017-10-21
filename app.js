window.onload = function () {
  var game = new Phaser.Game(800,600, Phaser.AUTO, "", { preload: preload, create:create, update: update});
  var platforms;
  var player;
  var star;
  var cursors;

  function preload(){
    game.load.spritesheet("dude", "assets/dude.png", 32, 48);
    game.load.image("sky", "assets/sky.png");
    game.load.image("tile", "assets/tile_1.png");
    game.load.image("star", "assets/star.png");
  }

  function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0, 0, "sky");

    platforms = game.add.group();
    platforms.enableBody = true;

    star = game.add.group();
    star.enableBody = true;

    cursors = game.input.keyboard.createCursorKeys();

    player = game.add.sprite(32, game.world.height - 150, "dude");
    game.physics.arcade.enable(player);

    createLevelOne();
  }

  function update() {
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    game.physics.arcade.overlap(player, star, changeLevel, null, this);

    player.body.velocity.x = 0;

    if (cursors.left.isDown) {
      player.body.velocity.x = -150;
      player.animations.play("left");
    } else if (cursors.right.isDown) {
      player.body.velocity.x = 150;
      player.animations.play("right");
    } else {
      player.animations.stop();
      player.frame = 4;
    }

    if (cursors.up.isDown && player.body.touching.down && hitPlatform) {
      player.body.velocity.y = -280;
    }
  }


  function createLevelOne() {
    // Create the platforms
    for (var i = 0; i < 25; i++) {
      var ground = platforms.create(i*32, game.world.height - 32, "tile");
      ground.body.immovable = true;
    }

    var ground1 = platforms.create(21*32, game.world.height - 5*32, "tile");
    ground1.body.immovable = true;

    var ground2 = platforms.create(14*32, game.world.height - 8*32, "tile");

    var ground3 = platforms.create(8*32, game.world.height - 11*32, "tile");
    ground3.body.immovable = true;

    var ground4 = platforms.create(7*32, game.world.height - 11*32, "tile");
    ground4.body.immovable = true;

    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;
    player.animations.add("left", [0, 1, 2, 3], 10, true);
    player.animations.add("right", [5, 6, 7, 8], 10, true);
  }
}
