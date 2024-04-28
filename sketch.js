let MAX_DIST = 300;
let MAX_LEN = 1000;
let N = 2000;

let angles = new Array(N);
let cn = new Array(N);
let X, Y;

let angle = 0;
let speed = 0.005 * 3;
let fasori;

function setup() {
  noSmooth();
  createCanvas(600, 400);
  frameRate(60);
  colorMode(HSB, 360);

  fasori = new Array(N);
  loadStrings("output.txt", parseFile);
}

function parseFile(lines) {
  for (let i = 0; i < N; i++) {
    let parts = split(lines[i], ";");
    fasori[i] = new Fasore(float(parts[0]), float(parts[1]), float(parts[2]));
  }
  fasori.sort((a, b) => b.modulo - a.modulo);

  // Cutting out the 2nd half
  //fasori = fasori.slice(0, 2000);
  //N = fasori.length;
}

function draw() {
  let sumX = 0;
  let sumY = 0;
  colorMode(RGB, 256);
  background(18, 18, 18);
  stroke(255, 255, 255);
  strokeWeight(1);
  if (!fasori || !fasori[0]) {
    // fasori = new Array(N);
    return;
  }
  for (let i = 0; i < N; i++) {
    if (fasori[i].speed === 0) continue;
    let len = 750 * fasori[i].modulo;
    let fromX = width / 2 + sumX;
    let fromY = height / 2 + sumY;
    let xDist = len * cos(fasori[i].argomento);
    let yDist = len * sin(fasori[i].argomento);
    let toX = fromX + xDist;
    let toY = fromY + yDist;
    arrow(fromX, fromY, toX, toY, fasori[i].argomento, len);
    sumX += xDist;
    sumY += yDist;
    fasori[i].argomento += fasori[i].speed * speed;
  }

  if (!X) {
    console.log("Creating X and Y");
    X = [];
    Y = [];
  }
  if (X.length < MAX_LEN) {
    X.push(width / 2 + sumX);
    Y.push(height / 2 + sumY);
  }
  colorMode(HSB, 360, 360, 360);
  for (let i = 0; i < X.length - 1; i++) {
    /*let angle = atan2(Y[i] - height / 2, X[i] - width / 2);
    if (angle < 0) {
      angle += 2 * PI;
    }
    stroke(((angle * 180) / PI) % 360, 360, 360);*/
    // Stroke based on x
    stroke(((X[i] / width) * 360) % 360, 360, 360);
    strokeWeight(1.5);
    if (
      (X[i] - X[i + 1]) * (X[i] - X[i + 1]) +
        (Y[i] - Y[i + 1]) * (Y[i] - Y[i + 1]) <
      MAX_DIST
    ) {
      line(X[i], Y[i], X[i + 1], Y[i + 1]);
    }
  }
}

function arrow(x1, y1, x2, y2, angle, size) {
  stroke(255, 255, 255, 30);
  fill(255, 255, 255, 30);
  line(x1, y1, x2, y2);
  let delta = ((180 - 25) * PI) / 180;
  let l = size / 15;
  // stroke(((angle * 180) / PI) % 360, 360, 360, 10);
  triangle(
    x2 + l * cos(angle + delta),
    y2 + l * sin(angle + delta),
    x2 + l * cos(angle - delta),
    y2 + l * sin(angle - delta),
    x2,
    y2
  );
}

class Fasore {
  constructor(speed, modulo, argomento) {
    this.speed = speed;
    this.modulo = modulo;
    this.argomento = argomento;
  }
}
