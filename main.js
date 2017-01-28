//word or phrase to be solved
var phrase = "test phrase";
var letters;

//splits phrase into an array
function createPuzzle(phrase){
  letters = phrase.split('');
}

//create blank letters for each word
function createLetters(){
  var word = $("<div></div>").addClass("word")
  $("#letter-board").append(word)
  for (var i = 0; i < letters.length; i++){
    var blank = $("<div></div>")
    if (letters[i] != ' ') {
      blank.addClass("blank-letter");
      $(word).append(blank)
    } else {
      var space = $("<div></div>")
      $("#letter-board").append(space)
      blank.addClass("empty-value");
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
    var div = $("<div></div>").addClass("letter")
    $(".alphabet").append(div)
    $(div).html(letter)
  }
}

createPuzzle(phrase);
createLetters();
createAlphabet();
