let stars = [];
let largeStars = [];
let overlay;

let earthCounter = 0.8;
let moonCounter  = 16;
let mercuryCounter = 3.2;
let venusCounter = 1.3;
let marsCounter = 0.44;
let jupiterCounter = 0.08;
let saturnCounter = 0.06;
let uranusCounter = 0.02;
let neptuneCounter = 0.008;

let overlayVisible = true;

let alienX, alienY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);

  // generate random small stars
  for (let i = 0; i < windowWidth / 2; i++) {
    let randx = random(width);
    let randy = random(height);
    stars.push({ x: randx, y: randy });
  }

  // generate random large stars
  for (let i = 0; i < windowWidth / 4; i++) {
    let randx = random(width);
    let randy = random(height);
    largeStars.push({ x: randx, y: randy });
  }

  // separate graphics layer for the pink overlay
  overlay = createGraphics(width, height);

  spawnAlien();
}

function draw() {
  // draw star background
  background(0);
  fill(220);
  noStroke();

  // small stars
  for (let i = 0; i < stars.length; i++) {
    ellipse(stars[i].x, stars[i].y, 2);
  }

  // large stars
  fill(255);
  noStroke();
  for (let i = 0; i < largeStars.length; i++) {
    ellipse(largeStars[i].x, largeStars[i].y, 4);
  }

  // solar system in the bottom-right corner
  push();
    translate(width - 260, height - 260);

    // sun
    fill(255, 200, 0);
    ellipse(0, 0, 40);

    // earth and moon
    push();
      rotate(earthCounter);
      translate(80, 0);
      fill(60, 153, 235);
      ellipse(0, 0, 8);
      earthCounter += 0.8;

      rotate(moonCounter);
      translate(6, 0);
      fill(220);
      ellipse(0, 0, 4);
      moonCounter += 16;
    pop();

    // mercury
    push();
      rotate(mercuryCounter);
      translate(35, 0);
      fill(164, 125, 91);
      ellipse(0, 0, 9);
      mercuryCounter += 3.2;
    pop();

    // venus
    push();
      rotate(venusCounter);
      translate(60, 0);
      fill(200, 164, 197);
      ellipse(0, 0, 10);
      venusCounter += 1.3;
    pop();

    // mars
    push();
      rotate(marsCounter);
      translate(100, 0);
      fill(255, 0, 0);
      ellipse(0, 0, 7);
      marsCounter += 0.44;
    pop();

    // jupiter
    push();
      rotate(jupiterCounter);
      translate(130, 0);
      fill(229, 192, 168);
      ellipse(0, 0, 28);
      jupiterCounter += 0.08;
    pop();

    // saturn
    push();
      rotate(saturnCounter);
      translate(180, 0);
      fill(255, 148, 54);
      ellipse(0, 0, 20);
      ellipse(0, 0, 30, 10);
      saturnCounter += 0.06;
    pop();

    // uranus
    push();
      rotate(uranusCounter);
      translate(210, 0);
      fill(180, 220, 220);
      ellipse(0, 0, 10);
      uranusCounter += 0.02;
    pop();

    // neptune
    push();
      rotate(neptuneCounter);
      translate(230, 0);
      fill(50, 80, 220);
      ellipse(0, 0, 10);
      neptuneCounter += 0.008;
    pop();
  pop();

  // TEXT
  fill(255);
  textSize(72);
  textFont("Londrina Shadow");
  text("welcome to", width * 0.1, height / 3);
  text("madeleine's", width * 0.25, height / 2.3);
  text("web portfolio", width * 0.4, height / 1.9);

  // alein lol
  drawAlien();
  checkAlienHover(); 

  // OVERLAY
  if (overlayVisible) {
    overlay.clear(); 
    overlay.background(255, 192, 203); // pink

    // "erase" a circle on the overlay where the mouse is
    overlay.erase();
    overlay.ellipse(mouseX, mouseY, 400);
    overlay.noErase();

    // draw the overlay on top of the main canvas
    image(overlay, 0, 0);
  }
}

function doubleClicked() {
  overlayVisible = !overlayVisible;
}


function spawnAlien() {
  alienX = random(width);
  alienY = random(height);
}

function drawAlien() {
  push();
  translate(alienX, alienY);

  // head
  fill(0, 255, 0);
  noStroke();
  ellipse(0, 0, 15, 12);

  // antennas
  stroke(0, 255, 0);
  strokeWeight(3);

  // left antenna
  line(-3, -4, -5, -8); 
  fill(0, 255, 0);
  noStroke();
  ellipse(-6, -10, 6);

  // right antenna
  stroke(0, 255, 0);
  strokeWeight(3);
  line(3, -4, 5, -8);
  fill(0, 255, 0);
  noStroke();
  ellipse(6, -10, 6);

  pop();
}

// if mouse is close to the alien, relocate it to a random location
function checkAlienHover() {
  let d = dist(mouseX, mouseY, alienX, alienY);
  if (d < 15) {
    spawnAlien();
  }
}
