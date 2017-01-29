//word or phrase to be solved
var phrase = "A COW JUMPED OVER THE MOON";
var letters;

//splits phrase into an array
function createPuzzle(phrase){
  letters = phrase.split('');
  letters.push(' ');
}

//create blank letters for each word
function createLetters(){
  var word = $("<div></div>").addClass("word")
  $("#letter-board").append(word)
  for (var i = 0; i < letters.length; i++){
    var blank = $("<div></div>")
    if (letters[i] != ' ') {
      blank.addClass("blank-letter")
      blank.html(letters[i])
      $(word).append(blank)
    } else {
      var space = $("<div></div>")
      $("#letter-board").append(space)
      blank.addClass("blank-letter")
      blank.css("border","none")
      $(space).append(blank)
      var word = $("<div></div>").addClass("word")
      $("#letter-board").append(word)
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
  //make the letter in the alphabet grayed out
  $(this).css("color", "rgb(239, 243, 249)")
  //if the letter clicked is included in the phrase:
    //make the letter in the phrase appear
  if (letters.indexOf($(this).text()) != -1) {
    for (var i = 0; i < letters.length; i++) {
      var chosenLetter = letters.indexOf($(this).text(), i)
      $(".blank-letter").eq(chosenLetter).css("color","black")
    }
  }
  //if the letter clicked is NOT included in the phrase:
    //add next piece of the skeleton
  else {
    changeImage();
    setTimeout(loseGame, 1000);
  }

}

createPuzzle(phrase);
createLetters();
createAlphabet();


function loseGame(){
  if (imageNumber == 6) {
    imageNumber = 0;
    $(".notification").text('YOU LOSE!')
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
  $("img").attr("src", images[imageNumber])
}

function test(){
  $("body").css("background","green")
}
