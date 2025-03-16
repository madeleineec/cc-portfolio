// full octave frequencies
let freqs = [
  261.63, // c
  293.66, // d
  329.63, // e
  349.23, // f
  392.0,  // g
  440.0,  // a
  493.88, // b
  523.25  // other c
];

let oscs = [];
let circles = [];
let puffs = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  // choose a random number of circles between 12 and 18
  let numCircles = floor(random(12, 18));

  // create one oscillator per circle (cycle through frequencies since more than 8)
  for (let i = 0; i < numCircles; i++) {
    let osc = new p5.Oscillator();
    osc.setType('sine');
    osc.freq(freqs[i % freqs.length]); //go thru freq array without choosing random decimals
    osc.amp(0);
    osc.start();
    oscs.push(osc);
  }

  // Create circles with random colors and random positions
  for (let i = 0; i < numCircles; i++) {
    let x = random(100, width - 100);
    let y = random(100, height - 100);
    // Generate a random color
    let col = color(random(255), random(255), random(255));
    circles.push({
      x: x,
      y: y,
      r: 40,
      col: col,
      oscIndex: i
    });
  }
}

function draw() {
  background(255);

  // Draw each note circle
  noStroke();
  for (let c of circles) {
    fill(c.col);
    ellipse(c.x, c.y, c.r * 2, c.r * 2);
  }

  // adapted from my dandelion program last week
  for (let i = puffs.length - 1; i >= 0; i--) {
    puffs[i].move();
    puffs[i].show();
    if (puffs[i].alpha <= 0) {
      puffs.splice(i, 1);
    }
  }
}

function mousePressed() {
  for (let c of circles) {
    let d = dist(mouseX, mouseY, c.x, c.y);
    if (d < c.r) {
      // play note
      playNote(c.oscIndex);
      // puffs animation
      for (let i = 0; i < 10; i++) {
        puffs.push(new Puff(c.x, c.y, c.col));
      }
    }
  }
}

function playNote(index) {
  // fade the oscillator in then fade out after 200 ms
  oscs[index].amp(1, 0.05);
  setTimeout(() => {
    oscs[index].amp(0, 0.5);
  }, 200);
}

// puff stuff
class Puff {
  constructor(x, y, col) {
    this.x = x;
    this.y = y;
    this.c = color(col);
    // velocity in all directions (not just up)
    this.vx = random(-2, 2);
    this.vy = random(-2, 2);
    this.rotation = random(360);
    this.angularVelocity = random(-2, 2);
    this.size = random(10, 20);
    this.alpha = 255;
  }
  
  move() {
    this.x += this.vx;
    this.y += this.vy;
    this.rotation += this.angularVelocity;
    this.alpha -= 3;  // fade speed
  }
  
  show() {
    push();
    translate(this.x, this.y);
    rotate(this.rotation);
    noStroke();
    fill(red(this.c), green(this.c), blue(this.c), this.alpha);
    ellipse(0, 0, this.size, this.size * 0.6);
    pop();
  }
}