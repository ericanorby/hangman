// $(document).ready(function(){

//object of categories that player gets to choose from

var categories = {
  songs: ["twinkle twinkle little star","what a wonderful world","smells like teen spirit","all you need is love","rolling in the deep","hotel california","cry me a river","stairway to heaven","wonderwall","somewhere over the rainbow"],
  food: ["chicken pot pie","cheeseburger","cheese pizza","meatball sub","fettucine alfredo","taco salad","potato casserole","omelette","chicken noodle soup","coconut shrimp"],
  colors: ["chartreuse","camouflage green","burnt sienna","lavender","cerulean","crimson","sky blue","fuchsia","magenta","turquoise"],
  countries: ["guatemala","indonesia","australia","mozambique","sierra leone","switzerland","zimbabwe","ireland","germany","south korea"]
}

var chosen;
var phrase;
var letters;
var score = 6;
var lettersCompleted = 0;
var imageNumber = 0;
var streak = 0;
var cumulative = 0;

var images = [];
images[0] = "images/hangman1.png";
images[1] = "images/hangman2.png";
images[2] = "images/hangman3.png";
images[3] = "images/hangman4.png";
images[4] = "images/hangman5.png";
images[5] = "images/hangman6.png";
images[6] = "images/hangman7.png";

//splits phrase into an array
function createArray(){
  letters = phrase.toUpperCase().split('');
}

//create blank letters for each word
function createLetters(){
  var word = $("<div></div>").addClass("word")
  $("#letter-board").append(word)
  for (var i = 0; i < letters.length; i++){
    var blank = $("<div></div>").addClass("blank-letter")
    if (letters[i] != ' ') {
      $(word).append(blank)
    } else {
      var space = $("<div></div>")
      $("#letter-board").append(space)
      blank.css("border","none")
      $(space).append(blank)
      var word = $("<div></div>").addClass("word")
      $("#letter-board").append(word)
      lettersCompleted++
    }
  }
}

//create the alphabet board
function createAlphabet(){
  var alphabet = [];
  var letter;
  for (var i = 65; i < 91; i++) {
    letter = String.fromCharCode(i);
    alphabet.push(letter);
    var link = $("<a></a>").addClass("letter")
    $(link).attr("href","#")
    $(".alphabet").append(link)
    $(link).text(letter)
  }
}

//when a letter is clicked on
function guessedLetter(){
  event.preventDefault();
  //make the letter in the alphabet grayed out
  $(this).css("color", "lightgray")
  $(this).css("pointer-events","none")
  //if the letter clicked is included in the phrase:
    //make the letter in the phrase appear
  if (letters.indexOf($(this).text()) !== -1) {
    for (var i = 0; i <= letters.length; i++) {
      if (letters[i] == $(this).text()) {
        $(".blank-letter").eq(i).html(letters[i])
        lettersCompleted++
      }
    }
    setTimeout(winGame, 500);

  }
  //if the letter clicked is NOT included in the phrase:
    //add next piece of the skeleton
  else {
    changeImage();
    decreaseScore();
    setTimeout(loseGame, 500);
  }
}

createAlphabet();

//if player guesses incorrectly, subtract from score
function decreaseScore(){
  if (score > 0) {
    score--;
    $("#score").text(score)
  }
}

//if player loses, show notification
function loseGame(){
  if (imageNumber >= 6) {
    imageNumber = 0;
    $(".letter").css("pointer-events","none")
    $(".notification").html("<p>YOU LOSE!</p>")
    $(".notification p").css({"color":"red",
                            "font-size":"50px"})
    setTimeout(playAgain, 1000)
    streak = 0;
    $("#streak").text(streak)
    cumulative = 0;
    $("#cumulative").text(cumulative)
    fillInPuzzle();
  }
}

var x = 0;

function fillInPuzzle(){
  if (x < letters.length) {
    $(".blank-letter").eq(x).html(letters[x])
    setTimeout(fillInPuzzle, 80);
    x++
  }
}

//if player wins, show notification
function winGame(){
  if (lettersCompleted == letters.length){
    $(".notification").html("<p>YOU WIN!</p>")
    $(".notification p").css({"color":"green",
                            "font-size":"50px"})
    setTimeout(playAgain, 1000)
    streak++
    $("#streak").text(streak)
    cumulative = cumulative + score;
    $("#cumulative").text(cumulative)
  }
}

//ask if user wants to play again
function playAgain(){
  $(".notification").append("<p>play again?</p>")
}

//cycles through images when player guesses a wrong letter
function changeImage(){
  imageNumber++
  $(".hangman > img").attr("src", images[imageNumber])
}

//if "instructions" is clicked, make panel appear
$(".instructions").one("click",showInstructions)
//if "categories" is hovered over, make panel appear
$(".categories").one("click", showCategories)

function hideInstructions(){
  event.preventDefault()
  $("#instructions-panel").animate({
    height: "-=150px"
  })
  $("#instructions-panel").empty()
  $(".instructions").one("click", showInstructions)
}

function showInstructions(){
  event.preventDefault()
  $("#instructions-panel").animate({
    height: "+=150px"
  })
  $("#instructions-panel").html("<p>Guess a letter. If you guess incorrectly, your score will decrease and a piece of the skeleton will appear. If your score reaches zero, you lose!</p>")
  $(".instructions").one("click", hideInstructions)
}

function hideCategories(){
  event.preventDefault()
  $("#categories-panel").animate({
    height: "-=200px"
  })
  // $("#categories-panel").css("display","none")
  $("#categories-panel > a").css("display","none")
  $(".categories").one("click", showCategories)
}

function showCategories(){
  event.preventDefault()
  $("#categories-panel").animate({
    height: "+=200px"
  })
  // $("#categories-panel").css("display","block")
  $("#categories-panel > a").css("display","block")
  // $("#categories-panel > a").attr("href","#")
  $(".categories").one("click", hideCategories)
}

//if a category is clicked, begin a new puzzle with a random phrase from chosen category
$("#categories-panel > a").click(startGame)

function startGame(){
  reset();
  //create variable to pick a random number from 0-9
  var random = Math.floor(Math.random() * 10);
  // console.log(`${score} score on reset`);
  // above: ES6. same as console.log(score + " score on reset"));
  $(".notification").html("<p></p>")
  chosen = $(this).text()
  phrase = categories[chosen][random]
  createArray(phrase);
  createLetters();
  hideCategories();
  $(".letter").css("color", "black")
  $(".letter").css("pointer-events","auto")
}

//reset board and scores if new game is selected
function reset(){
  lettersCompleted = 0;
  imageNumber = 0;
  score = 6;
  x = 0;
  $("#score").text(score)
  $(".hangman > img").attr("src", images[imageNumber])
  $("#letter-board").empty()
}

//when a letter of the alphabet is clicked:
$(".letter").click(guessedLetter)

// });
