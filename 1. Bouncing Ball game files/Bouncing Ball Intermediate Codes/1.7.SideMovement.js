
function setup()
{
  createCanvas(960, 540);
  fill(255);
  noStroke();
  ball = new BallObject();
}

function BallObject() {
  var r = 15;
  var x = width/2;
  var y = r;

  var xspeed = 8;
  var yspeed = 15;

  var gravity = 0.25;

  this.move = function() {

    yspeed -= gravity;

    var coef = 0.8;
    if (y+r+yspeed > height) yspeed = yspeed*-coef  ;
    if (y-r+yspeed < 0) yspeed = (yspeed+gravity) *-coef;

    coef = 0.6;
    if ( x-r+xspeed < 0 || x+r+xspeed > width) xspeed *= -coef;

    x += xspeed;
    y += yspeed;
  }

  this.show = function() {
    ellipse(x, height-y, 2*r, 2*r);
  }
}

var ball;
function draw ()
{
  background(0);
  ball.move();
  ball.show();
}
