let bg;
let snowflakes = [];
let lights = [];
let months = ["Gen","Feb","Mar","Apr","Mag","Giu","Lug","Ago","Set","Ott","Nov","Dic"];
let daysInMonth = [31,28,31,30,31,30,31,31,30,31,30,31];
let today;
let boxW, boxH, marginX, marginY, startX, startY;

function preload() {
  bg = loadImage('https://raw.githubusercontent.com/nimeo1988/calendario-natale/main/famiglia.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);
  textFont('Georgia');
  today = new Date();

  // Dimensioni dinamiche
  boxW = min(70, width/20);
  boxH = min(50, height/20);
  marginX = boxW/4;
  marginY = boxH/4;
  startX = 20;
  startY = 220;

  // Lucine natalizie
  for(let i=0;i<60;i++){
    lights.push({
      x: random(width),
      y: random(150),
      size: random(4,8),
      col: random([color(255,0,0),color(0,255,0),color(255,215,0)]),
      speed: random(0.01,0.05)
    });
  }
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
  boxW = min(70, width/20);
  boxH = min(50, height/20);
  marginX = boxW/4;
  marginY = boxH/4;
}

function draw() {
  // Sfondo foto + overlay sfumato
  image(bg,0,0,width,height);
  fill(0,50);
  rect(0,0,width,height);

  let t = frameCount/60;

  // Neve animata (piccola e grande)
  for(let i=0;i<random(1,5);i++) snowflakes.push(new snowflake());
  for(let f of snowflakes){f.update(t); f.display();}

  // Lucine scintillanti lampeggianti
  for(let l of lights){
    let flicker = sin(t*10 + l.x) * 0.5 + 0.5; // lampeggio
    fill(red(l.col), green(l.col), blue(l.col), 150 + 100*flicker);
    ellipse(l.x, l.y + sin(t + l.x)*5, l.size);
  }

  // Messaggio centrale “Buon Anno!”
  textSize(min(80,width/15));
  fill(255,0,0);
  text("Buon Anno!", width/2, 80);

  // Countdown con effetto glitter dorato
  let now = new Date();
  let newYear = new Date(now.getFullYear()+1,0,1);
  let diff = newYear - now;
  let days = floor(diff/(1000*60*60*24));
  let hours = floor((diff/(1000*60*60))%24);
  let minutes = floor((diff/(1000*60))%60);
  let seconds = floor((diff/1000)%60);

  textSize(min(60,width/20));
  for(let i=0;i<5;i++){ // glitter
    fill(255,215,0,random(100,255));
    text(`${days}d ${hours}h ${minutes}m ${seconds}s`, width/2+random(-2,2), 150+random(-2,2));
  }

  // Disegna calendario elegante e responsive
  drawCalendar();
}

// Classe fiocco di neve
function snowflake(){
  this.posX = random(width);
  this.posY = random(-50,0);
  this.size = random(3,12); // più grande
  this.speed = random(1,4);
  this.color = random([color(255,255,255,200),color(255,0,0,180),color(0,255,0,180)]);
  this.update=function(time){this.posY+=this.speed; this.posX+=sin(time+this.posY*0.01)*1.5; if(this.posY>height){this.posY=random(-50,0); this.posX=random(width);}}
  this.display=function(){fill(this.color); noStroke(); ellipse(this.posX,this.posY,this.size);}
}

// Disegna calendario con effetto glow per giorno corrente
function drawCalendar(){
  textSize(min(20,width/60));
  for(let m=0;m<12;m++){
    // Nome mese
    fill(m%2===0?color(0,128,0):color(255,0,0));
    let monthX = startX + (m%6)*(boxW+marginX);
    let monthY = startY + floor(m/6)*((boxH*5)+marginY*8);
    text(months[m], monthX + 3*boxW/2, monthY - 20);

    // Giorni
    for(let d=1;d<=daysInMonth[m];d++){
      let col=(d-1)%7;
      let row=floor((d-1)/7);
      let x=monthX+col*boxW+boxW/2;
      let y=monthY+row*boxH;

      // Giorno corrente con glow animato
      if(today.getMonth()===m && today.getDate()===d){
        for(let g=1;g<6;g++){
          fill(255,215,0,50);
          ellipse(x,y,boxW-10+g*3, boxH-10+g*3);
        }
        fill(0);
      } else fill(255);

      text(d,x,y);
    }
  }
}
