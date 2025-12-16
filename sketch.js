let bg;
let snowflakes = [];
let ornaments = [];
let lights = [];
let targetDate;
let today;

function preload() {
  bg = loadImage('famiglia.jpg', 
    () => console.log("Immagine caricata"), 
    () => console.log("Errore: famiglia.jpg non trovata")
  );
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textFont('Georgia');
  today = new Date();

  // Data di destinazione (Natale)
  targetDate = new Date(today.getFullYear(), 11, 25, 0, 0, 0);
  if(today > targetDate){
    targetDate.setFullYear(today.getFullYear()+1);
  }

  // Palle di Natale
  let numOrnaments = width < 600 ? 8 : 15;
  for(let i = 0; i < numOrnaments; i++){
    ornaments.push(new ornament());
  }

  // Lucine natalizie scintillanti
  let numLights = width < 600 ? 10 : 30;
  for(let i = 0; i < numLights; i++){
    lights.push(new light());
  }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);

  // Sfondo foto + overlay sfumato
  image(bg, 0, 0, width, height);
  fill(0, 100);
  rect(0, 0, width, height);

  // Lucine natalizie scintillanti
  for(let l of lights) l.update().display();

  // Neve leggera
  let t = frameCount / 60;
  if(frameCount % 2 === 0) snowflakes.push(new snowflake());
  for(let f of snowflakes) f.update(t).display();

  // Palle di Natale cadenti e rimbalzanti
  for(let o of ornaments) o.update().display();

  // Messaggio "Buon Natale"
  let titleSize = width < 600 ? 50 : 90;
  textSize(titleSize);
  fill(255,0,0);
  stroke(255, 215, 0);
  strokeWeight(2);
  text("Buon Natale!", width/2, titleSize);

  // Countdown con effetto glitter dorato
  let now = new Date();
  let diff = targetDate - now;
  let days = floor(diff / (1000 * 60 * 60 * 24));
  let hours = floor((diff / (1000 * 60 * 60)) % 24);
  let minutes = floor((diff / (1000 * 60)) % 60);
  let seconds = floor((diff / 1000) % 60);

  let countdownSize = width < 600 ? 35 : 60;
  textSize(countdownSize);

  // Effetto glitter dorato
  for(let i=0; i<5; i++){
    fill(255, 215, 0, random(150,255));
    stroke(255, 215, 0);
    strokeWeight(random(0.5,2));
    text(`${days} giorni\n${hours}h ${minutes}m ${seconds}s`, width/2 + random(-2,2), height - 150 + random(-2,2));
  }
}

// Classe fiocco di neve
function snowflake(){
  this.posX = random(width);
  this.posY = random(-50, 0);
  this.size = random(width < 600 ? 2 : 3, width < 600 ? 4 : 6);
  this.speed = random(0.5,1.5);
  this.color = random([color(255,255,255,180), color(255,0,0,150), color(0,255,0,150)]);

  this.update = function(time){
    this.posY += this.speed;
    if(this.posY > height) {
      this.posY = random(-50,0);
      this.posX = random(width);
    }
    return this;
  }

  this.display = function(){
    noStroke();
    fill(this.color);
    ellipse(this.posX, this.posY, this.size);
  }
}

// Classe pallina di Natale rimbalzante
function ornament(){
  this.posX = random(width);
  this.posY = random(-100, -50);
  this.size = random(width < 600 ? 10 : 15, width < 600 ? 20 : 30);
  this.speed = random(1, 2);
  this.bounce = 0;

  this.color = random([color(255,0,0), color(0,255,0), color(255,215,0)]);

  this.update = function(){
    this.posY += this.speed;
    // rimbalzo leggero quando arriva in basso
    if(this.posY > height - this.size){
      this.posY = height - this.size;
      this.speed = -this.speed * 0.6;
    } else {
      this.speed += 0.05; // gravità
    }
    return this;
  }

  this.display = function(){
    fill(this.color);
    stroke(255);
    strokeWeight(1);
    ellipse(this.posX, this.posY, this.size);
  }
}

// Classe lucine natalizie scintillanti
function light(){
  this.posX = random(width);
  this.posY = random(height/2);
  this.size = random(5,12);
  this.color = random([color(255,0,0), color(0,255,0), color(255,215,0)]);
  this.brightness = random(100,255);
  this.dir = random([1,-1]);

  this.update = function(){
    this.brightness += this.dir * random(2,5);
    if(this.brightness > 255) this.dir = -1;
    if(this.brightness < 100) this.dir = 1;
    return this;
  }

  this.display = function(){
    noStroke();
    fill(red(this.color), green(this.color), blue(this.color), this.brightness);
    ellipse(this.posX, this.posY, this.size);
  }
}
