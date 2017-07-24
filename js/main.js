var elem = document.getElementById("canvas"),
  elemLeft = elem.offsetLeft,
  elemTop = elem.offsetTop,
  ctx = elem.getContext('2d'),
  prevX = 0,
  prevY = 0,
  currX = 0,
  currY = 0,
  clicked = false,
  brushSize = 1,
  drawStyle = 0;

elem.height = $("#canvas").height();
elem.width = $("#canvas").width();


$("#canvas").mousedown(function(event) {
  clicked = true;
  prevX = event.pageX - elemLeft;
  prevY = event.pageY - elemTop;
  ctx.strokeStyle = $("#colorpicker").val();
  ctx.lineWidth = brushSize;
  if (drawStyle == 0) {
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
  } else if (drawStyle == 1) {
    ctx.strokeRect(prevX, prevY, $(".drawtype>input").eq(0).val(), $(".drawtype>input").eq(1).val());
  } else {
    ctx.beginPath();
    ctx.arc(prevX, prevY, $(".drawtype>input").eq(2).val(), 0, 2 * Math.PI);
    ctx.stroke();
  }
});


$("#canvas").mousemove(function(event) {
  if (clicked) {
    currX = event.pageX - elemLeft;
    currY = event.pageY - elemTop;
    if (drawStyle == 0) {
      ctx.lineTo(currX, currY);
      ctx.lineCap = "round";
      ctx.stroke();
    }
  }
});


$("#canvas").mouseout(function() {
  clicked = false;
  if (drawStyle == 0) {
    ctx.closePath();
  }
});


$("#canvas").mouseup(function() {
  clicked = false;
  if (drawStyle == 0) {
    ctx.closePath();
  }
});

$(".drawtype>button").click(function() {
  drawStyle = $(".drawtype>button").index(this);
  $(".drawtype>button").removeClass("btn-success");
  $(".drawtype>button").addClass("btn-secondary");
  $(".drawtype>button").eq(drawStyle).addClass("btn-success");
});


$("#brushsize").click(function() {
  brushSize = $("#brushsize").val();
  $(".labelsize").text("Brush size : " + brushSize + "px");
});


$("#clearbtn").click(function() {
  ctx.clearRect(0, 0, elem.width, elem.height);
});
