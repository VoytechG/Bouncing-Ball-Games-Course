function setup()
{
  createCanvas(960, 540);
  fill(255);
  noStroke();
  Initialise();
}

function Ball () {
  this.r = 15;
  this.x = width/10;
  this.y = height-30;

  var yspeed = 6;
  var xspeed = 0;
  var gravity = 0.2;
  var friction = 0.85;
  this.dw = 0;

  this.yspeed = function()
  {
    return yspeed;
  }

  this.xspeed = function()
  {
    return xspeed;
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

  this.show = function() {
      fill(255);  //orange
      ellipse(this.x, height-this.y, 2*this.r, 2*this.r);
  }
}

function Block(x, y , wid , hei){

    this.x = x;
    this.y = y;
    this.wid = wid;
    this.hei = hei;

    var yspeed = 5;

    this.moveV = function(y, yF) // the area of movement
    {
      if(this.y + yspeed < y || this.y + yspeed > yF)
      {
        yspeed *= -1;
      }
      this.y += yspeed;
    }

    this.show = function(a,b,c)
    {
        if(typeof a !== "undefined")
        fill(a,b,c);
        else
          fill(23, 145, 23);  //light green
        rect(this.x, height - this.y, this.wid, -this.hei);
    }

    this.checkcollision = function(){
      return rect_coll(this.x, this.y, this.wid, this.hei);
    }
}

function rect_coll(x, y, wid, hei)
{
    //if crossed horizontal wall
    if (ball.x+ball.xspeed() > x && ball.x+ball.xspeed() < x + wid)
        if (ball.y+ball.yspeed()+ball.r>max(y,y+hei) && ball.y+ball.yspeed()-ball.r<max(y,y+hei))
            {
              return true;
            }
        else if(ball.y+ball.yspeed()+ball.r>min(y,y+hei) && ball.y+ball.yspeed()-ball.r<min(y,y+hei))
        {
          return true;
        }

    //if crossed vertical wall
     if (ball.y+ball.yspeed()>min(y,y+hei) && ball.y+ball.yspeed()<max(y,y+hei))
         if (ball.x+ball.xspeed()+ball.r >= x && ball.x+ball.xspeed()-ball.r <= x )
             {
               return true;
             }
        else if (ball.x+ball.xspeed()+ball.r >= x + wid && ball.x+ball.xspeed()-ball.r <= x + wid )
              {
                return true;
              }

    //if bumbed against a corner
    if (check_dist(ball.x-x+ball.xspeed(), ball.y-y+ball.yspeed(), ball.r))
    {
      return true;
    }
    if (check_dist((ball.x-x-wid+ball.xspeed()), ball.y-y+ball.yspeed(), ball.r))
    {
      return true;
    }
    if (check_dist(ball.x-x+ball.xspeed(), ball.y-y-hei+ball.yspeed(), ball.r))
    {
      return true;
    }
    if (check_dist(ball.x-x-wid+ball.xspeed(), ball.y-y-hei+ball.yspeed(), ball.r))
    {
      return true;
    }

    //wheeee!
    return false;
}

function check_dist(a,b,c)
{
  if (a*a + b*b <= c*c) return true;
  return false;
}

function showFinal()
{
  fill(255,255,255);
  textSize(30);
  text("GAME OVER! Press R to restart",250,250);
}

var ball;
var lost,won;

function Initialise()
{
  ball = new Ball ();
  obstacles = [];
  lost=false;

  obstacles.push(new Block(300,100,100,50));
  obstacles.push(new Block(600,150,100,50));
}

function draw ()
{
  background(0); //blue

if(!lost)
    ball.move();
else
  showFinal();

    for(let i = 0; i<obstacles.length; i++)
    {
      obstacles[i].show(200,0,0); //red
      if(obstacles[i].checkcollision())
      {
        lost = true;
      }
    }

  ball.show();

  if (lost == true && keyIsDown("R".charCodeAt(0))) Initialise();

}
