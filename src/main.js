
import { createCanvas } from "./canvas/canvas.js";
import { createNewPlayer } from "./player/player.js"

const canvas = createCanvas({ 
  element: document.querySelector("canvas"),
  // width: 480,
  // height: 270
  width: 1042,
  height: 512
});

console.log(canvas)

const player = createNewPlayer({
  ctx: canvas.ctx,
  name: "player1",
  x: 32, // canvas.width / 2,
  y: canvas.height / 2,
});

console.log(player)

// Game Loop
let animationId;
let isPlaying = false;

function gameLoop(){
  canvas.clear();
  canvas.ctx.imageSmoothingEnabled = true;
  canvas.drawFrameRate();

  // Player
  player.update()

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