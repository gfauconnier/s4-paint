//  GLOBAL VARIABLES DECLARATION
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
//  GLOBAL VARIABLES DECLARATION

// This is to prevent weird display of drawing (zoomed + not on spot chosen)
elem.height = $("#canvas").height();
elem.width = $("#canvas").width();
//


/**
 * description - checks what drawstyle is selected (line/rect/circle) and applies the line size and color
 *                also gets the actual coordinates of mousedown event
 *
 * @param  {event} event sent to get the coordinates of the mouse when clicked
 * @return {type}                nothing to return
 */
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
    // draws a rectangle with top starting point, left starting point, width and height
    ctx.strokeRect(prevX, prevY, $(".drawtype>input").eq(0).val(), $(".drawtype>input").eq(1).val());
  } else {
    //draws a circle with middle coordinates (prevX and prevY), a radius, a starting angle, full circle draw
    ctx.beginPath();
    ctx.arc(prevX, prevY, $(".drawtype>input").eq(2).val(), 0, 2 * Math.PI);
    ctx.stroke();
  }
});


/**
 * description - this function is here only for the line drawing, if so checks if the mouse is still down
 *                and therefor draws a line from previous coords to new ones
 *
 * @param  {type} event sent to get the coordinates of the mouse when moved
 * @return {type}                nothing to return
 */
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


/**
 * description - used to check if the mouse goes out of canvas when on mousedown
 *
 * @param  {type}         - no param sent
 * @return {type}           nothing to return
 */
$("#canvas").mouseout(function() {
  clicked = false;
  if (drawStyle == 0) {
    ctx.closePath();
  }
});


/**
 * description - used to check if there's a mouseup when on mousedown
 *
 * @param  {type}         - no param sent
 * @return {type}           nothing to return
 */
$("#canvas").mouseup(function() {
  clicked = false;
  if (drawStyle == 0) {
    ctx.closePath();
  }
});


/**
 * description - change the class of selected draw style and get its index to stock it in drawStyle var
 *
 * @param  {type}         - no param sent
 * @return {type}           nothing to return
 */
$(".drawtype>button").click(function() {
  drawStyle = $(".drawtype>button").index(this);
  $(".drawtype>button").removeClass("btn-success");
  $(".drawtype>button").addClass("btn-secondary");
  $(".drawtype>button").eq(drawStyle).addClass("btn-success");
});


/**
 * description - displays the size of the brush selected with the input range
 *
 * @param  {type}         - no param sent
 * @return {type}           nothing to return
 */
$("#brushsize").click(function() {
  brushSize = $("#brushsize").val();
  $(".labelsize").text("Brush size : " + brushSize + "px");
});


/**
 * description - clears the canvas
 *
 * @param  {type}         - no param sent
 * @return {type}           nothing to return
 */
$("#clearbtn").click(function() {
  ctx.clearRect(0, 0, elem.width, elem.height);
});
