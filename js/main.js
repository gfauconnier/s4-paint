var elem = document.getElementById("canvas"),
  elemLeft = elem.offsetLeft,
  elemTop = elem.offsetTop,
  ctx = elem.getContext('2d'),
  prevX = 0,
  prevY = 0,
  currX = 0,
  currY = 0,
  clicked = false;

$("#canvas").mousemove(function(event) {
  if (clicked) {
    currX = event.pageX - elemLeft;
    currY = event.pageY - elemTop;
    ctx.lineTo(currX, currY);
    ctx.lineWidth = $("select").val()[3];
    ctx.lineCap = "round";
    ctx.stroke();
  }
});


$("#canvas").mousedown(function(event) {
  clicked = true;
  prevX = event.pageX - elemLeft;
  prevY = event.pageY - elemTop;
  ctx.beginPath();
  ctx.strokeStyle = "blue";
  ctx.moveTo(prevX, prevY);
});

$("#canvas").mouseout(function(){
  clicked = false;
  ctx.closePath();
});

$("#canvas").mouseup(function() {
  clicked = false;
  ctx.closePath();
});


// .arc() .fill()
// linecap > square , round
//ctx.fillRect(currX, currY, $("select").val()[3], $("select").val()[3]);
