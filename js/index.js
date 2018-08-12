var rooms = ['Bedroom','MainArea','LeftHall','MiddleHall','RightHall','Office']
var seconds= 0
var moveTime= 0
var phase = 1
var roomIn = rooms[0]
var alive = true

var doorL = false
var doorM = false
var doorR = false

function startGame() {
  setInterval(main, 100);
}

function main() {
  if(alive == true){
    // console.log("---")
    // console.log(seconds+"seconds")
    // console.log("phase"+phase)

    if (moveTime==11){
      if (roomIn==rooms[0]){
          if (phase==1){
              console.log("1) Phase was"+phase)
              phase = 2
              console.log("2) Phase is"+phase)
              document.getElementById('dotB2').setAttribute('class', 'active')
              document.getElementById('dotB1').setAttribute('class', 'inactive')
          }
          else if (phase==2){
              roomIn=rooms[1]
              phase = 1
              document.getElementById('dotMA1').setAttribute('class', 'active')
              document.getElementById('dotB2').setAttribute('class', 'inactive')
          }
        }
      else if (roomIn==rooms[1]) {
          if (phase==1){
            var randomNum = Math.floor((Math.random() * 3) + 2);
            roomIn=rooms[randomNum]
            phase = 1
            if (roomIn == rooms[2])
              document.getElementById('dotLH1').setAttribute('class', 'active')
            else if (roomIn == rooms[3])
              document.getElementById('dotMH1').setAttribute('class', 'active')
            else if (roomIn == rooms[4])
              document.getElementById('dotRH1').setAttribute('class', 'active')
            document.getElementById('dotMA1').setAttribute('class', 'inactive')
          }
      }
      else if (roomIn==rooms[2]){
        if (phase==1){
            console.log("1) Phase was"+phase)
            phase = 2
            console.log("2) Phase is"+phase)
            document.getElementById('dotLH2').setAttribute('class', 'active')
            document.getElementById('dotLH1').setAttribute('class', 'inactive')
          }
        else if (phase==2){
            console.log("1) Phase was"+phase)
            phase = 3
            console.log("2) Phase is"+phase)
            document.getElementById('dotLH3').setAttribute('class', 'active')
            document.getElementById('dotLH2').setAttribute('class', 'inactive')
          }
        else if (phase==3){
            console.log("1) Phase was"+phase)
            phase = 4
            console.log("2) Phase is"+phase)
            document.getElementById('dotLH4').setAttribute('class', 'active')
            document.getElementById('dotLH3').setAttribute('class', 'inactive')
          }
        else if (phase==4){
            if (doorL == false) {
              roomIn=rooms[5]
              phase = 1
              document.getElementById('dotO1').setAttribute('class', 'active')
              document.getElementById('dotLH4').setAttribute('class', 'inactive')
            }
            else if (doorL == true){
              roomIn=rooms[0]
              phase = 1
              document.getElementById('dotB1').setAttribute('class', 'active')
              document.getElementById('dotLH4').setAttribute('class', 'inactive')
            }
          }
      }
      else if (roomIn==rooms[3]){
        if (phase==1){
            console.log("1) Phase was"+phase)
            phase = 2
            console.log("2) Phase is"+phase)
            document.getElementById('dotMH2').setAttribute('class', 'active')
            document.getElementById('dotMH1').setAttribute('class', 'inactive')
          }
        else if (phase==2){
            console.log("1) Phase was"+phase)
            phase = 3
            console.log("2) Phase is"+phase)
            document.getElementById('dotMH3').setAttribute('class', 'active')
            document.getElementById('dotMH2').setAttribute('class', 'inactive')
          }
        else if (phase==3){
          if (doorM == false) {
            roomIn=rooms[5]
            phase = 1
            document.getElementById('dotO1').setAttribute('class', 'active')
            document.getElementById('dotMH3').setAttribute('class', 'inactive')
          }
          else if (doorM == true){
            roomIn=rooms[0]
            phase = 1
            document.getElementById('dotB1').setAttribute('class', 'active')
            document.getElementById('dotMH3').setAttribute('class', 'inactive')
          }
          }
      }
      else if (roomIn==rooms[4]){
        if (phase==1){
            console.log("1) Phase was"+phase)
            phase = 2
            console.log("2) Phase is"+phase)
            document.getElementById('dotRH2').setAttribute('class', 'active')
            document.getElementById('dotRH1').setAttribute('class', 'inactive')
          }
        else if (phase==2){
            console.log("1) Phase was"+phase)
            phase = 3
            console.log("2) Phase is"+phase)
            document.getElementById('dotRH3').setAttribute('class', 'active')
            document.getElementById('dotRH2').setAttribute('class', 'inactive')
          }
        else if (phase==3){
            console.log("1) Phase was"+phase)
            phase = 4
            console.log("2) Phase is"+phase)
            document.getElementById('dotRH4').setAttribute('class', 'active')
            document.getElementById('dotRH3').setAttribute('class', 'inactive')
          }
        else if (phase==4){
          if (doorR == false) {
            roomIn=rooms[5]
            phase = 1
            document.getElementById('dotO1').setAttribute('class', 'active')
            document.getElementById('dotRH4').setAttribute('class', 'inactive')
          }
          else if (doorR == true){
            roomIn=rooms[0]
            phase = 1
            document.getElementById('dotB1').setAttribute('class', 'active')
            document.getElementById('dotRH4').setAttribute('class', 'inactive')
          }
          }
      }
      if (roomIn==rooms[5]){
          console.log("You are dead. Not big suprise.")
          alive = false
      }

      console.log("Is in",roomIn)
      moveTime=0
    }

    seconds=seconds+1
    moveTime=moveTime+1
  }
}

var start = document.getElementById('start');
var btn1 = document.getElementById('btn1');
var btn2 = document.getElementById('btn2');
var btn3 = document.getElementById('btn3');
var door1 = document.getElementById('door1');
var door2 = document.getElementById('door2');
var door3 = document.getElementById('door3');

btn1.onclick = function() {
  if (alive == true) {
    if (doorL == false) {
      doorL = true
      door1.style.backgroundColor = '#f00';
      doorM = false
      door2.style.backgroundColor = '#fff';
      doorR = false
      door3.style.backgroundColor = '#fff';
      btn1.style.backgroundColor = '#0f0';
      btn2.style.backgroundColor = '#b00';
      btn3.style.backgroundColor = '#b00';
      console.log("Left "+doorL);
    }
    else if (doorL == true) {
      doorL = false
      door1.style.backgroundColor = '#fff';
      btn1.style.backgroundColor = '#b00';
      console.log("Left "+doorL);
    }
  }
}
btn2.onclick = function() {
  if (alive == true) {
    if (doorM == false) {
      doorM = true
      door2.style.backgroundColor = '#f00';
      doorL = false
      door1.style.backgroundColor = '#fff';
      doorR = false
      door3.style.backgroundColor = '#fff';
      btn1.style.backgroundColor = '#b00';
      btn2.style.backgroundColor = '#0f0';
      btn3.style.backgroundColor = '#b00';
      console.log("Middle "+doorM);
    }
    else if (doorM == true) {
      doorM = false
      door2.style.backgroundColor = '#fff';
      btn2.style.backgroundColor = '#b00';
      console.log("Middle "+doorM);
    }
  }
}
btn3.onclick = function() {
  if (alive == true) {
    if (doorR == false) {
      doorR = true
      door3.style.backgroundColor = '#f00';
      doorM = false
      door2.style.backgroundColor = '#fff';
      doorL = false
      door1.style.backgroundColor = '#fff';
      btn1.style.backgroundColor = '#b00';
      btn2.style.backgroundColor = '#b00';
      btn3.style.backgroundColor = '#0f0';
      console.log("Right "+doorR);
    }
    else if (doorR == true) {
      doorR = false
      door3.style.backgroundColor = '#fff';
      btn3.style.backgroundColor = '#b00';
      console.log("Right "+doorR);
    }
  }
}
start.onclick = function() {
  startGame()
}
