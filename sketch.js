let bg;
let snowflakes = [];

function preload() {
  // URL diretto della tua immagine
  bg = loadImage('https://raw.githubusercontent.com/nimeo1988/calendario-natale/main/famiglia.jpg'); 
}

function setup() {
  createCanvas(1000, 700);
  textAlign(CENTER, CENTER);
  textSize(50);
  fill(255);
}

function draw() {
  background(bg);

  // neve
  let t = frameCount / 60;
  for (let i = 0; i < random(1, 5); i++) {
    snowflakes.push(new snowflake());
  }
  for (let flake of snowflakes) {
    flake.update(t);
    flake.display();
  }

  // conto alla rovescia
  let now = new Date();
  let newYear = new Date(now.getFullYear() + 1, 0, 1);
  let diff = newYear - now;

  let days = floor(diff / (1000 * 60 * 60 * 24));
  let hours = floor((diff / (1000 * 60 * 60)) % 24);
  let minutes = floor((diff / (1000 * 60)) % 60);
  let seconds = floor((diff / 1000) % 60);

  text(`${days}d ${hours}h ${minutes}m ${seconds}s`, width / 2, height - 50);

  // semplice calendario mesi base
  drawMonths();
}

function snowflake() {
  this.posX = random(0, width);
  this.posY = random(-50, 0);
  this.size = random(2, 5);
  this.speed = random(1, 3);

  this.update = function(time) {
    this.posY += this.speed;
    if (this.posY > height) {
      this.posY = random(-50, 0);
      this.posX = random(0, width);
    }
  };

  this.display = function() {
    noStroke();
    fill(255);
    ellipse(this.posX, this.posY, this.size);
  };
}

function drawMonths() {
  textSize(20);
  fill(255);
  let months = ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"];
  for (let i = 0; i < 12; i++) {
    text(months[i], 80 + i * 80, 50);
  }
}
