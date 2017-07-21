var elem = document.getElementById("canvas"),
  elemLeft = elem.offsetLeft,
  elemTop = elem.offsetTop,
  ctx = elem.getContext('2d'),
  currX = 0,
  currY = 0,
  clicked = false;

$("#canvas").mousemove(function(event) {
  if (clicked) {
    currX = event.pageX - elemLeft;
    currY = event.pageY - elemTop;
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.fillRect(currX, currY, 5, 5);
    ctx.stroke();
    ctx.closePath();
  }
});


$("#canvas").mousedown(function() {
  clicked = true;
});

$("#canvas").mouseup(function() {
  clicked = false;
});
