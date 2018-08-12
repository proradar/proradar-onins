// Menu
var pellet1 = document.getElementById("pellet1");
var pellet2 = document.getElementById("pellet2");
var staticEffect1 = document.getElementById("static1");
var staticEffect2 = document.getElementById("static2");
var staticEffect3 = document.getElementById("static3");
var staticEffect4 = document.getElementById("static4");
var camButtonPic = document.getElementById("camButton");
var camPic = document.getElementById("cam");
var deskPic = document.getElementById("desk");
var deskNoPowerPic = document.getElementById("deskNoPower");
var camOverlay = document.getElementById("camOverlay");
var mapPic = document.getElementById("map");
var pellet1Bedroom = document.getElementById("pellet1Bedroom");
var pellet1MainHall = document.getElementById("pellet1MainHall");
var pellet1LeftHall = document.getElementById("pellet1LeftHall");
var pellet1MiddleHall = document.getElementById("pellet1MiddleHall");
var pellet1RightHall = document.getElementById("pellet1RightHall");

// ID
var buttonID = ["newGame", "continueGame", "doorLight1", "doorClose1", "doorClose2", "doorLight3", "doorClose3", "camButton","cam1","cam2","cam3","cam4","cam5","mute"]
var doorID = ["door1", "door2", "door3"]
// var doorStateID = ["openDoor1", "closeDoor1", "openLight1", "closeLight1", "closeDoor2", "openLight2", "closeLight2", "openDoor3", "closeDoor3", "openLight3", "closeLight3"]
var roomStateID = ["menu", "night1Transition", "night1", "night1End", "bedroom", "powerOutage", "mainHall", "leftHall", "middleHall", "rightHall"]
var state;

// Public
var buttons = [];
var texts = [];
var doors = [];
var doorCovers = [];
var backgrounds = [];
var staticCam = [];
var desk = [];
var camButton = [];
var camButtonDetect = [];
var cam = [];
var currentCam;
var usageBlocks = [];
var mapRender = [];
var door1Light = false;
var door1Close = false;
var door2Light = false;
var door2Close = false;
var door3Light = false;
var door3Close = false;
var dead = false;
var power = 100;
var usage = 0;
var time = 12;
var cameraState = false;
var mouseOnCamera = false;
var gameOn = false;
var hasPressed = false;
var muteOn = false;
var callDone = false;
var audio = new Audio('OneNightIsNotScaryMenu.wav');
var opening = new Audio('opening.caf')
var fan = new Audio('fan.wav');
var fan2 = new Audio('fan.wav');
var light = new Audio('light_hum.wav');
var garageOpen = new Audio('garage_open.wav');
var garageClose = new Audio('garage_close.wav');
var phoneCall1 = new Audio('night1PhoneCall.wav');
var alarm = new Audio('alarm.wav');
/*
Note: Make sure to credit MySoundEffect.com for telephone ring and Soundjay.com for telephone pickup/hangup!
*/

function startGame() {
    // myGamePiece = new component(30, 30, "red", 10, 120);
    // myGamePiece.gravity = 0.05;
    // myHealth = new component("30px", "Consolas", "red", 280, 80, "text");
    // myHealthNum = new component("30px", "Consolas", "red", 375, 80, "text");
    // myHealth.color = "#f00";
    // myHealthNum.color = "#f00";
    if (hasPressed == false) {
      switchRoomState(roomStateID[0])
      myGameArea.start();
    }
}

audio.addEventListener('ended', function() {
    if (dead == false) {
      if (state == roomStateID[0]) {
        this.currentTime = 0;
        this.play();
      }
    }
}, false);

fan.addEventListener('ended', function() {
    if (dead == false) {
      if (gameOn == true) {
        this.currentTime = 0;
        this.play();
      }
    }
}, false);
fan2.addEventListener('ended', function() {
    if (dead == false) {
      if (gameOn == true) {
        this.currentTime = 0;
        this.play();
      }
    }
}, false);

// light.addEventListener('ended', function() {
//     if (dead == false) {
//       if (gameOn == true) {
//         this.currentTime = 0;
//         this.play();
//       }
//     }
// }, false);
// light2.addEventListener('ended', function() {
//     if (dead == false) {
//       if (gameOn == true) {
//         this.currentTime = 0;
//         this.play();
//       }
//     }
// }, false);

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 500;
        this.canvas.height = 500;
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
        this.hitBottom();
    }
    this.hitBottom = function() {
        var bottom = myGameArea.canvas.height - this.height;
        var top = 0;
        var right = myGameArea.canvas.width - this.width;
        var left = 0;
        if (this.y > bottom) {
            this.y = bottom;
        }
        if (this.y < top) {
            this.y = top;
        }
        if (this.x < left) {
            this.x = left;
        }
        if (this.x > right) {
            this.x = right;
        }
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
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
    if (state == roomStateID[0]) {
      // console.log("YA");
      if (myGameArea.frameNo == 1 || everyinterval(Math.floor(Math.random() * Math.floor(200 - 100) + 100))) {
        // console.log("YAY");
        texts[2].text = "Is";
        backgrounds[0].text = pellet1;
        window.setTimeout(function() {
          texts[2].text = "Is Not";
          backgrounds[0].text = pellet2;
        }, 110)
      }
    }
    // if (state == roomStateID[2]) {
    //   if (myGameArea.frameNo == 1 || everyinterval(5)) {
    //     if (power > 0) {
    //       power = power - 1;
    //     }
    //     // console.log("power = "+power);
    //     texts[0].text = "Power:"+power+"%";
    //   }
    //   if (myGameArea.frameNo == 1 || everyinterval(2700)) {
    //     changeTime();
    //   }
    // }
    if (dead == false) {
      if (gameOn == true) {
        if (power == 0) {
          if (state != roomStateID[5]) {
            if (state != roomStateID[3]) {
              switchRoomState(roomStateID[5])
            }
          }
        }
        else {
          if (usage == 1) {
            if (myGameArea.frameNo == 1 || everyinterval(600)) {
              if (power > 0) {
                power = power - 1;
              }
            }
          }
          else if (usage == 2) {
            if (myGameArea.frameNo == 1 || everyinterval(360)) {
              if (power > 0) {
                power = power - 1;
              }
            }
          }
          else if (usage == 3) {
            if (myGameArea.frameNo == 1 || everyinterval(240)) {
              if (power > 0) {
                power = power - 1;
              }
            }
          }
          else if (usage == 4) {
            if (myGameArea.frameNo == 1 || everyinterval(120)) {
              if (power > 0) {
                power = power - 1;
              }
            }
          }
          else if (usage == 5) {
            if (myGameArea.frameNo == 1 || everyinterval(60)) {
              if (power > 0) {
                power = power - 1;
              }
            }
          }
          else if (usage == 6) {
            if (myGameArea.frameNo == 1 || everyinterval(30)) {
              if (power > 0) {
                power = power - 1;
              }
            }
          }
          texts[0].text = "Power:"+power+"%";
          // console.log(usage);
          if (usage >= 1) {
            usageBlocks[0].color = "#00F900";
          }
          else {
            usageBlocks[0].color = "rgba(0,0,0,0)";
          }
          if (usage >= 2) {
            usageBlocks[1].color = "#D4FB79";
          }
          else {
            usageBlocks[1].color = "rgba(0,0,0,0)";
          }
          if (usage >= 3) {
            usageBlocks[2].color = "#FFFC79";
          }
          else {
            usageBlocks[2].color = "rgba(0,0,0,0)";
          }
          if (usage >= 4) {
            usageBlocks[3].color = "#FFD479";
          }
          else {
            usageBlocks[3].color = "rgba(0,0,0,0)";
          }
          if (usage >= 5) {
            usageBlocks[4].color = "#FF9300";
          }
          else {
            usageBlocks[4].color = "rgba(0,0,0,0)";
          }
          if (usage >= 6) {
            usageBlocks[5].color = "#FF2600";
          }
          else {
            usageBlocks[5].color = "rgba(0,0,0,0)";
          }
        }
        if (myGameArea.frameNo == 1 || everyinterval(2700)) {
          changeTime();
        }
      }
    }
    for (var i = 0; i < backgrounds.length; i++) {
      backgrounds[i].newPos();
      backgrounds[i].update();
    }
    for (var i = 0; i < staticCam.length; i++) {
      staticCam[i].newPos();
      staticCam[i].update();
    }
    for (var i = 0; i < doors.length; i++) {
      doors[i].newPos();
      doors[i].update();
    }
    for (var i = 0; i < doorCovers.length; i++) {
      doorCovers[i].newPos();
      doorCovers[i].update();
    }
    for (var i = 0; i < desk.length; i++) {
      desk[i].newPos();
      desk[i].update();
    }
    for (var i = 0; i < mapRender.length; i++) {
      mapRender[i].newPos();
      mapRender[i].update();
    }
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].newPos();
      buttons[i].update();
    }
    for (var i = 0; i < cam.length; i++) {
      cam[i].newPos();
      cam[i].update();
    }
    for (var i = 0; i < camButton.length; i++) {
      camButton[i].newPos();
      camButton[i].update();
    }
    for (var i = 0; i < camButtonDetect.length; i++) {
      camButtonDetect[i].newPos();
      camButtonDetect[i].update();
    }
    for (var i = 0; i < usageBlocks.length; i++) {
      usageBlocks[i].newPos();
      usageBlocks[i].update();
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

function writeMessage(canvas, message) {
  var context = myGameArea.canvas.getContext('2d');
  context.clearRect(0, 0, myGameArea.canvas.width, myGameArea.canvas.height);
  context.font = '18pt Calibri';
  context.fillStyle = 'white';
  context.fillText(message, 10, 25);
}
function getMousePos(canvas, evt) {
  var rect = myGameArea.canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}
var context = myGameArea.canvas.getContext('2d');

myGameArea.canvas.addEventListener('mousemove', function(evt) {
  var mousePos = getMousePos(myGameArea.canvas, evt);
  // var message = 'Mouse position: ' + mousePos.x + ',' + mousePos.y;
  // writeMessage(myGameArea.canvas, message);
  for (var i = 0; i < camButtonDetect.length; i++) {
    // console.log("Ya");
    var widthX = camButtonDetect[i].width + camButtonDetect[i].x;
    var heightY = camButtonDetect[i].height + camButtonDetect[i].y;
    // console.log("X: " + camButtonDetect[i].x + ", WidthX: " + widthX);
    if (mousePos.x > camButtonDetect[i].x) {
      if (mousePos.x < widthX) {
        // console.log("X");
        if (mousePos.y > camButtonDetect[i].y) {
          if (mousePos.y < heightY) {
            // console.log("Y");
            // mouseOnCamera = true;
            // if (cameraState == false) {
            //   if (mouseOnCamera == true) {
            if (mouseOnCamera == false) {
              if (cameraState == false) {
                switchCameraState(1)
                mouseOnCamera = true;
                // console.log(mouseOnCamera);
              }
              else if (cameraState == true) {
                switchCameraState(0)
                mouseOnCamera = true;
                // console.log(mouseOnCamera);
              }
            }
                // cameraState == true;
              // }
            }
            else{
              mouseOnCamera = false;
              // console.log("DISABLED");
            }
          }
          else{
            mouseOnCamera = false;
            // console.log("DISABLED");
          }
        }
        else{
          mouseOnCamera = false;
          // console.log("DISABLED");
        }
      }
    else {
      // mouseOnCamera = false;
      // if (cameraState == true) {
      //   if (mouseOnCamera == false) {
          mouseOnCamera = false;
          // console.log("DISABLED");
          // console.log(mouseOnCamera);
          // cameraState == false;
      //   }
      // }
    }
  }
}, false);

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
              switchRoomState(roomStateID[1])
              console.log("New Game");
            }
            else if (buttons[i].type == buttonID[1]) {
              console.log("Continue Game");
            }
            else if (buttons[i].type == buttonID[2]) {
              doorLight(1);
              console.log("Door Left Light");
            }
            else if (buttons[i].type == buttonID[3]) {
              doorClose(1);
              console.log("Door Left Close");
            }
            else if (buttons[i].type == buttonID[4]) {
              doorClose(2);
              console.log("Door Middle Close");
            }
            else if (buttons[i].type == buttonID[5]) {
              doorLight(4);
              console.log("Door Right Light");
            }
            else if (buttons[i].type == buttonID[6]) {
              doorClose(3);
              console.log("Door Right Close");
            }
            else if (buttons[i].type == buttonID[8]) {
              switchRoomState(roomStateID[4])
              currentCam = roomStateID[4];
              console.log("CAM 1");
            }
            else if (buttons[i].type == buttonID[9]) {
              switchRoomState(roomStateID[6])
              currentCam = roomStateID[6];
              console.log("CAM 2");
            }
            else if (buttons[i].type == buttonID[10]) {
              switchRoomState(roomStateID[7])
              currentCam = roomStateID[7];
              console.log("CAM 3");
            }
            else if (buttons[i].type == buttonID[11]) {
              switchRoomState(roomStateID[8])
              currentCam = roomStateID[8];
              console.log("CAM 4");
            }
            else if (buttons[i].type == buttonID[12]) {
              switchRoomState(roomStateID[9])
              currentCam = roomStateID[9];
              console.log("CAM 5");
            }
            else if (buttons[i].type == buttonID[13]) {
              phoneCall1.pause();
              phoneCall1.currentTime = 0;
              buttons.splice(buttons.length-1, 1);
              texts.splice(texts.length-1, 1);
              muteOn = false;
              console.log("Mute");
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
  usageBlocks = [];
  doors = [];
  doorCovers = [];
  backgrounds = [];
  staticCam = [];
  desk = [];
  camButton = [];
  camButtonDetect = [];
  cam = [];
  mapRender = [];
  if (n == roomStateID[0]) {
    state = roomStateID[0];
    dead = false;
    backgrounds.push(new component(0, 0, "#000", 0, 0, "image", pellet2));
    staticCam.push(new component(0, 0, "#000", 0, 0, "image", staticEffect1));
    texts.push(new component("25px", "PressStart2P", "white", 20, 100, "text", "One"));
    texts.push(new component("25px", "PressStart2P", "white", 20, 140, "text", "Night"));
    texts.push(new component("25px", "PressStart2P", "white", 20, 180, "text", "Is Not"));
    texts.push(new component("25px", "PressStart2P", "white", 20, 220, "text", "Scary"));
    texts.push(new component("20px", "PressStart2P", "white", 20, 295, "text", "New Game"));
    texts.push(new component("20px", "PressStart2P", "white", 20, 335, "text", "Continue Game"));
    buttons.push(new component(180, 30, "rgba(0,0,0,0)", 10, 270, "newGame"));
    buttons.push(new component(280, 30, "rgba(0,0,0,0)", 10, 310, "continueGame"));
    audio.play();
    console.log("Menu Rendered");
  }
  else if (n == roomStateID[1]) {
    state = roomStateID[1];
    power = 100;
    time = 12;
    usage = 0;
    currentCam = roomStateID[4];
    opening.currentTime = 0;
    opening.play();
    texts.push(new component("25px", "PressStart2P", "white", 150, 230, "text", "12:00 AM"));
    texts.push(new component("25px", "PressStart2P", "white", 140, 280, "text", "1st Night"));
    audio.pause();
    audio.currentTime = 0;
    console.log("Night 1 Transition Rendered");
    window.setTimeout('switchRoomState(roomStateID[2])', 3000);
  }
  else if (n == roomStateID[2]) {
    state = roomStateID[2];
    if (gameOn == false) {
      fan.currentTime = 0;
      fan.play();
      window.setTimeout(function () {
        fan2.currentTime = 0;
        fan2.play();
      }, 1000)
      usage = 1;
      gameOn = true;
    }
    backgrounds.push(new component(500, 500, "#A34902", 500, 500));
    camButton.push(new component(0, 0, "#000", 50, 430, "image", camButtonPic));
    camButtonDetect.push(new component(403, 60, "rgba(255,255,255,0)", 50, 430, "camButton"));
    // camButton.push(new component(0, 0, "#000", 50, 10, "image", camButtonPic));
    // camButtonDetect.push(new component(403, 60, "rgba(255,255,255,0)", 50, 10, "camButton"));

    doors.push(new component(80, 200, "#000", 50, 150, "door1"));
    if (door1Close == false) {
      doorCovers.push(new component(80, 180, "rgba(0,0,0,0)", 50, 150, "door1"));
    }
    else {
      doorCovers.push(new component(80, 180, "#5F0000", 50, 150, "door1"));
    }
    buttons.push(new component(30, 30, "#960000", 10, 200, "doorClose1"));
    buttons.push(new component(30, 30, "#fff", 10, 260, "doorLight1"));

    doors.push(new component(180, 250, "#000", 160, 100, "door2"));
    if (door2Close == false) {
      doorCovers.push(new component(180, 200, "rgba(0,0,0,0)", 160, 100, "door2"));
    }
    else {
      doorCovers.push(new component(180, 200, "#5F0000", 160, 100, "door2"));
    }
    buttons.push(new component(30, 30, "#960000", 235, 330, "doorClose2"));

    doors.push(new component(80, 200, "#000", 370, 150, "door3"));
    if (door3Close == false) {
      doorCovers.push(new component(80, 180, "rgba(0,0,0,0)", 370, 150, "door3"));
    }
    else {
      doorCovers.push(new component(80, 180, "#5F0000", 370, 150, "door3"));
    }
    buttons.push(new component(30, 30, "#960000", 460, 200, "doorClose3"));
    buttons.push(new component(30, 30, "#fff", 460, 260, "doorLight3"));

    desk.push(new component(0, 0, "#000", 150, 300, "image", deskPic));
    texts.push(new component("15px", "PressStart2P", "white", 20, 40, "text", "Power:"+power+"%"));
    texts.push(new component("20px", "PressStart2P", "white", 370, 40, "text", time+" AM"));
    texts.push(new component("15px", "PressStart2P", "white", 20, 70, "text", "Usage:"));
    usageBlocks.push(new component(15, 30, "rgba(0,0,0,0)", 120, 45, "usage1"));
    usageBlocks.push(new component(15, 30, "rgba(0,0,0,0)", 140, 45, "usage2"));
    usageBlocks.push(new component(15, 30, "rgba(0,0,0,0)", 160, 45, "usage3"));
    usageBlocks.push(new component(15, 30, "rgba(0,0,0,0)", 180, 45, "usage4"));
    usageBlocks.push(new component(15, 30, "rgba(0,0,0,0)", 200, 45, "usage5"));
    usageBlocks.push(new component(15, 30, "rgba(0,0,0,0)", 220, 45, "usage6"));
    texts.push(new component("15px", "PressStart2P", "white", 370, 60, "text", "Night 1"));
    texts.push(new component("13px", "PressStart2P", "white", 30, 420, "text", "Press & Hold CTRL to use flashlight"));
    console.log("Night 1 Rendered");
    if (muteOn == true) {
      buttons.push(new component(80, 50, "rgba(255, 108, 248, 0.5)", 210, 5, "mute"))
      texts.push(new component("15px", "PressStart2P", "#FFADF8", 220, 38, "text", "Mute"))
    }
    if (callDone == false) {
      phoneCall1.currentTime = 0;
      phoneCall1.play();
      if (muteOn == false) {
        window.setTimeout(function() {
          buttons.push(new component(80, 50, "rgba(255, 108, 248, 0.5)", 210, 5, "mute"))
          texts.push(new component("15px", "PressStart2P", "#FFADF8", 220, 38, "text", "Mute"))
          muteOn = true;
        }, 1500);
        window.setTimeout(function() {
          if (muteOn == true) {
            buttons.splice(buttons.length-1, 1)
            texts.splice(texts.length-1, 1)
            muteOn = false;
          }
        }, 8000);
      }
      callDone = true;
    }
  }
  else if (n == roomStateID[3]) {
    state = roomStateID[3];
    gameOn = false;
    callDone = false
    alarm.play();
    fan.pause();
    fan.currentTime = 0;
    fan2.pause();
    fan2.currentTime = 0;
    light.pause();
    light.currentTime = 0;
    garageOpen.pause();
    garageOpen.currentTime = 0;
    garageClose.pause();
    garageClose.currentTime = 0;
    // light2.pause();
    // light2.currentTime = 0;
    texts.push(new component("25px", "PressStart2P", "white", 170, 230, "text", "5:59 AM"));
    window.setTimeout(function () {
      texts[0].text = "5:59 AM";
      window.setTimeout(function () {
        texts[0].text = " :   AM";
        window.setTimeout(function () {
          texts[0].text = "5:59 AM";
          window.setTimeout(function () {
            texts[0].text = " :   AM";
            window.setTimeout(function () {
              texts[0].text = "6:00 AM";
              window.setTimeout(function () {
                texts[0].text = " :   AM";
                window.setTimeout(function () {
                  texts[0].text = "6:00 AM";
                }, 500);
              }, 500);
            }, 500);
          }, 500);
        }, 500);
      }, 500);
    }, 500);
    console.log("Night 1 End Rendered");
    window.setTimeout(function () {
      alarm.pause();
      alarm.currentTime = 0;
    }, 4000);
    window.setTimeout('switchRoomState(roomStateID[0])', 6000);
  }
  else if (n == roomStateID[4]) {
    state = roomStateID[4];
    if (door1Light == true) {
      usage = usage - 1;
      light.pause();
      light.currentTime = 0;
    }
    door1Light = false;
    if (door2Light == true) {
      usage = usage - 1;
      light.pause();
      light.currentTime = 0;
    }
    door2Light = false;
    if (door3Light == true) {
      usage = usage - 1;
      light.pause();
      light.currentTime = 0;
    }
    door3Light = false;
    backgrounds.push(new component(0, 0, "#000", 0, 0, "image", pellet1Bedroom));
    backgrounds.push(new component(0, 0, "#000", 0, 0, "image", camOverlay));
    staticCam.push(new component(0, 0, "#000", 0, 0, "image", staticEffect1));
    mapRender.push(new component(0, 0, "#000", 250, 180, "image", mapPic));
    camButton.push(new component(0, 0, "#000", 50, 430, "image", camButtonPic));
    camButtonDetect.push(new component(403, 60, "rgba(255,255,255,0)", 50, 430, "camButton"));
    // buttons.push(new component(30, 30, "#fff", 460, 200, "active"));
    texts.push(new component("15px", "PressStart2P", "white", 20, 40, "text", "Power:"+power+"%"));
    texts.push(new component("20px", "PressStart2P", "white", 370, 40, "text", time+" AM"));
    texts.push(new component("15px", "PressStart2P", "white", 20, 70, "text", "Usage:"));
    usageBlocks.push(new component(15, 30, "rgba(0,0,0,0)", 120, 45, "usage1"));
    usageBlocks.push(new component(15, 30, "rgba(0,0,0,0)", 140, 45, "usage2"));
    usageBlocks.push(new component(15, 30, "rgba(0,0,0,0)", 160, 45, "usage3"));
    usageBlocks.push(new component(15, 30, "rgba(0,0,0,0)", 180, 45, "usage4"));
    usageBlocks.push(new component(15, 30, "rgba(0,0,0,0)", 200, 45, "usage5"));
    usageBlocks.push(new component(15, 30, "rgba(0,0,0,0)", 220, 45, "usage6"));
    texts.push(new component("15px", "PressStart2P", "white", 370, 60, "text", "Night 1"));
    buttons.push(new component(50, 30, "#69B331", 220, 220, "cam1"));
    texts.push(new component("10px", "PressStart2P", "white", 225, 240, "text", "CAM1"));
    buttons.push(new component(50, 30, "rgba(100,100,100,1)", 250, 280, "cam2"));
    texts.push(new component("10px", "PressStart2P", "white", 255, 300, "text", "CAM2"));
    buttons.push(new component(50, 30, "rgba(100,100,100,1)", 300, 350, "cam3"));
    texts.push(new component("10px", "PressStart2P", "white", 305, 370, "text", "CAM3"));
    buttons.push(new component(50, 30, "rgba(100,100,100,1)", 350, 320, "cam4"));
    texts.push(new component("10px", "PressStart2P", "white", 355, 340, "text", "CAM4"));
    buttons.push(new component(50, 30, "rgba(100,100,100,1)", 435, 350, "cam5"));
    texts.push(new component("10px", "PressStart2P", "white", 440, 370, "text", "CAM5"));
    texts.push(new component("10px", "PressStart2P", "white", 353, 400, "text", "YOU"));
    console.log("Bedroom Rendered");
    if (muteOn == true) {
      buttons.push(new component(80, 50, "rgba(255, 108, 248, 0.5)", 210, 5, "mute"))
      texts.push(new component("15px", "PressStart2P", "#FFADF8", 220, 38, "text", "Mute"))
    }
  }
  else if (n == roomStateID[5]) {
    state = roomStateID[5];
    if (door1Light == true) {
      usage = usage - 1;
      light.pause();
      light.currentTime = 0;
    }
    door1Light = false;
    if (door2Light == true) {
      usage = usage - 1;
      light.pause();
      light.currentTime = 0;
    }
    door2Light = false;
    if (door3Light == true) {
      usage = usage - 1;
      light.pause();
      light.currentTime = 0;
    }
    door3Light = false;
    backgrounds.push(new component(500, 500, "#3C3C3C", 500, 500));
    buttons.push(new component(30, 30, "#000", 460, 200, "doorLight3"));
    doors.push(new component(80, 200, "#000", 50, 150, "door1"));
    buttons.push(new component(30, 30, "#000", 10, 260, "doorClose1"));
    buttons.push(new component(30, 30, "#000", 10, 200, "doorLight1"));
    doors.push(new component(180, 250, "#000", 160, 100, "door2"));
    desk.push(new component(0, 0, "#000", 150, 300, "image", deskNoPowerPic));
    buttons.push(new component(30, 30, "#000", 240, 50, "doorClose2"));
    doors.push(new component(80, 200, "#000", 370, 150, "door3"));
    buttons.push(new component(30, 30, "#000", 460, 260, "doorClose3"));
    buttons.push(new component(30, 30, "#000", 460, 200, "doorLight3"));
    console.log("Power Outage Rendered");
    if (muteOn == true) {
      buttons.push(new component(80, 50, "rgba(255, 108, 248, 0.5)", 210, 5, "mute"))
      texts.push(new component("15px", "PressStart2P", "#FFADF8", 220, 38, "text", "Mute"))
    }
  }
  else if (n == roomStateID[6]) {
    state = roomStateID[6];
    if (door1Light == true) {
      usage = usage - 1;
      light.pause();
      light.currentTime = 0;
    }
    door1Light = false;
    if (door2Light == true) {
      usage = usage - 1;
      light.pause();
      light.currentTime = 0;
    }
    door2Light = false;
    if (door3Light == true) {
      usage = usage - 1;
      light.pause();
      light.currentTime = 0;
    }
    door3Light = false;
    backgrounds.push(new component(0, 0, "#000", 0, 0, "image", pellet1MainHall));
    backgrounds.push(new component(0, 0, "#000", 0, 0, "image", camOverlay));
    staticCam.push(new component(0, 0, "#000", 0, 0, "image", staticEffect1));
    mapRender.push(new component(0, 0, "#000", 250, 180, "image", mapPic));
    camButton.push(new component(0, 0, "#000", 50, 430, "image", camButtonPic));
    camButtonDetect.push(new component(403, 60, "rgba(255,255,255,0)", 50, 430, "camButton"));
    // buttons.push(new component(30, 30, "#fff", 460, 200, "active"));
    texts.push(new component("15px", "PressStart2P", "white", 20, 40, "text", "Power:"+power+"%"));
    texts.push(new component("20px", "PressStart2P", "white", 370, 40, "text", time+" AM"));
    texts.push(new component("15px", "PressStart2P", "white", 20, 70, "text", "Usage:"));
    usageBlocks.push(new component(15, 30, "rgba(0,0,0,0)", 120, 45, "usage1"));
    usageBlocks.push(new component(15, 30, "rgba(0,0,0,0)", 140, 45, "usage2"));
    usageBlocks.push(new component(15, 30, "rgba(0,0,0,0)", 160, 45, "usage3"));
    usageBlocks.push(new component(15, 30, "rgba(0,0,0,0)", 180, 45, "usage4"));
    usageBlocks.push(new component(15, 30, "rgba(0,0,0,0)", 200, 45, "usage5"));
    usageBlocks.push(new component(15, 30, "rgba(0,0,0,0)", 220, 45, "usage6"));
    texts.push(new component("15px", "PressStart2P", "white", 370, 60, "text", "Night 1"));

    buttons.push(new component(50, 30, "rgba(100,100,100,1)", 220, 220, "cam1"));
    texts.push(new component("10px", "PressStart2P", "white", 225, 240, "text", "CAM1"));
    buttons.push(new component(50, 30, "#69B331", 250, 280, "cam2"));
    texts.push(new component("10px", "PressStart2P", "white", 255, 300, "text", "CAM2"));
    buttons.push(new component(50, 30, "rgba(100,100,100,1)", 300, 350, "cam3"));
    texts.push(new component("10px", "PressStart2P", "white", 305, 370, "text", "CAM3"));
    buttons.push(new component(50, 30, "rgba(100,100,100,1)", 350, 320, "cam4"));
    texts.push(new component("10px", "PressStart2P", "white", 355, 340, "text", "CAM4"));
    buttons.push(new component(50, 30, "rgba(100,100,100,1)", 435, 350, "cam5"));
    texts.push(new component("10px", "PressStart2P", "white", 440, 370, "text", "CAM5"));
    texts.push(new component("10px", "PressStart2P", "white", 353, 400, "text", "YOU"));
    console.log("Main Hall Rendered");
    if (muteOn == true) {
      buttons.push(new component(80, 50, "rgba(255, 108, 248, 0.5)", 210, 5, "mute"))
      texts.push(new component("15px", "PressStart2P", "#FFADF8", 220, 38, "text", "Mute"))
    }
  }
  else if (n == roomStateID[7]) {
    state = roomStateID[7];
    if (door1Light == true) {
      usage = usage - 1;
      light.pause();
      light.currentTime = 0;
    }
    door1Light = false;
    if (door2Light == true) {
      usage = usage - 1;
      light.pause();
      light.currentTime = 0;
    }
    door2Light = false;
    if (door3Light == true) {
      usage = usage - 1;
      light.pause();
      light.currentTime = 0;
    }
    door3Light = false;
    backgrounds.push(new component(0, 0, "#000", 0, 0, "image", pellet1LeftHall));
    backgrounds.push(new component(0, 0, "#000", 0, 0, "image", camOverlay));
    staticCam.push(new component(0, 0, "#000", 0, 0, "image", staticEffect1));
    mapRender.push(new component(0, 0, "#000", 250, 180, "image", mapPic));
    camButton.push(new component(0, 0, "#000", 50, 430, "image", camButtonPic));
    camButtonDetect.push(new component(403, 60, "rgba(255,255,255,0)", 50, 430, "camButton"));
    // buttons.push(new component(30, 30, "#fff", 460, 200, "active"));
    texts.push(new component("15px", "PressStart2P", "white", 20, 40, "text", "Power:"+power+"%"));
    texts.push(new component("20px", "PressStart2P", "white", 370, 40, "text", time+" AM"));
    texts.push(new component("15px", "PressStart2P", "white", 20, 70, "text", "Usage:"));
    usageBlocks.push(new component(15, 30, "rgba(0,0,0,0)", 120, 45, "usage1"));
    usageBlocks.push(new component(15, 30, "rgba(0,0,0,0)", 140, 45, "usage2"));
    usageBlocks.push(new component(15, 30, "rgba(0,0,0,0)", 160, 45, "usage3"));
    usageBlocks.push(new component(15, 30, "rgba(0,0,0,0)", 180, 45, "usage4"));
    usageBlocks.push(new component(15, 30, "rgba(0,0,0,0)", 200, 45, "usage5"));
    usageBlocks.push(new component(15, 30, "rgba(0,0,0,0)", 220, 45, "usage6"));
    texts.push(new component("15px", "PressStart2P", "white", 370, 60, "text", "Night 1"));

    buttons.push(new component(50, 30, "rgba(100,100,100,1)", 220, 220, "cam1"));
    texts.push(new component("10px", "PressStart2P", "white", 225, 240, "text", "CAM1"));
    buttons.push(new component(50, 30, "rgba(100,100,100,1)", 250, 280, "cam2"));
    texts.push(new component("10px", "PressStart2P", "white", 255, 300, "text", "CAM2"));
    buttons.push(new component(50, 30, "#69B331", 300, 350, "cam3"));
    texts.push(new component("10px", "PressStart2P", "white", 305, 370, "text", "CAM3"));
    buttons.push(new component(50, 30, "rgba(100,100,100,1)", 350, 320, "cam4"));
    texts.push(new component("10px", "PressStart2P", "white", 355, 340, "text", "CAM4"));
    buttons.push(new component(50, 30, "rgba(100,100,100,1)", 435, 350, "cam5"));
    texts.push(new component("10px", "PressStart2P", "white", 440, 370, "text", "CAM5"));
    texts.push(new component("10px", "PressStart2P", "white", 353, 400, "text", "YOU"));
    console.log("Left Hall Rendered");
    if (muteOn == true) {
      buttons.push(new component(80, 50, "rgba(255, 108, 248, 0.5)", 210, 5, "mute"))
      texts.push(new component("15px", "PressStart2P", "#FFADF8", 220, 38, "text", "Mute"))
    }
  }
  else if (n == roomStateID[8]) {
    state = roomStateID[8];
    if (door1Light == true) {
      usage = usage - 1;
      light.pause();
      light.currentTime = 0;
    }
    door1Light = false;
    if (door2Light == true) {
      usage = usage - 1;
      light.pause();
      light.currentTime = 0;
    }
    door2Light = false;
    if (door3Light == true) {
      usage = usage - 1;
      light.pause();
      light.currentTime = 0;
    }
    door3Light = false;
    backgrounds.push(new component(0, 0, "#000", 0, 0, "image", pellet1MiddleHall));
    backgrounds.push(new component(0, 0, "#000", 0, 0, "image", camOverlay));
    staticCam.push(new component(0, 0, "#000", 0, 0, "image", staticEffect1));
    mapRender.push(new component(0, 0, "#000", 250, 180, "image", mapPic));
    camButton.push(new component(0, 0, "#000", 50, 430, "image", camButtonPic));
    camButtonDetect.push(new component(403, 60, "rgba(255,255,255,0)", 50, 430, "camButton"));
    // buttons.push(new component(30, 30, "#fff", 460, 200, "active"));
    texts.push(new component("15px", "PressStart2P", "white", 20, 40, "text", "Power:"+power+"%"));
    texts.push(new component("20px", "PressStart2P", "white", 370, 40, "text", time+" AM"));
    texts.push(new component("15px", "PressStart2P", "white", 20, 70, "text", "Usage:"));
    usageBlocks.push(new component(15, 30, "rgba(0,0,0,0)", 120, 45, "usage1"));
    usageBlocks.push(new component(15, 30, "rgba(0,0,0,0)", 140, 45, "usage2"));
    usageBlocks.push(new component(15, 30, "rgba(0,0,0,0)", 160, 45, "usage3"));
    usageBlocks.push(new component(15, 30, "rgba(0,0,0,0)", 180, 45, "usage4"));
    usageBlocks.push(new component(15, 30, "rgba(0,0,0,0)", 200, 45, "usage5"));
    usageBlocks.push(new component(15, 30, "rgba(0,0,0,0)", 220, 45, "usage6"));
    texts.push(new component("15px", "PressStart2P", "white", 370, 60, "text", "Night 1"));

    buttons.push(new component(50, 30, "rgba(100,100,100,1)", 220, 220, "cam1"));
    texts.push(new component("10px", "PressStart2P", "white", 225, 240, "text", "CAM1"));
    buttons.push(new component(50, 30, "rgba(100,100,100,1)", 250, 280, "cam2"));
    texts.push(new component("10px", "PressStart2P", "white", 255, 300, "text", "CAM2"));
    buttons.push(new component(50, 30, "rgba(100,100,100,1)", 300, 350, "cam3"));
    texts.push(new component("10px", "PressStart2P", "white", 305, 370, "text", "CAM3"));
    buttons.push(new component(50, 30, "#69B331", 350, 320, "cam4"));
    texts.push(new component("10px", "PressStart2P", "white", 355, 340, "text", "CAM4"));
    buttons.push(new component(50, 30, "rgba(100,100,100,1)", 435, 350, "cam5"));
    texts.push(new component("10px", "PressStart2P", "white", 440, 370, "text", "CAM5"));
    texts.push(new component("10px", "PressStart2P", "white", 353, 400, "text", "YOU"));
    console.log("Middle Hall Rendered");
    if (muteOn == true) {
      buttons.push(new component(80, 50, "rgba(255, 108, 248, 0.5)", 210, 5, "mute"))
      texts.push(new component("15px", "PressStart2P", "#FFADF8", 220, 38, "text", "Mute"))
    }
  }
  else if (n == roomStateID[9]) {
    state = roomStateID[9];
    if (door1Light == true) {
      usage = usage - 1;
      light.pause();
      light.currentTime = 0;
    }
    door1Light = false;
    if (door2Light == true) {
      usage = usage - 1;
      light.pause();
      light.currentTime = 0;
    }
    door2Light = false;
    if (door3Light == true) {
      usage = usage - 1;
      light.pause();
      light.currentTime = 0;
    }
    door3Light = false;
    backgrounds.push(new component(0, 0, "#000", 0, 0, "image", pellet1RightHall));
    backgrounds.push(new component(0, 0, "#000", 0, 0, "image", camOverlay));
    staticCam.push(new component(0, 0, "#000", 0, 0, "image", staticEffect1));
    mapRender.push(new component(0, 0, "#000", 250, 180, "image", mapPic));
    camButton.push(new component(0, 0, "#000", 50, 430, "image", camButtonPic));
    camButtonDetect.push(new component(403, 60, "rgba(255,255,255,0)", 50, 430, "camButton"));
    // buttons.push(new component(30, 30, "#fff", 460, 200, "active"));
    texts.push(new component("15px", "PressStart2P", "white", 20, 40, "text", "Power:"+power+"%"));
    texts.push(new component("20px", "PressStart2P", "white", 370, 40, "text", time+" AM"));
    texts.push(new component("15px", "PressStart2P", "white", 20, 70, "text", "Usage:"));
    usageBlocks.push(new component(15, 30, "rgba(0,0,0,0)", 120, 45, "usage1"));
    usageBlocks.push(new component(15, 30, "rgba(0,0,0,0)", 140, 45, "usage2"));
    usageBlocks.push(new component(15, 30, "rgba(0,0,0,0)", 160, 45, "usage3"));
    usageBlocks.push(new component(15, 30, "rgba(0,0,0,0)", 180, 45, "usage4"));
    usageBlocks.push(new component(15, 30, "rgba(0,0,0,0)", 200, 45, "usage5"));
    usageBlocks.push(new component(15, 30, "rgba(0,0,0,0)", 220, 45, "usage6"));
    texts.push(new component("15px", "PressStart2P", "white", 370, 60, "text", "Night 1"));

    buttons.push(new component(50, 30, "rgba(100,100,100,1)", 220, 220, "cam1"));
    texts.push(new component("10px", "PressStart2P", "white", 225, 240, "text", "CAM1"));
    buttons.push(new component(50, 30, "rgba(100,100,100,1)", 250, 280, "cam2"));
    texts.push(new component("10px", "PressStart2P", "white", 255, 300, "text", "CAM2"));
    buttons.push(new component(50, 30, "rgba(100,100,100,1)", 300, 350, "cam3"));
    texts.push(new component("10px", "PressStart2P", "white", 305, 370, "text", "CAM3"));
    buttons.push(new component(50, 30, "rgba(100,100,100,1)", 350, 320, "cam4"));
    texts.push(new component("10px", "PressStart2P", "white", 355, 340, "text", "CAM4"));
    buttons.push(new component(50, 30, "#69B331", 435, 350, "cam5"));
    texts.push(new component("10px", "PressStart2P", "white", 440, 370, "text", "CAM5"));
    texts.push(new component("10px", "PressStart2P", "white", 353, 400, "text", "YOU"));
    console.log("Right Hall Rendered");
    if (muteOn == true) {
      buttons.push(new component(80, 50, "rgba(255, 108, 248, 0.5)", 210, 5, "mute"))
      texts.push(new component("15px", "PressStart2P", "#FFADF8", 220, 38, "text", "Mute"))
    }
  }
}

function doorLight(n) {
  if (n == 1) {
    if (door1Light == false) {
      door1Light = true
      doors[0].color = "#333";
      usage = usage + 1;
      light.play();
    }
    else if (door1Light == true) {
      door1Light = false
      doors[0].color = "#000"
      usage = usage - 1;
      light.pause();
      light.currentTime = 0;
    }
    window.setTimeout(function() {
      if (door1Light == true) {
        door1Light = false
        doors[0].color = "#000"
        usage = usage - 1;
        light.pause();
        light.currentTime = 0;
      }
    }, 2000);
  }
  else if (n == 2) {
    door2Light = true
    doors[1].color = "#333";
  }
  else if (n == 3) {
    door2Light = false
    doors[1].color = "#000"
  }
  else if (n == 4) {
    if (door3Light == false) {
      door3Light = true
      usage = usage + 1;
      light.play()
      doors[2].color = "#333";
    }
    else if (door3Light == true) {
      door3Light = false
      doors[2].color = "#000"
      usage = usage - 1;
      light.pause();
      light.currentTime = 0;
    }
    window.setTimeout(function() {
      if (door3Light == true) {
        door3Light = false
        doors[2].color = "#000"
        usage = usage - 1;
        light.pause();
        light.currentTime = 0;
      }
    }, 2000);
  }
}
function doorClose(n) {
  if (n == 1) {
    if (door1Close == false) {
      door1Close = true;
      doorCovers[0].color = "#5F0000";
      usage = usage + 1;
      garageClose.currentTime = 0;
      garageClose.play()
    }
    else if (door1Close == true) {
      door1Close = false;
      doorCovers[0].color = "rgba(0,0,0,0)";
      usage = usage - 1;
      garageOpen.currentTime = 0;
      garageOpen.play()
    }
  }
  else if (n == 2) {
    if (door2Close == false) {
      door2Close = true;
      doorCovers[1].color = "#5F0000";
      usage = usage + 1;
      garageClose.currentTime = 0;
      garageClose.play()
    }
    else if (door2Close == true) {
      door2Close = false;
      doorCovers[1].color = "rgba(0,0,0,0)";
      usage = usage - 1;
      garageOpen.currentTime = 0;
      garageOpen.play()
    }
  }
  else if (n == 3) {
    if (door3Close == false) {
      door3Close = true;
      doorCovers[2].color = "#5F0000";
      usage = usage + 1;
      garageClose.currentTime = 0;
      garageClose.play()
    }
    else if (door3Close == true) {
      door3Close = false;
      doorCovers[2].color = "rgba(0,0,0,0)";
      usage = usage - 1;
      garageOpen.currentTime = 0;
      garageOpen.play()
    }
  }
}

function switchCameraState(n) {
  if (n == 1) {
    console.log("Camera Up Rendered");
    cameraState = true;
    usage = usage + 1;
    console.log(currentCam);
    if (currentCam == roomStateID[4]) {
      switchRoomState(roomStateID[4]);
    }
    else if (currentCam == roomStateID[6]) {
      switchRoomState(roomStateID[6]);
    }
    else if (currentCam == roomStateID[7]) {
      switchRoomState(roomStateID[7]);
    }
    else if (currentCam == roomStateID[8]) {
      switchRoomState(roomStateID[8]);
    }
    else if (currentCam == roomStateID[9]) {
      switchRoomState(roomStateID[9]);
    }
    // console.log("Camera State: "+cameraState);
  }
  else if (n == 0) {
    console.log("Camera Down Rendered");
    cameraState = false;
    usage = usage - 1;
    switchRoomState(roomStateID[2]);
  }
}

function changeTime() {
  if (time == 12) {
    time = 1;
    console.log(time+ " AM");
    if (state != roomStateID[5]) {
      texts[1].text = time+" AM";
    }
  }
  else if (time == 1) {
    time = 2;
    console.log(time+ " AM");
    if (state != roomStateID[5]) {
      texts[1].text = time+" AM";
    }
  }
  else if (time == 2) {
    time = 3;
    console.log(time+ " AM");
    if (state != roomStateID[5]) {
      texts[1].text = time+" AM";
    }
  }
  else if (time == 3) {
    time = 4;
    console.log(time+ " AM");
    if (state != roomStateID[5]) {
      texts[1].text = time+" AM";
    }
  }
  else if (time == 4) {
    time = 5;
    console.log(time+ " AM");
    if (state != roomStateID[5]) {
      texts[1].text = time+" AM";
    }
  }
  else if (time == 5) {
    time = 6;
    console.log(time+ " AM");
    if (state != roomStateID[5]) {
      texts[1].text = time+" AM";
    }
    switchRoomState(roomStateID[3]);
  }
}

document.onkeydown = checkKey;
document.onkeyup = stopKey;

function checkKey(e) {
    key = e || window.event;
    if (key.keyCode == '17') {
      if (state == roomStateID[2]) {
        doorLight(2);
      }
    }

}

function stopKey(e) {
    key = e || window.event;
   if (key.keyCode == '17') {
     if (state == roomStateID[2]) {
       doorLight(3);
     }
    }
}

start.onclick = function() {
  dead = false
  startGame()
}
