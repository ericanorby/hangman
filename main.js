// $(document).ready(function(){
var categories = {
  songs: ["twinkle twinkle little star","what a wonderful world","smells like teen spirit","all you need is love","rolling in the deep","hotel california","cry me a river","stairway to heaven","wonderwall","somewhere over the rainbow"],
  food: ["chicken pot pie","cheeseburger","cheese pizza","meatball sub","fettucine alfredo","taco salad","potato casserole","omelette","chicken noodle soup","coconut shrimp"],
  colors: ["chartreuse","camouflage green","burnt sienna","lavender","cerulean","crimson","sky blue","fuchsia","magenta","turquoise"],
  countries: ["guatemala","indonesia","australia","mozambique","sierra leone","switzerland","zimbabwe","ireland","germany","south korea"]
}

var lettersCompleted = 0;

//word or phrase to be solved
var random = Math.floor(Math.random() * 10);
// var phrase = categories.songs[random];
// var chosen;
var phrase;
var letters;

//splits phrase into an array
function createArray(){

  letters = phrase.toUpperCase().split('');
  console.log(letters);
  letters.push(' ');
}

//create blank letters for each word
function createLetters(){
  var word = $("<div></div>").addClass("word")
  $("#letter-board").append(word)
  for (var i = 0; i < letters.length; i++){
    var blank = $("<div></div>").addClass("blank-letter")
    if (letters[i] != ' ') {
      blank.html(letters[i])
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

function guessedLetter(){
  event.preventDefault();
  //make the letter in the alphabet grayed out
  $(this).css("color", "lightgray")
  $(this).removeAttr("href")
  $(this).css("pointer-events","none")
  //if the letter clicked is included in the phrase:
    //make the letter in the phrase appear
  if (letters.indexOf($(this).text()) !== -1) {
    for (var i = 0; i <= letters.length; i++) {
      var chosenLetter = letters.indexOf($(this).text(), i)
      $(".blank-letter").eq(chosenLetter).css("color","black")
      // console.log('chosen Letter ---' + chosenLetter)
      // console.log($(".blank-letter").eq(chosenLetter));
      // console.log('these letters---' + letters[i])
      if (letters[i] == $(this).text()) {
        lettersCompleted++
      }
    }
    setTimeout(winGame, 800);

  }
  //if the letter clicked is NOT included in the phrase:
    //add next piece of the skeleton
  else {
    changeImage();
    decreaseScore();
    setTimeout(loseGame, 800);
  }
}

// createArray(phrase);

createAlphabet();

var score = 6;

//if player guesses incorrectly, subtract from score
function decreaseScore(){
  if (score > 0) {
    score--;
    $("span").text(score)
  }
}

//if player loses, show notification
function loseGame(){
  if (imageNumber == 6) {
    imageNumber = 0;
    $(".notification").text('YOU LOSE!')
    $(".notification").css("color","red")
  }
}

//if player wins, show notification
function winGame(){
  if (lettersCompleted == letters.length){
    $(".notification").text('YOU WIN!')
    $(".notification").css("color","green")
  }
}

//when a letter of the alphabet is clicked:
$(".letter").click(guessedLetter)

var images = [];
images[0] = "images/hangman1.png";
images[1] = "images/hangman2.png";
images[2] = "images/hangman3.png";
images[3] = "images/hangman4.png";
images[4] = "images/hangman5.png";
images[5] = "images/hangman6.png";
images[6] = "images/hangman7.png";

var imageNumber = 0;

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
    height: "-=250px"
  })
  $("#categories-panel > a").css("display","none")
  $(".categories").one("click", showCategories)
}

function showCategories(){
  event.preventDefault()
  $("#categories-panel").animate({
    height: "+=250px"
  })
  $("#categories-panel > a").css("display","block")
  // $("#categories-panel > a").attr("href","#")
  $(".categories").one("click", hideCategories)
}

//if a category is clicked, begin a new puzzle with a random phrase from chosen category
$("#categories-panel > a").click(startGame)

function startGame(){
  reset();
  var chosen = $(this).text()
  phrase = categories[chosen][random]  
  createArray(phrase);
  createLetters();
  //collapse categories panel
  hideCategories();
}

//reset board and scores if new game is selected
function reset(){
  lettersCompleted = 0;
  imageNumber = 0;
  score = 6;
  $("#letter-board").empty()
}




// });
