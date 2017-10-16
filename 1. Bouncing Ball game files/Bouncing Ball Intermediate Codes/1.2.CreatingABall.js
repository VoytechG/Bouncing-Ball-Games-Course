function setup()
{
  createCanvas(960, 540);
  fill(255);
  ball = new BallObject();
}

function BallObject() {
  var r = 15;
  var x = width/2;
  var y = r;

  this.show = function() {
    ellipse(x, height-y, 2*r, 2*r);
  }
}

var ball;
function draw ()
{
  background(0);
  ball.show();
}
