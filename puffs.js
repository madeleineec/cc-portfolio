let puffs = []; // floating puffs
let seeds = []; // seeds still attached to the dandelion

// for controlling how frequently seeds detach on drag:
let lastMouseX = 0;
let lastMouseY = 0;
let distanceAccum = 0;
let detachDistance = 40; // how many pixels to drag before detaching a seed

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  // seeds
  for (let i = 0; i < 36; i++) {
    seeds.push({
      angle: i * 10,  // spread evenly around 360 degrees
      radius: 50
    });
  }
}

function draw() {
  background(219,231,254);

  // draw the dandelion at mouse location
  drawDandelion(mouseX, mouseY);

  // update & show floating puffs
  for (let i = puffs.length - 1; i >= 0; i--) {
    puffs[i].move();
    puffs[i].show();
    if (puffs[i].alpha <= 0) {
      puffs.splice(i, 1);
    }
  }
}

// draw the main dandelion head plus attached seeds
function drawDandelion(x, y) {
  push();
  translate(x, y);

  // dandelion center
  noStroke();
  fill(150, 150, 0);
  ellipse(0, 0, 40);

  // attached seeds
  stroke(200);
  for (let s of seeds) {
    push();
    rotate(s.angle);
    line(0, 0, s.radius, 0);
    fill(255);
    noStroke();
    ellipse(s.radius, 0, 8);
    pop();
  }
  pop();
}

// track mouse press to set starting drag position
function mousePressed() {
  lastMouseX = mouseX;
  lastMouseY = mouseY;
  distanceAccum = 0;
}

// when the mouse is dragged, accumulate distance
function mouseDragged() {
  // calculate how far the mouse moved this frame
  let dx = mouseX - lastMouseX;
  let dy = mouseY - lastMouseY;
  let distMoved = sqrt(dx * dx + dy * dy);

  distanceAccum += distMoved;

  // update last known mouse position
  lastMouseX = mouseX;
  lastMouseY = mouseY;

  // if we've dragged enough distance, detach one seed
  if (distanceAccum > detachDistance) {
    detachRandomSeed();
    distanceAccum = 0;  // reset so we need to drag more distance for the next seed
  }
}

// remove one random seed from the head and turns it into a puff
function detachRandomSeed() {
  if (seeds.length > 0) {
    let idx = floor(random(seeds.length));
    let s = seeds.splice(idx, 1)[0]; // remove seed from array

    // figure out seed's world position
    let seedX = mouseX + cos(s.angle) * s.radius;
    let seedY = mouseY + sin(s.angle) * s.radius;

    puffs.push(new Puff(seedX, seedY));
  }
}

// puff class
class Puff {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = random(-1, 1);
    this.vy = random(-2, -0.5);
    this.rotation = random(360);
    this.angularVelocity = random(-2, 2);
    this.size = random(10, 20);
    this.alpha = 255;
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;
    this.rotation += this.angularVelocity;
    this.alpha -= 1;
  }

  show() {
    push();
    translate(this.x, this.y);
    rotate(this.rotation);

    noStroke();
    fill(255, this.alpha);
    ellipse(0, 0, this.size, this.size * 0.6);

    stroke(100, this.alpha);
    line(0, 0, 0, this.size);
    pop();
  }
}