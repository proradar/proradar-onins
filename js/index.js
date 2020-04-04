// IDs
var buttonID = ["newGame", "continueGame"]
var roomStateID = ["menu", "helpWanted"]

// Variables
var state;
var buttons = [];
var texts = [];
var backgrounds = [];
var staticCam = [];
var opact = 1;
var fadeOut = false;
var hasPressed = false;
var dead = false;
var audio = new Audio('FCAM_HOB.wav');

// Button Pressed
function startGame() {
    if (hasPressed == false) {
      switchRoomState(roomStateID[0])
      dead = false;
      myGameArea.start();
    }
}

// Music Repeat
audio.addEventListener('ended', function() {
    if (dead == false) {
      if (state == roomStateID[0]) {
        this.currentTime = 0;
        this.play();
      }
    }
}, false);

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 640;
        this.canvas.height = 480;
        this.context = this.canvas.getContext("2d");
        document.getElementById('gameContent').appendChild(this.canvas);
        this.frameNo = 0;
        if (hasPressed == false) {
          this.interval = setInterval(updateGameArea, 20);
          hasPressed = true;
        }
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type, text) {
    this.type = type;
    this.score = 0;
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.text = text;
    this.color = color
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = this.color;
            ctx.fillText(this.text, this.x, this.y);
        }
        else if (this.type == "image") {
            ctx.drawImage(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
}

function updateGameArea() {
  if (dead == false) {

    var x, height, gap, minHeight, maxHeight, minGap, maxGap;
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(1)) {
      for (var i = 0; i < staticCam.length; i++) {
        if (staticCam[i].text == staticEffect1) {
          staticCam[i].text = staticEffect2;
        }
        else if (staticCam[i].text == staticEffect2) {
          staticCam[i].text = staticEffect3;
        }
        else if (staticCam[i].text == staticEffect3) {
          staticCam[i].text = staticEffect4;
        }
        else if (staticCam[i].text == staticEffect4) {
          staticCam[i].text = staticEffect1;
        }
      }
    }
    if (fadeOut == true) {
      if (myGameArea.frameNo == 1 || everyinterval(1)) {
        opact = opact - 0.02
      }
      for (var i = 0; i < texts.length; i++) {
        if (texts[i].text == "The Hut of Birds") {
          texts[i].color = "rgba(154,43,159,"+opact+")";
        }
        else {
          texts[i].color = "rgba(255,255,255,"+opact+")";
        }
      }
      if (opact == 0) {
        fadeOut = false;

      }
    }
    if (state == roomStateID[0]) {
      // console.log("YA");
      // if (myGameArea.frameNo == 1 || everyinterval(Math.floor(Math.random() * Math.floor(200 - 100) + 100))) {
      //   // console.log("YAY");
      //   texts[2].text = "Is";
      //   backgrounds[0].text = pellet1;
      //   window.setTimeout(function() {
      //     texts[2].text = "Is Not";
      //     backgrounds[0].text = pellet2;
      //   }, 110)
      // }
    }
    for (var i = 0; i < backgrounds.length; i++) {
      backgrounds[i].newPos();
      backgrounds[i].update();
    }
    for (var i = 0; i < staticCam.length; i++) {
      staticCam[i].newPos();
      staticCam[i].update();
    }
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].newPos();
      buttons[i].update();
    }
    for (var i = 0; i < texts.length; i++) {
      texts[i].newPos();
      texts[i].update();
    }
  }
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function getMousePos(canvas, evt) {
  var rect = myGameArea.canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

myGameArea.canvas.addEventListener('mousedown', function(evt) {
  var mousePos = getMousePos(myGameArea.canvas, evt);
  // console.log("MouseX: " + mousePos.x);
  for (var i = 0; i < buttons.length; i++) {
    var widthX = buttons[i].width + buttons[i].x;
    var heightY = buttons[i].height + buttons[i].y;
    if (mousePos.x > buttons[i].x) {
      // console.log("ButtonX: "+ buttons[i].x);
      // console.log("ButtonWidthX: "+ widthX);
      if (mousePos.x < widthX) {
        // console.log("X");
        if (mousePos.y > buttons[i].y) {
          // console.log("ButtonY: "+ buttons[i].y);
          // console.log("ButtonHeightY: "+ heightY);]
          if (mousePos.y < heightY) {
            // console.log("Y");
            // console.log(id[0]);
            // console.log(id[1]);
            if (buttons[i].type == buttonID[0]) {
              newGame();
              console.log("New Game");
            }
            else if (buttons[i].type == buttonID[1]) {
              console.log("Continue Game");
            }
          }
        }
      }
    }
  }
}, false);

function switchRoomState(n) {
  buttons = [];
  texts = [];
  backgrounds = [];
  staticCam = [];
  if (n == roomStateID[0]) {
    state = roomStateID[0];
    texts.push(new component("25px", "PressStart2P", "white", 50, 100, "text", "Five"));
    texts.push(new component("25px", "PressStart2P", "white", 50, 140, "text", "Chapters"));
    texts.push(new component("25px", "PressStart2P", "white", 50, 180, "text", "At"));
    texts.push(new component("25px", "PressStart2P", "white", 50, 220, "text", "Midnight"));
    texts.push(new component("20px", "PressStart2P", "#9A2B9F", 50, 260, "text", "The Hut of Birds"));
    texts.push(new component("20px", "PressStart2P", "white", 50, 325, "text", "New Game"));
    texts.push(new component("20px", "PressStart2P", "white", 50, 365, "text", "Continue Game"));
    texts.push(new component("10px", "PressStart2P", "white", 20, 460, "text", "v 0.1-alpha"));
    texts.push(new component("12px", "PressStart2P", "white", 410, 420, "text", "GAME BY:"));
    texts.push(new component("10px", "PressStart2P", "white", 430, 440, "text", "Designer: geniva"));
    texts.push(new component("10px", "PressStart2P", "white", 430, 460, "text", "Programmer: proradar"));
    buttons.push(new component(180, 30, "rgba(0,0,0,0)", 50, 300, "newGame"));
    buttons.push(new component(280, 30, "rgba(0,0,0,0)", 50, 340, "continueGame"));
    console.log("Menu Rendered");
    audio.play()
  }
}

function newGame() {
  fadeOut = true;
}

start.onclick = function() {
  startGame()
}
