let bg;
let snowflakes = [];
let months = ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"];
let daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
let today;

function preload() {
  // URL diretto della tua immagine
  bg = loadImage('https://raw.githubusercontent.com/nimeo1988/calendario-natale/main/famiglia.jpg'); 
}

function setup() {
  createCanvas(1000, 700);
  textAlign(CENTER, CENTER);
  textFont('Georgia');
  today = new Date();
}

function draw() {
  // Sfondo foto con overlay per far risaltare testo
  image(bg, 0, 0, width, height);
  fill(0, 50); // overlay semi-trasparente
  rect(0, 0, width, height);

  // Neve colorata
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

  textSize(60);
  fill(255, 0, 0);
  text("Buon Anno!", width / 2, height / 2 - 100);

  textSize(50);
  fill(255, 215, 0);
  text(`${days}d ${hours}h ${minutes}m ${seconds}s`, width / 2, height / 2);

  // Disegna il calendario completo
  drawFullCalendar();
}

// Snowflake class
function snowflake() {
  this.posX = random(0, width);
  this.posY = random(-50, 0);
  this.size = random(3, 7);
  this.speed = random(1, 3);
  this.color = random([color(255,0,0,200), color(0,255,0,200), color(255,255,255,200)]);

  this.update = function(time) {
    this.posY += this.speed;
    this.posX += sin(time + this.posY * 0.01) * 1.5;
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

// Disegna calendario completo
function drawFullCalendar() {
  let startX = 50;
  let startY = 400;
  let boxSize = 60;
  let marginX = 10;
  let marginY = 10;

  textSize(22);

  for (let m = 0; m < 12; m++) {
    // Nome mese
    fill(m % 2 == 0 ? color(0,128,0) : color(255,0,0));
    text(months[m], startX + m * (boxSize+marginX), startY - 30);

    // Giorni del mese
    for (let d = 1; d <= daysInMonth[m]; d++) {
      let x = startX + m * (boxSize+marginX);
      let y = startY + (d-1) * (boxSize/2);
      if (today.getMonth() === m && today.getDate() === d) {
        fill(255,215,0); // oro giorno attuale
      } else {
        fill(255);
      }
      text(d, x, y);
    }
  }
}
