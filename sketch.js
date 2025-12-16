let bg;
let snowflakes = [];
let lights = [];
let months = ["Gen","Feb","Mar","Apr","Mag","Giu","Lug","Ago","Set","Ott","Nov","Dic"];
let daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
let today;

function preload() {
  bg = loadImage('https://raw.githubusercontent.com/nimeo1988/calendario-natale/main/famiglia.jpg');
}

function setup() {
  createCanvas(1200, 800);
  textAlign(CENTER, CENTER);
  textFont('Georgia');
  today = new Date();

  // Lucine decorative natalizie
  for(let i=0;i<50;i++){
    lights.push({x: random(width), y: random(200), size: random(4,8), col: random([color(255,0,0),color(0,255,0),color(255,215,0)])});
  }
}

function draw() {
  // Sfondo con overlay sfumato
  image(bg,0,0,width,height);
  noStroke();
  fill(0,50);
  rect(0,0,width,height);

  // Neve animata
  let t = frameCount/60;
  for(let i=0;i<random(1,5);i++) snowflakes.push(new snowflake());
  for(let f of snowflakes){f.update(t);f.display();}

  // Lucine natalizie scintillanti
  for(let l of lights){
    fill(l.col);
    ellipse(l.x, l.y + sin(t+l.x)*5, l.size);
  }

  // Messaggio Buon Anno!
  fill(255,0,0);
  textSize(70);
  text("Buon Anno!", width/2, 80);

  // Countdown reale
  let now = new Date();
  let newYear = new Date(now.getFullYear()+1,0,1);
  let diff = newYear - now;
  let days = floor(diff/(1000*60*60*24));
  let hours = floor((diff/(1000*60*60))%24);
  let minutes = floor((diff/(1000*60))%60);
  let seconds = floor((diff/1000)%60);

  textSize(50);
  fill(255,215,0);
  text(`${days}d ${hours}h ${minutes}m ${seconds}s`, width/2, 150);

  // Calendario in griglia elegante
  drawCalendar();
}

// Classe fiocco di neve
function snowflake(){
  this.posX = random(width);
  this.posY = random(-50,0);
  this.size = random(3,7);
  this.speed = random(1,3);
  this.color = random([color(255,255,255,200),color(255,0,0,180),color(0,255,0,180)]);
  this.update = function(time){
    this.posY+=this.speed;
    this.posX+=sin(time+this.posY*0.01)*1.5;
    if(this.posY>height){this.posY=random(-50,0); this.posX=random(width);}
  }
  this.display=function(){fill(this.color); noStroke(); ellipse(this.posX,this.posY,this.size);}
}

// Disegna calendario elegante
function drawCalendar(){
  let startX=50,startY=220,boxW=70,boxH=50,marginX=20,marginY=15;
  textSize(20);
  for(let m=0;m<12;m++){
    // Nome mese
    fill(m%2===0?color(0,128,0):color(255,0,0));
    text(months[m],startX+m*(boxW+marginX)+boxW/2,startY-35);

    // Giorni
    for(let d=1;d<=daysInMonth[m];d++){
      let col=(d-1)%7;
      let row=floor((d-1)/7);
      let x=startX+m*(boxW+marginX)+col*boxW+boxW/2;
      let y=startY+row*boxH;

      // Giorno corrente con effetto glow
      if(today.getMonth()===m && today.getDate()===d){
        fill(255,215,0,200);
        ellipse(x,y,boxW-10,boxH-10);
        fill(0);
      } else fill(255);

      text(d,x,y);
    }
  }
}
