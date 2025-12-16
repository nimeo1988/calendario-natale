let bg;
let snowflakes = [];

function preload() {
  // URL diretto della tua immagine
  bg = loadImage('https://raw.githubusercontent.com/nimeo1988/calendario-natale/main/famiglia.jpg'); 
}

function setup() {
  createCanvas(1000, 700);
  textAlign(CENTER, CENTER);
  textFont('Georgia');
}

function draw() {
  // sfondo con foto + leggero overlay per far risaltare testo
  image(bg, 0, 0, width, height);
  fill(0, 50); // overlay semi-trasparente
  rect(0, 0, width, height);

  // neve colorata
  let t = frameCount / 60;
  for (let i = 0; i < random(1, 4); i++) {
    snowflakes.push(new snowflake());
  }
  for (let flake of snowflakes) {
    flake.update(t);
    flake.display();
  }

  // Countdown fisso sul nuovo anno
  let days = 0;
  let hours = 0;
  let minutes = 0;
  let seconds = 0;

  fill(255, 0, 0); // rosso natalizio
  textSize(60);
  text("Buon Anno!", width / 2, height / 2 - 80);

  fill(255, 215, 0); // oro
  textSize(50);
  text(`${days}d ${hours}h ${minutes}m ${seconds}s`, width / 2, height / 2);

  // semplice calendario mesi base colorato
  drawMonths();
}

function snowflake() {
  this.posX = random(0, width);
  this.posY = random(-50, 0);
  this.size = random(3, 7);
  this.speed = random(1, 3);
  this.color = random([color(255,0,0,200), color(0,255,0,200), color(255,255,255,200)]); // rosso, verde, bianco

  this.update = function(time) {
    this.posY += this.speed;
    this.posX += sin(time + this.posY * 0.01) * 1.5; // oscillazione per effetto più naturale
    if (this.posY > height) {
      this.posY = random(-50, 0);
      this.posX = random(0, width);
    }
  };

  this.display = function() {
    noStroke();
    fill(this.color);
    ellipse(this.posX, this.posY, this.size);
  };
}

function drawMonths() {
  textSize(22);
  let months = ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"];
  for (let i = 0; i < 12; i++) {
    let c = (i % 2 == 0) ? color(0, 128, 0) : color(255, 0, 0); // verde e rosso alternati
    fill(c);
    text(months[i], 80 + i * 80, 50);
  }
}
