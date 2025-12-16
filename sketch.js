let bg;
let snowflakes = [];
let ornaments = [];
let targetDate;
let today;

function preload() {
  bg = loadImage('famiglia.jpg', 
    () => console.log("Immagine caricata"), 
    () => console.log("Errore: famiglia.jpg non trovata")
  );
}

function setup() {
  createCanvas(1200, 800);
  textAlign(CENTER, CENTER);
  textFont('Georgia');
  today = new Date();

  // Data di destinazione (Natale)
  targetDate = new Date(today.getFullYear(), 11, 25, 0, 0, 0);
  if(today > targetDate){
    targetDate.setFullYear(today.getFullYear()+1);
  }

  // Inizializza le palle di Natale
  for(let i = 0; i < 15; i++){
    ornaments.push(new ornament());
  }
}

function draw() {
  background(0);

  // Sfondo foto + overlay sfumato
  image(bg, 0, 0, width, height);
  fill(0, 100);
  rect(0, 0, width, height);

  // Neve leggera
  let t = frameCount / 60;
  if(frameCount % 2 === 0) snowflakes.push(new snowflake());
  for(let f of snowflakes){ f.update(t); f.display(); }

  // Palle di Natale cadenti
  for(let o of ornaments){ o.update(); o.display(); }

  // Messaggio "Buon Natale" più in alto
  textSize(90);
  fill(255,0,0);
  stroke(255, 215, 0);
  strokeWeight(2);
  text("Buon Natale!", width/2, 80);

  // Countdown
  let now = new Date();
  let diff = targetDate - now;
  let days = floor(diff / (1000 * 60 * 60 * 24));
  let hours = floor((diff / (1000 * 60 * 60)) % 24);
  let minutes = floor((diff / (1000 * 60)) % 60);
  let seconds = floor((diff / 1000) % 60);

  textSize(60);
  fill(255, 215, 0);
  stroke(150, 75, 0);
  strokeWeight(1.5);
  text(`${days} giorni\n${hours}h ${minutes}m ${seconds}s`, width/2, height - 150);
}

// Classe fiocco di neve
function snowflake(){
  this.posX = random(width);
  this.posY = random(-50, 0);
  this.size = random(3,6);
  this.speed = random(0.5,1.5);
  this.color = random([color(255,255,255,180), color(255,0,0,150), color(0,255,0,150)]);

  this.update = function(time){
    this.posY += this.speed;
    if(this.posY > height) {
      this.posY = random(-50,0);
      this.posX = random(width);
    }
  }

  this.display = function(){
    noStroke();
    fill(this.color);
    ellipse(this.posX, this.posY, this.size);
  }
}

// Classe pallina di Natale
function ornament(){
  this.posX = random(width);
  this.posY = random(-100, -50);
  this.size = random(15, 30);
  this.speed = random(1, 2);
  this.color = random([color(255,0,0), color(0,255,0), color(255,215,0)]); // rosso, verde, oro

  this.update = function(){
    this.posY += this.speed;
    if(this.posY > height){
      this.posY = random(-100, -50);
      this.posX = random(width);
    }
  }

  this.display = function(){
    fill(this.color);
    stroke(255);
    strokeWeight(1);
    ellipse(this.posX, this.posY, this.size);
  }
}
