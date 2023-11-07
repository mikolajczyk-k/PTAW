var result = document.getElementById("result")
var beatButton = document.getElementById("beatButton")

const timeSigButtons = document.querySelectorAll(".timeSig");
const precisionButtons = document.querySelectorAll(".precision");

count = 0;
let currentCircle = 1;



beatButton.value = "Click here to start";
result.textContent = "0"
var firstBeat;
var lastBeat;
var thisBeat;
var active = false;
var beatArr = [];
let inactivityTimer;

var precisionValue = 4;
var timeSigValue = 4;


timeSigButtons.forEach((radio) => { //sprawia, że przyciski timeSig zachowują się jak radiobutton
    radio.addEventListener("click", () => {
        timeSigButtons.forEach((r) => r.classList.remove("selected"));
        radio.classList.add("selected");
        timeSigValue = radio.getAttribute("data-value"); //przechwytuje wartosc zanacznonej opcji

        if(timeSigValue==4){
          for(var i = 1; i <=4; i++){
          document.getElementById(`circle${i}`).classList.remove('hidden');
        }
      }

        if(timeSigValue==3){
          for(var i = 1; i <=4; i++){
            document.getElementById(`circle${i}`).classList.remove('hidden');
          }
          document.getElementById(`circle${4}`).classList.add('hidden');
        }

        if(timeSigValue==1){
          for(var i = 1; i <=4; i++){
            document.getElementById(`circle${i}`).classList.add('hidden');
          }
          document.getElementById(`circle${1}`).classList.remove('hidden');

        }
    });
});



precisionButtons.forEach((radio) => { //sprawia, że przyciski timeSig zachowują się jak radiobutton
    radio.addEventListener("click", () => {
        precisionButtons.forEach((r) => r.classList.remove("selected"));
        radio.classList.add("selected");
         precisionValue = radio.getAttribute("data-value"); //przechwytuje wartosc zanacznonej opcji
    });
});


function beatCalc() {
    if (active==false){
        beatButton.value = "Tap";
        active=true;
    }
    else{
            if(count == 0){
                firstBeat = performance.now(); //pierwszy beat
            }

            else if(count == 1){
                thisBeat = performance.now(); //drugi beat
                elapsed = 60000/(thisBeat - firstBeat); //odstep w bpm
                beatArr.unshift(elapsed);
                result.textContent = elapsed.toPrecision(precisionValue);
            }
            else{
                lastBeat = thisBeat; 
                thisBeat = performance.now(); //kazdy kolejny beat
                elapsed = 60000/(thisBeat - lastBeat);
                beatArr.unshift(elapsed);
                bpm = calculateAvg(beatArr);
                result.textContent = bpm.toPrecision(precisionValue);
            }
    
    fillCircle()
    count+=1;
    }
}

function fillCircle(){ 

    if(timeSigValue==4){
    for (let i = 1; i <= 4; i++) {
      document.getElementById(`circle${i}`).classList.remove('filled');
    }
    document.getElementById(`circle${currentCircle}`).classList.add('filled');
  
    currentCircle = (currentCircle % 4) + 1;
    }

    if(timeSigValue==3){
        for (let i = 1; i <= 3; i++) {
            document.getElementById(`circle${i}`).classList.remove('filled');
          }
          document.getElementById(`circle${currentCircle}`).classList.add('filled');
        
          currentCircle = (currentCircle % 3) + 1;
    }

    if(timeSigValue==1){
        if(document.getElementById(`circle${1}`).classList.contains('filled')){
            document.getElementById(`circle${1}`).classList.remove('filled');
        }
        else{
            document.getElementById(`circle${1}`).classList.add('filled');
        }

    }
  }

  beatButton.addEventListener("click", event => beatCalc()) // czyta czy zostal klikniety button
  document.addEventListener("keydown", event =>{ //to smao tylko ze spacja
    if(event.code === " "){beatCalc()}
    })

function calculateAvg(arr){ //oblicza srednia wartosc bpm z ostatnich 10 uderzen
    let sum = 0;
    let numberOfElements = Math.min(arr.length, 20);

    for(i=0; i<numberOfElements;i++){
        sum+=arr[i];
    }
    var average =sum / numberOfElements;
    return average;
}

function reset(){
    count = 0;
    for (let i = 1; i <= 4; i++) {
        document.getElementById(`circle${i}`).classList.remove('filled');
      }
    currentCircle = 1;
    beatButton.value = "Click here to start";
    result.textContent = "0"
    active = false;
    beatArr = [];
}

function resetTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(reset, 1500); 
  }


document.addEventListener("keydown", resetTimer);
beatButton.addEventListener("click", resetTimer);


