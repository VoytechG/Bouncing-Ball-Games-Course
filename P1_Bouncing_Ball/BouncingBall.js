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

  var dp=0, ap=0;

  this.move = function() {

      yspeed -= gravity;

      if (keyIsDown("W".charCodeAt(0)) || mouseIsPressed) yspeed=6;

      if (keyIsDown("D".charCodeAt(0)))
      {
          if (dp==0) {xspeed+=3; dp=1;}
      }
      else dp=0;

      if (keyIsDown("A".charCodeAt(0)))
      {
          if (ap==0) {xspeed-=3; ap=1;}
      }
      else ap=0;

      var coef = 0.8;
      if ( x-r+xspeed < 0 || x+r+xspeed > width) xspeed *= -coef;

      coef = 0.8;
      if ( y-r+yspeed < 0 ) yspeed = (yspeed+gravity) *-coef;

      if ( y+r+yspeed > height) {yspeed = 0; y= height - r;}

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
  if (frameCount%1==0)
  {
    background(0);
    ball.move();
    ball.show();
  }
}
