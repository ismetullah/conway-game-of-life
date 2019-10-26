export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
 
export function make2DArray(rows, cols){
  var res = new Array(rows);
  for (var i = 0; i < rows; i++){
    res[i] = new Array(cols);
  }
  return res;
}