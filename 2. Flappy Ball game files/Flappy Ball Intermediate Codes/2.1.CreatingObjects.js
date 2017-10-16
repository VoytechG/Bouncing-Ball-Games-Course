function setup()
{
  createCanvas(960, 540);
  noStroke();
  Initialise();
}

var ball, blocks = [];
var numoblo, cmod, gap;

function Initialise()
{
  ball, blocks = [];
  numoblo = 4, cmod = 0, gap = 250;

  ball = new Ball ();
  blocks.push(new Block(width))
  for (let i = 1; i < numoblo; i++)
    blocks.push(new Block(blocks[i-1].x + blocks[i-1].wid + gap));
}

function Ball () {
  this.r = 15;
  this.x = width/10;
  this.y = height/4;

  var yspeed = 6;
  var gravity = 0.2;
  var dw = 0;

  this.move = function() {

      yspeed -= gravity;

      if (keyIsDown("W".charCodeAt(0)) || mouseIsPressed)
      {
          if (dw==0) {yspeed = 5; dw = 1;}
      }
      else dw = 0;

      if ( this.y - this.r + yspeed < 0 ){
          yspeed = 0; this.y = this.r;
      }

      if ( this.y + this.r + yspeed > height){
          yspeed= 0; this.y = height - this.r;
      }

      this.y += yspeed;
  }

  this.show = function() {
      fill(255);
      ellipse(this.x, height-this.y, 2*this.r, 2*this.r);
  }
}

function Block(x){

    this.x = x;
    this.wid = random(50,125);
    this.lowbloH = random(height/10,height*3/5);
    this.holeH = random(10*ball.r, 15*ball.r);

    var xspeed = 5;
    this.move = function(){
      this.x -= xspeed;
    }

    this.show = function(){
      fill(23, 145, 23); //green
      rect(this.x, height - 0, this.wid, - this.lowbloH);
      rect(this.x, height - this.lowbloH - this.holeH, this.wid,
        -(height - this.lowbloH - this.holeH) );
    }
}

function draw ()
{
  //reset every 10 seconds
  if (frameCount%600==0) Initialise();
  
  background(0);

  ball.move();
  ball.show();

  for (let i = 0; i < numoblo; i++)
  {
    blocks[i].move();
    blocks[i].show();
  }
}
