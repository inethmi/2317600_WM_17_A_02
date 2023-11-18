let randWord1 = "";         //variable to store the random word selected for the player 1
let randWord2 = "";         //variable to store the random word selected for the player 2
let guessedLetters_1 = [];  //array to store correct letters of player 1
let guessedLetters_2 = [];  //array to store correct letters of player 2
let wrongLetters_1 = [];    //array to store incorrect letters of player 1
let wrongLetters_2 = [];    //array to store incorrect letters of player 2
let wrongLetters = [];      //array to store incorrect letters in the function common to both player 1 and 2
let guessedLetters=[];      //array to store correct letters in the function common to both player 1 and 2
let currentPlayer = 1;      //at the begining currentPlayer is player 1 and it will be toggled
let word = "";              //variable to store the random world in the function which is common to both players
let inputs = "";            //common variable for both players to store inputs_1 and inputs_2 things
let typingInputs = "";      //common variable for both players to store typingInputs1 and typingInputs2 things
let wrong_letters = "";     //common variable for both players to store wrong_letters1 and wrong_letters2 things



/*returned element which matched with the given css selector is assigned to a variable for the future use;if we wanted to set a different inner text or to change the inner html we can access them through these variables*/
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
const diceRolling = document.querySelector(".dice");



//function for getting a random word for player 1
function randomWord1(){
  let ranObj1 = wordList[Math.floor(Math.random() * wordList.length)]; //getting random object from word list
  randWord1 = ranObj1.word; //getting only the word of random object {word:...... , hint:........}
  console.log(randWord1); //displaying the random word selected on the console

  hint1.innerText = ranObj1.hint; //displaying the related hint for the random word selected as the inner text

//displaying input boxes according to the word length of the random word
  let str = "";

  for (let i = 0; i < randWord1.length; i++) {
    str += '<input type="text" disabled></input>';  //if the length of the random word is 5, 5 disabled input boxes will be created
  }
  inputs_1.innerHTML  = str;

}




//function for getting a random word for player 2
function randomWord2(){
  let ranObj2 = wordList[Math.floor(Math.random() * wordList.length)]; //getting random object from word list
  randWord2 = ranObj2.word; //getting only word of random object {word:...... , hint:........}
  console.log(randWord2); //displaying the random word selected on the console

  hint2.innerText = ranObj2.hint;   //displaying the related hint for the random word selected as the inner text

//displaying input boxes according to the word length of the random word - (calling generateInputBoxes function)
  let str = "";

  for (let i = 0; i < randWord2.length; i++) {
    str += '<input type="text" disabled ></input>'; //if the length of the random word is 5, 5 disabled input boxes will be created
  }
  inputs_2.innerHTML  = str;

}


//rolling the dice to get a random number from 1-6 - (declaring a function)
function RollDice(){
   
  diceRolling.setAttribute("src" ,"rolling.gif" );     //updating attributes
  //statements inside the setTimeout function will be delayed for 2.5s
  setTimeout(() => {
    const diceResult = Math.floor(Math.random() * 6) + 1; //assigning randomly selected dice number
    console.log(diceResult);
    diceRolling.setAttribute('src' , 'dice'+diceResult+'.png'); //again updating the attributes
    
    if(diceResult == 1 || diceResult == 6 || diceResult == 5){
      if(currentPlayer == 1){
        word = randWord1;
        inputs = inputs_1;
        typingInputs = typingInputs1;
        wrongLetters = wrongLetters_1;
        wrong_letters = wrong_letters1;
        guessedLetters=guessedLetters_1;
        
        //calling the handleInputs() whenever user give an input through typing Input box
        typingInputs.addEventListener("input" , handleInputs);
        //automatically focusing input when user press any key
        document.addEventListener("keydown" , () => typingInputs1.focus());
        
  
      }else if (currentPlayer == 2){
  
        word = randWord2;
        inputs = inputs_2;
        typingInputs = typingInputs2;
        wrongLetters = wrongLetters_2;
        wrong_letters = wrong_letters2;
        guessedLetters = guessedLetters_2;

        //calling the handleInputs() whenever user give an input through typing Input box
        typingInputs.addEventListener("input" , handleInputs);
        //automatically focusing input when user press any key
        document.addEventListener("keydown" , () => typingInputs2.focus());

        
      }
      

    }else{

      //if it is not 1,5 or 6, delay the player switchingfor 0.7s
      setTimeout(() => {
        diceRolling.setAttribute("src" ,"mainDice.png" );
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
      // validate data :  entered key should be alphabetical not numeric
      if(key.match(/^[A-Za-z]+$/) && !wrongLetters.includes(key) && !guessedLetters.includes(key)){
        console.log(key);
        if(word.includes(key)){
          //if the entered letter found in the random word
          console.log("letter found");
          //lets show the found letter in inputs
          for (let i = 0; i < word.length; i++) {
            if(word[i] === key){
              inputs.querySelectorAll("input")[i].value = key;//displaying the guessed letter in the relavant box
              guessedLetters.push(key);//pushing the guessed letter (key) to the guessed letters array
              setTimeout(() => {
                if(guessedLetters.length===word.length){
              //if the length of the guessed letters array is equals to the length of the random word, player who set the letter will be win;
                  diceRolling.setAttribute("src" ,"mainDice.png" );
                  currentPlayer = currentPlayer === 1 ? 2 : 1;
                  container_1.classList.toggle("player-active");
                  container_2.classList.toggle("player-active"); //switching the players again to set the winning player as the current player
                  alert('player ' + currentPlayer + ' wins'); 
                
              }
            }, 700);
            
            //switching players
              diceRolling.setAttribute("src" ,"mainDice.png" );
              currentPlayer = currentPlayer === 1 ? 2 : 1;
              container_1.classList.toggle("player-active");
              container_2.classList.toggle("player-active"); 



            }
            
          }

        }else{
          //if the user entered letter is not found in the random word,
          console.log("letter not found");
          wrongLetters.push(key);
          diceRolling.setAttribute("src" ,"mainDice.png" );
          currentPlayer = currentPlayer === 1 ? 2 : 1;
          container_1.classList.toggle("player-active");
          container_2.classList.toggle("player-active");

        }

      }else{
        if(wrongLetters.includes(key)){
          alert("you have guessed that letter before and its wrong. Input another Letter");
        }

        else if(guessedLetters.includes(key)){
          alert("You have already guessed that letter correctly. Try another Letter");
        }

        else{
          alert("Please enter an alphabetic character")
        }
      }
      
      //displaying the incorrect lettors entered by the user in the relvant space reserved for wrong letters
      wrong_letters.innerText = wrongLetters;
      //lets empty typing input box again
      typingInputs.value = "";


    }


  





//calling these 2 functions to appear the random words on the interface whenevr its loaded
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
