var elem = document.getElementById("canvas"),
  elemLeft = elem.offsetLeft,
  elemTop = elem.offsetTop,
  ctx = elem.getContext('2d'),
  prevX = 0,
  prevY = 0,
  currX = 0,
  currY = 0,
  clicked = false,
  brushSize = 1;
  //brushColor = "#000000";


$("#canvas").mousemove(function(event) {
  if (clicked) {
    currX = event.pageX - elemLeft;
    currY = event.pageY - elemTop;
    ctx.lineTo(currX, currY);
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.stroke();
  }
});


$("#canvas").mousedown(function(event) {
  clicked = true;
  prevX = event.pageX - elemLeft;
  prevY = event.pageY - elemTop;
  ctx.beginPath();
  ctx.strokeStyle = $("#colorpicker").val();
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


$("#brushsize").click(function(){
  brushSize = $("#brushsize").val();
  $(".labelsize").text("Brush size : " + brushSize + "px");
});
