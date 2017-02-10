float r=15;
float y=r,x;
float yspeed=8;
float yacc=0;
float g=10;

void setup()
{
  size(800, 360); 
  fill(255);  
  frameRate(100);
  background (0);
  noStroke();
  
  x=width/2;
  yacc = -g;
}

void draw()
{   
  if (y>=r+0.5) yspeed += yacc/100;

  if (y + yspeed < r) yspeed*=-1;
  y += yspeed;
     
  background(0);
  ellipse(x,height-y,2*r,2*r);
}