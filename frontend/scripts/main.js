
import { createCanvas } from "./canvas/canvas.js";
import { createNewPlayer } from "./player/player.js"
import { createNewWeapon } from "./weapons/weapon.js";

const canvas = createCanvas({ 
  element: document.querySelector("canvas"),
  width: 64 * 16, //1024,
  height: 64 * 9, // 576
});

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