import People from "./people.js";

let canvas = document.getElementById("screen");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext("2d");

const GAME_WIDTH = canvas.width;
const GAME_HEIGHT = canvas.height;
var w = 15;
var rows = Math.floor(GAME_HEIGHT / w);
var cols = Math.floor(GAME_WIDTH / w);

var people = new People(rows, cols, w);
people.fillWithRandomLives(20);
console.log(people.grid);

let lastTime = 0;
function gameLoop(timeStamp) {
   // each iteration after 100 ms
   if(!lastTime || timeStamp - lastTime >= 100) {
    lastTime = timeStamp;
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    people.liveToNextGeneration(ctx);
  }
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
