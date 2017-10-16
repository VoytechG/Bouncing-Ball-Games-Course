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

  this.bounceUp = function(y)
  {
    print(y);
    yspeed -= gravity;
    var d=0;
    if (keyIsDown("W".charCodeAt(0)) || mouseIsPressed)
    {
        if(d==0) yspeed=-9;
    }
    d=1;
    coef = 0.7;
    if(this.y-this.r+yspeed<y)
    {
      yspeed *= -coef;
      xspeed *= friction;
      d=0;
    }

    this.y += yspeed;
    this.x += xspeed;
  }

  this.bounceLat = function()
  {
    print("COLLISION BITCH");
    var coef = 1
    xspeed *= -coef;
    this.x += xspeed;
  }

  this.bounceDown = function(y)
  {
    yspeed -= gravity;

    coef = 0.7;
    if(this.y+this.r+yspeed>y)
    {
      yspeed *= -coef;
      xspeed *= friction;
    }

    this.y += yspeed;
    this.x += xspeed;
  }

  this.bounceCorner = function(xdif,ydif)
  {
    print("CORNER COLLISION");
    angle=get_angle(xdif,ydif);
    /*if(angle>PI/2)
      angle=PI/2;
    else if(angle<-PI/2)
      angle=-PI/2;*/
    cosa=Math.cos(angle);
    sina=Math.sin(angle);



    //get the y and x speeds in the newly defined inclined plane
    v1=xspeed*cosa-yspeed*sina; //the OX axis in the inclined plane defined by the angle
    v2=xspeed*sina+yspeed*cosa; //the OY axis in the inclined plane defined by the angle
    print(angle*57.2957795131 + "," + xspeed + "," + yspeed + "," + v1 + "," + v2);
    //get the resulting speeds in the original (normal) plane
    xspeed=v1*cosa-v2*sina;
    yspeed=v2*cosa+v1*sina;

    print(xspeed + "," + yspeed);

    coef=0.9;
    xspeed*=coef;
    yspeed*=coef;
    this.y += yspeed;
    this.x += xspeed;
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

    this.scored=false;

    var xspeed = 3;
    var yspeed = 5;
    this.move = function(){
      this.x -= xspeed;
    }

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

function show_dest()
{
  fill(255);
  textSize(15);
  text("Target area",850,500);
}

function showFinal()
{
  fill(255,255,255);
  textSize(30);
  text("GAME OVER! Press R to restart",250,250);
}

function showFinish()
{
  fill(255,255,255);
  textSize(30);
  text("Congratulations, you've won! Press R to restart",250,250);
}

function rect_coll(x, y, wid, hei)
{
    //if crossed horizontal wall
    if (ball.x+ball.xspeed() > x && ball.x+ball.xspeed() < x + wid)
        if (ball.y+ball.yspeed()+ball.r>max(y,y+hei) && ball.y+ball.yspeed()-ball.r<max(y,y+hei))
            {
              ball.bounceUp(y+hei);
              return true;
            }
        else if(ball.y+ball.yspeed()+ball.r>min(y,y+hei) && ball.y+ball.yspeed()-ball.r<min(y,y+hei))
        {
          ball.bounceDown(y);
          return true;
        }

    //if crossed vertical wall
     if (ball.y+ball.yspeed()>min(y,y+hei) && ball.y+ball.yspeed()<max(y,y+hei))
         if (ball.x+ball.xspeed()+ball.r >= x && ball.x+ball.xspeed()-ball.r <= x )
             {
               ball.bounceLat();
               return true;
             }
        else if (ball.x+ball.xspeed()+ball.r >= x + wid && ball.x+ball.xspeed()-ball.r <= x + wid )
              {
                ball.bounceLat();
                return true;
              }

    //if bumbed against a corner
    if (check_dist(ball.x-x+ball.xspeed(), ball.y-y+ball.yspeed(), ball.r))
    {
      ball.bounceCorner((ball.x-x+ball.xspeed()),ball.y-y+ball.yspeed());
      return true;
    }
    if (check_dist((ball.x-x-wid+ball.xspeed()), ball.y-y+ball.yspeed(), ball.r))
    {
      ball.bounceCorner(ball.x-x-wid+ball.xspeed(),ball.y-y+ball.yspeed());
      return true;
    }
    if (check_dist(ball.x-x+ball.xspeed(), ball.y-y-hei+ball.yspeed(), ball.r))
    {
      ball.bounceCorner((ball.x-x+ball.xspeed()),ball.y-y-hei+ball.yspeed());
      return true;
    }
    if (check_dist(ball.x-x-wid+ball.xspeed(), ball.y-y-hei+ball.yspeed(), ball.r))
    {
      ball.bounceCorner((ball.x-x-wid+ball.xspeed()),ball.y-y-hei+ball.yspeed());
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

function get_angle(x,y)
{
  return Math.atan2(y,x);
}

var ball;
var lost,won;

function Initialise()
{
  ball, blocks = [], obstacles = [], movObst = [];
  lost = false; won = false;

  ball = new Ball ();
  blocks.push(new Block(0,270,100,30));
  blocks.push(new Block(200,290,100,30));
  blocks.push(new Block(400,320,100,30));
  blocks.push(new Block(640,380,100,30));
  blocks.push(new Block(700,200,300,30));
  blocks.push(new Block(250,120,300,30));
  blocks.push(new Block(0,50,150,20));
  blocks.push(new Block(730,0,30,130));

  blocks.push(new Block(820,0,25,110));
  blocks.push(new Block(930,0,25,110));
  blocks.push(new Block(845,0,85,20));

  obstacles.push(new Block(100,270,200,20));
  obstacles.push(new Block(300,290,200,20));
  obstacles.push(new Block(400,300,100,20));
  obstacles.push(new Block(500,320,100,20));
  obstacles.push(new Block(600,340,100,20));
  obstacles.push(new Block(640,360,100,20));
  obstacles.push(new Block(550,110,30,30))
  obstacles.push(new Block(250,0,30,30));
  obstacles.push(new Block(450,0,30,30));
  obstacles.push(new Block(760,0,60,30));

  movObst.push( new Block(660,100,15,90));
  movObst.push( new Block(600,0,15,90));

}



function draw ()
{
  background(0); //blue

  if (!lost && !won)
  {
    ball.move();
  }


  ball.show();

  for(let i = 0; i<blocks.length; i++)
  {
    blocks[i].show();
    if(blocks[i].checkcollision())
    {

      if(i==blocks.length-1)
        {
          won=true;
        }
    }
  }

  for(let i = 0; i<obstacles.length; i++)
  {
    obstacles[i].show(200,0,0);
    if(obstacles[i].checkcollision())
    {
      lost = true;
      print("COLLISION");
    }
  }

  for(let i = 0; i<movObst.length; i++)
  {
    movObst[i].show(200,10,10);
    movObst[i].moveV(0,250);
    if(movObst[i].checkcollision())
    {
      lost = true;
      print("COLLISION");
    }
  }

  if(won)
  {
    showFinish();
  }

  if(lost)
  {
    showFinal();
  }

  show_dest();

  if ((lost == true || won == true) && keyIsDown("R".charCodeAt(0))) Initialise();

}
