let jellyfishList = [];
let bubbleList = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  for (let i = 0; i < 6; i++) {
    // make initial jellies at random positions
    jellyfishList.push(new Jellyfish(random(width), random(height)));
  }
}

function draw() {
  background(0,50,90);
  
  //move and show jellies
  for (let jelly of jellyfishList) {
    jelly.move();
    jelly.show();
  }
  
  //move and display bubbles
  for (let i = bubbleList.length-1; i >= 0; i--) {
    bubbleList[i].move();
    bubbleList[i].show();
    //remove off-screen bubbles
    if (bubbleList[i].y<-50) {
      bubbleList.splice(i,1);
    }
  }
}

function mouseDragged() {
  //new bubbles
  bubbleList.push (new Bubble(mouseX,mouseY))
}

function mousePressed() {
  jellyfishList.push(new Jellyfish(mouseX,mouseY));
}


class Jellyfish {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(40, 80);
    this.color = color(random(100, 255), random(100, 255), random(150, 255), 180);
    // vertical drift speed
    this.speed = random(0.3, 1);
    // number and size of tentacles
    this.tentacleCount = floor(random(4, 8));
    this.tentacleLength = this.size * 1.5;
    // each jelly drifts horizontally at a different noise offset
    this.offset = random(1000);
  }

  move() {
    // use noise to drift horizontally
    this.x += map(noise(this.offset), 0, 1, -0.5, 0.5);
    // move up
    this.y -= this.speed;
    // increment offset so the horizontal movement changes each frame
    this.offset += 0.01;
  }

  show() {
    push();
    translate(this.x, this.y);

    // body
    noStroke();
    fill(this.color);
    ellipse(0, 0, this.size * 1.2, this.size);

    // tentacles
    stroke(red(this.color), green(this.color), blue(this.color), 150);
    strokeWeight(2);
    noFill();
    for (let i = 0; i < this.tentacleCount; i++) {
      // horizontal offset for each tentacle
      let xOffset = map(i, 0, this.tentacleCount - 1, -this.size / 2, this.size / 2); //tentacles spaced horizontally from -this.size/2 to +

      beginShape();
      for (let n = 0; n < 10; n++) {
        // wavy sin
        let wave = sin(frameCount * 0.05 + i + n * 0.5) * 5; //wave +- 5px (i), n to animate segments somewhat independently
        let tx = xOffset + wave; //tentaclex coordinates
        let ty = map(n, 0, 9, 0, this.tentacleLength); //as n goes from 0 to 9, ty goes from 0 (body) to tentacleLenght
        vertex(tx, ty);
      }
      endShape();
    }

    pop();
  }
}

class Bubble {
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.r = random(10,20) //radius
    this.speed = random(1,3);
    this.alpha=200; //opacity
  }
  move () {
    this.y -= this.speed; //move up!
    this.alpha -= 1; //gradual fade
  }
  show () {
    noStroke();
    fill (255,this.alpha);
    ellipse (this.x,this.y,this.r)
  }
}