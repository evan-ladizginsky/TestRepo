//Evan Ladizginsky

//CONTROLS:
//Click the preview screen to enusre keystrokes are detected
// w - increase speed
// s - decrease speed
// d - rotate right
// a - rotate left
// j/l - shift color one hue
// i/k - shift color two hue
// r - reset all parameters
// For this project I wanted to use colored filters to create a fantastical feeling over an otherwise ordinary image. I wasn't sure how I was going to do this but ultimately I settled on using moving quads that would instersect with each other and create interesting emergent patterns. Each row of quads has its own position, so that when it moves offscreen on one side it is returned to it starting place, creating an infinitely looping movement. To make the patterns more interesting the user can press keys to modify certain parameters which are then passed to the function responsible for drawing the quads



let starterColorOne
let starterColorTwo
let offsetContainerX = []
let offsetContainerY= []
let quadcount = 7
let layercount = 12
let speed
let direction
let positionX = []
let rotation
let direction2
let positionX2 = []
let rotation2
let opacity = 0.2


//ofcONE = new offsetContainer(8)
function preload()
{
  backdrop = loadImage("Winter.jpg")
  gate = loadImage("toriipng.png")
  soundFormats("mp3")
  music = loadSound ("01. Sealed Gods.mp3")
 

}
function setup() 
{

  createCanvas(1000,500);
  colorMode(HSB)
  angleMode(DEGREES)
  starterColorOne = color(45,65,90,opacity)
  starterColorTwo = color(170,68,89,opacity)
  speed = 1
  direction = 1
  rotation = 0
  direction2 = -1
  rotation2 = 0
  for (let j = 0; j < quadcount; j++)
  {
    offsetContainerX[j] = random(100,250)
    offsetContainerY[j] = random(110,120)
  }
  let tempoffset = 0
  let tempoffset2 = 0
    for (let m = 0; m <= layercount; m++)
    {
      positionX[m] = 1000 + tempoffset
      positionX2[m] = 0 - tempoffset2
      tempoffset += 100
      tempoffset2 += 100    
    }
  music.play()
}

function draw() 
{
  noStroke()
  background(0);
  image(backdrop,0,0,1000,500)
  image(gate,600,200,300,220)
  fill(257,63,83,0.3)  
  rect(0,0,width,height)
  
    for (let k = 0; k <= layercount; k++)
    {
      if(positionX[k] < -150)
    {
      positionX[k] = 1200;
    }
      if(positionX2[k] > 1150)
    {
      positionX2[k] = -200;
    }
      
    layerQuads(positionX[k],height,rotation,0,80,direction)

    layerQuads(positionX2[k],height,rotation,0,80,direction2)
      
    }
  
    for(let l = 0; l <= layercount; l++)
    {
      positionX[l] -= (speed*direction)
      positionX2[l] -= (speed*direction2)
    }

  if (keyIsPressed == true)
  {
    if(key == "d"){  rotation +=1}
    else if(key == "a"){rotation -= 1}
    else if(key == "r")
    {rotation = 0
    speed  = 1
    starterColorOne = color(45,65,90,opacity)
    starterColorTwo = color(170,68,89,opacity) 
    }
    else if (key == "w"){speed += 0.01}
    else if (key == "s")
    {
     if (speed > 0){speed -= 0.01} 
    }
    else if(key == "l")
    {
      let changecolor = hue(starterColorOne)
      changecolor ++
      starterColorOne = color(changecolor,65,90,opacity)

    }
        else if(key == "j")
    {
      let changecolor = hue(starterColorOne)
      changecolor -= 1
      starterColorOne = color(changecolor,65,90,opacity)
    }
        else if(key == "i")
    {
      let changecolor2 = hue(starterColorTwo)
      changecolor2 ++
      starterColorTwo = color(changecolor2,65,90,opacity)
    }
        else if(key == "k")
    {
      let changecolor2 = hue(starterColorTwo)
      changecolor2 -= 1
      starterColorTwo = color(changecolor2,68,89,opacity)
    }
  }

}


function drawQuads(xStart, yStart, quadColor,offsetX,offsetY)
{
  fill(quadColor)
  quad(xStart,yStart,xStart,yStart+offsetY,xStart-offsetX,yStart+offsetX,xStart-offsetX,yStart-offsetY)
}
function layerQuads(x,y,rotation,modifierX,modifierY,direction)
{
  push()
  translate(x,y)
  rotate(rotation)
  let interoffsetX = 0
  let interoffsetY = 0
  for (let i = 0; i < quadcount; i++)
  {
    if (i%2 == 0)
    {
      drawQuads(0,0,starterColorTwo,offsetContainerX[i] * direction,offsetContainerY[i] * direction)
    }
    else{drawQuads(0,0,starterColorOne,offsetContainerX[i],offsetContainerY[i])}
    interoffsetX -= modifierX
    interoffsetY -= modifierY
    translate(interoffsetX,interoffsetY,)
  }
  pop()
  
}

