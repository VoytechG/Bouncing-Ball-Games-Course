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

      if ( this.y - this.r + yspeed < 0 ) {yspeed = 0; this.y = this.r; }
      if ( this.y + this.r + yspeed > height) {yspeed= 0; this.y = height - this.r; }

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
      fill(23, 145, 23);
      rect(this.x, height - 0, this.wid, - this.lowbloH);
      rect(this.x, height - this.lowbloH - this.holeH, this.wid,
        -(height - this.lowbloH - this.holeH) );
    }

}

function draw ()
{
  background(0);

  ball.move();
  ball.show();

  var ccmod = cmod;
  for (let i = 0; i < numoblo; i++)
  {
    var here = (i+ccmod)%numoblo;
    var last = (here + numoblo - 1) % numoblo;

    blocks[here].move();
    blocks[here].show();

    //when block is eaten by left wall
    if (blocks[here].x + blocks[here].wid < 0)
    {
      blocks[here] = new Block(blocks[last].x + blocks[last].wid + gap);
      cmod = (cmod+1) % numoblo;
    }
  }
}
