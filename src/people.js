import { make2DArray} from "./helper.js";

export default class People {
  constructor(rows, cols, w) {
    this.rows = rows;
    this.cols = cols;
    this.w = w;
    this.grid = make2DArray(rows, cols);
  }

  fillWithRandomLives() {
    var i;
    for (i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        if (Math.random(1) < 0.5){
          this.grid[i][j] = 1;
        } else {
          this.grid[i][j] = 0;
        }
      }
    }
  }

  draw(ctx) {
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        let x = j * this.w;
        let y = i * this.w;
        if (this.grid[i][j] === 0) {
          ctx.fillRect(x, y, this.w, this.w);
        } else {
          ctx.strokeRect(x, y, this.w, this.w);
        }
      }
    }
  }

  countNeighbors(row, col) {
    var neighborCount = 0;
    for (var i = -1; i <= 1; i++) {
      for (var j = -1; j <= 1; j++) {
        if (i === 0 && j === 0)
          continue;
        var newRow = row + i;
        var newCol = col + j;
        //check for no out of bound exception
        if (
          newRow < 0 ||
          newRow >= this.rows ||
          newCol < 0 ||
          newCol >= this.cols
        ) {
          continue;
        }
        neighborCount += this.grid[newRow][newCol];
      }
    }
    return neighborCount;
  }

  liveToNextGeneration(ctx) {
    this.draw(ctx);

    let nextGrid = make2DArray(this.rows,this.cols);
    for (var i = 0; i < this.rows; i++) {
      for (var j = 0; j < this.cols; j++) {
        var neighbors = this.countNeighbors(i, j);
        let state = this.grid[i][j];
        if (state === 0 && neighbors === 3){
          nextGrid[i][j] = 1;
        } else if (state === 1 && (neighbors < 2 || neighbors > 3)){
          nextGrid[i][j] = 0;
        } else {
          nextGrid[i][j] = state;
        }
      }
    }
    this.grid = nextGrid;
  }
}
