let bg;
let snowflakes = [];
let months = ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"];
let daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
let today;

function preload() {
  // Foto della famiglia (URL diretto)
  bg = loadImage('https://raw.githubusercontent.com/nimeo1988/calendario-natale/main/famiglia.jpg'); 
}

function setup() {
  createCanvas(1200, 800);
  textAlign(CENTER, CENTER);
  textFont('Georgia');
  today = new Date();
}

function draw() {
  background(0);

  // Foto di famiglia sfumata
  image(bg, 0, 0, width, height);
  fill(0, 50); // overlay semi-trasparente
  rect(0, 0, width, height);

  // Neve animata
  let t = frameCount / 60;
  for (let i = 0; i < random(1, 5); i++) {
    snowflakes.push(new snowflake());
  }
  for (let flake of snowflakes) {
    flake.update(t);
    flake.display();
  }

  // Messaggio centrale
  textSize(70);
  fill(255, 0, 0);
  text("Buon Anno!", width / 2, 80);

  // Countdown fisso
  textSize(50);
  fill(255, 215, 0);
  text("0d 0h 0m 0s", width / 2, 150);

  // Disegna calendario
  drawCalendarGrid();
}

// Classe fiocco di neve
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

// Disegna il calendario in griglia
function drawCalendarGrid() {
  let startX = 50;
  let startY = 220;
  let boxW = 80;
  let boxH = 50;
  let marginX = 20;
  let marginY = 20;

  textSize(22);
  for (let m = 0; m < 12; m++) {
    // Nome del mese
    fill(m % 2 === 0 ? color(0,128,0) : color(255,0,0));
    text(months[m], startX + m * (boxW + marginX) + boxW/2, startY - 40);

    // Giorni in griglia (7 colonne)
    for (let d = 1; d <= daysInMonth[m]; d++) {
      let col = (d - 1) % 7;
      let row = floor((d - 1) / 7);
      let x = startX + m * (boxW + marginX) + col * boxW + boxW/2;
      let y = startY + row * boxH;

      // Evidenzia giorno corrente
      if (today.getMonth() === m && today.getDate() === d) {
        fill(255, 215, 0); // oro
        rect(x - boxW/2 + 5, y - boxH/2 + 5, boxW - 10, boxH - 10, 10);
        fill(0);
      } else {
        fill(255);
      }

      text(d, x, y);
    }
  }
}
