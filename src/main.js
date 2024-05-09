
import { createCanvas } from "./canvas/canvas.js";
import { createNewPlayer } from "./player/player.js"

const canvas = createCanvas({ 
  element: document.querySelector("canvas"),
  width: 480,
  height: 270
});

const player = createNewPlayer({
  context: canvas.ctx,
  name: "player1"
});

// Game Loop
let animationId;
let isPlaying = false;

function gameLoop(){
  canvas.clear();
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