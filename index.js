let randWord1 = "";
let randWord2 = "";
let guessedLetters_1 = [];
let guessedLetters_2 = [];
let wrongLetters_1 = [];
let wrongLetters_2 = [];
let wrongLetters = [];
let guessedLetters=[];
let currentPlayer = 1;
let word = "";
let inputs = "";
let typingInputs = "";
let wrong_letters = "";

const hint1 = document.querySelector(".hintP1 span");
const hint2 = document.querySelector(".hintP2 span");
const wrong_letters1 = document.querySelector(".wrongLettersP1 span");
const wrong_letters2 = document.querySelector(".wrongLettersP2 span");
const inputs_1 = document.querySelector("#inputs1")
const inputs_2 = document.querySelector("#inputs2");
const resetBtn = document.querySelector("#btn_reset"); 
const rollTheDice = document.querySelector("#btn_roll");
const typingInputs1 = document.querySelector(".typing-input1");
const typingInputs2 = document.querySelector(".typing-input2");
const container_1 = document.querySelector("#player1_container");
const container_2 = document.querySelector("#player2_container");



//function for getting a random word for player 1
function randomWord1(){
  let ranObj1 = wordList[Math.floor(Math.random() * wordList.length)]; //getting random object from word list
  randWord1 = ranObj1.word; //getting only word of random object
  console.log(randWord1);

  hint1.innerText = ranObj1.hint;

//displaying input boxes according to the word length of the random word - (calling generateInputBoxes function)
  let str = "";

  for (let i = 0; i < randWord1.length; i++) {
    str += '<input type="text" disabled></input>';
  }
  inputs_1.innerHTML  = str;

}



//function for getting a random word for player 2
function randomWord2(){
  let ranObj2 = wordList[Math.floor(Math.random() * wordList.length)]; //getting random object from word list
  randWord2 = ranObj2.word; //getting only word of random object
  console.log(randWord2);

  hint2.innerText = ranObj2.hint;

//displaying input boxes according to the word length of the random word - (calling generateInputBoxes function)
  let str = "";

  for (let i = 0; i < randWord2.length; i++) {
    str += '<input type="text" disabled ></input>';
  }
  inputs_2.innerHTML  = str;

}


//rolling the dice to get a random number from 1-6 - (declaring a function)
function RollDice(){
  let diceRolling = document.querySelector(".dice");
  diceRolling.setAttribute("src" ,"rolling.gif" );

  setTimeout(() => {
    const diceResult = Math.floor(Math.random() * 6) + 1;
    console.log(diceResult);
    diceRolling.setAttribute('src' , 'dice'+diceResult+'.png');
    
    if(diceResult == 1 || diceResult == 6){
      if(currentPlayer == 1){
        word = randWord1;
        inputs = inputs_1;
        typingInputs = typingInputs1;
        wrongLetters = wrongLetters_1;
        wrong_letters = wrong_letters1;
        guessedLetters=guessedLetters_1;

        typingInputs.addEventListener("input" , handleInputs);
        //automatically focusing input when user press any key
        document.addEventListener("keydown" , () => typingInputs1.focus());
        
        for (let i = 0; i < randWord1.length; i++) {
          
          if(guessedLetters_1===randWord1){
            alert('player 1 wins')
          
          }
          
        }
        
  
      }else if (currentPlayer == 2){
  
        word = randWord2;
        inputs = inputs_2;
        typingInputs = typingInputs2;
        wrongLetters = wrongLetters_2;
        wrong_letters = wrong_letters2;
        guessedLetters = guessedLetters_2;

        typingInputs.addEventListener("input" , handleInputs);
        //automatically focusing input when user press any key
        document.addEventListener("keydown" , () => typingInputs2.focus());
        if(guessedLetters_2===randWord2){
          alert('player 2 wins')
          
        }
        
      }
      
     // currentPlayer = currentPlayer === 1 ? 2 : 1;
      //container_1.classList.toggle("player-active");
     // container_2.classList.toggle("player-active");

    }else{

      setTimeout(() => {
        currentPlayer = currentPlayer === 1 ? 2 : 1;
        container_1.classList.toggle("player-active");
        container_2.classList.toggle("player-active");

      },700);

    }


  },2500);


}


     //function to handle user inputs
     function handleInputs(e){
      let key = e.target.value.toLowerCase();
      // validate data :  entered key alphabetical not numeric
      if(key.match(/^[A-Za-z]+$/) && !wrongLetters.includes(key)){
        console.log(key);
        if(word.includes(key)){
          //if the entered letter found in the random word
          console.log("letter found");
          //lets show the found letter in inputs
          for (let i = 0; i < word.length; i++) {
            if(word[i] === key){
              inputs.querySelectorAll("input")[i].value = key;
              guessedLetters.push(key);
              currentPlayer = currentPlayer === 1 ? 2 : 1;
              container_1.classList.toggle("player-active");
              container_2.classList.toggle("player-active");



            }
            
          }

        }else{
          console.log("letter not found");
          wrongLetters.push(key);
          currentPlayer = currentPlayer === 1 ? 2 : 1;
          container_1.classList.toggle("player-active");
          container_2.classList.toggle("player-active");

        }

      }
    
      wrong_letters.innerText = wrongLetters;
      //lets empty typing input box again
      typingInputs.value = "";

    }


  






randomWord1();
randomWord2();



//for reset button
resetBtn.addEventListener("click" , function(){
  window.location.reload();
  randomWord1();
  randomWord2();

});

//roll the dice
rollTheDice.addEventListener("click" , function(){
  RollDice();

});
