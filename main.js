var phrase = "test phrase";
var letters;

function createPuzzle(phrase){
  letters = phrase.split('');
}

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

createPuzzle(phrase);

createLetters();
