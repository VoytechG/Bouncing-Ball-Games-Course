function Ball () {
  this.r = 15;
  this.x = width/10;
  this.y = height-30;

  var yspeed = 6;
  var xspeed = 0;
  var gravity = 0.2;
  var friction = 0.85;
  this.dw = 0;

  this.show = function() {
      fill(255);  //orange
      ellipse(this.x, height-this.y, 2*this.r, 2*this.r);
  }

  this.move = function() {

      yspeed -= gravity;

      if (keyIsDown("W".charCodeAt(0)) || mouseIsPressed)
      {
          if (this.dw == 0) yspeed = 8;
      }
      this.dw=1;

      if (keyIsDown("D".charCodeAt(0)))
      {
          xspeed+=1;
          if(xspeed>3)
            xspeed=3;
      }

      if (keyIsDown("A".charCodeAt(0)))
      {
        xspeed-=1;
        if(xspeed<-3)
          xspeed=-3;
      }

      var coef = 0.6;
      if ( this.x-this.r+xspeed < 0 || this.x+this.r+xspeed > width) xspeed *= -coef;

      coef = 0.7;

      if ( this.y-this.r+yspeed < 0 )
        this.dw=0;

      if (this.dw==0)
      {
        yspeed *= -coef;
        xspeed *= friction;
      }

      if ( this.y+this.r+yspeed > height) {yspeed= 0; this.y= height - this.r; }

      this.y += yspeed;
      this.x += xspeed;
  }
}

var ball;

function setup()
{
  createCanvas(960, 540);
  fill(255);
  noStroke();
  Initialise();
}

function Initialise()
{
  ball = new Ball ();
}

function draw ()
{
  background(0); //blue

    ball.move();

  ball.show();
}
