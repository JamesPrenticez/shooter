
import { createCanvas } from "./canvas/canvas.js";
import { createNewPlayer } from "./player/player.js"
import { createNewWeapon } from "./weapons/weapon.js";
import { createNewMap } from "./maps/map.js";
import { parsedCollisionsLevelOne } from "./maps/collisions.js";

const tileSize = {
  w: 64,
  h: 64,
}

const canvas = createCanvas({ 
  element: document.querySelector("canvas"),
  width: tileSize.w * 16, //1024,
  height: tileSize.h * 9, // 576
});

const map = createNewMap({
  ctx: canvas.ctx,
  name: "level1",
  tileSize: tileSize,
  x: canvas.width / 2,
  y: canvas.height / 2,
  collisionValues: parsedCollisionsLevelOne
})

const player = createNewPlayer({
  ctx: canvas.ctx,
  name: "player1",
  x: canvas.width / 2,
  y: canvas.height / 2,
});

const weapon = createNewWeapon({
  name: 'bow',
  damage: 5,
  frameScale: 0.15, // 12%
  frameXOffset: -16,
  frameYOffset: -16,
  src: "./assets/sprites/weapons/bow.png"
});

player.pickUpWeapon(weapon);

// Game Loop
let animationId;
let isPlaying = false;

function gameLoop(){
  canvas.clear();
  canvas.ctx.imageSmoothingEnabled = true;
  canvas.drawFrameRate();

  // Map
  map.update();

  // Player
  player.update();

  //Request next animation frame
  animationId = requestAnimationFrame(gameLoop)
}

function startGame() {
  if (!isPlaying) {
    isPlaying = true;
    gameLoop();
  }
}

function pauseGame() {
  if (isPlaying) {
    isPlaying = false;
    cancelAnimationFrame(animationId);
  }
}

// Event listeners for play and pause buttons
document.getElementById('play').addEventListener('click', startGame);
document.getElementById('pause').addEventListener('click', pauseGame);

// for dev
startGame();