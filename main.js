//word or phrase to be solved
var phrase = "I LOVE JAVASCRIPT";
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
      blank.addClass("blank-letter")
      blank.html(letters[i])
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
    var link = $("<a></a>").addClass("letter")
    $(link).attr("href","#")
    $(".alphabet").append(link)
    $(link).text(letter)
  }
}
createPuzzle(phrase);
createLetters();
createAlphabet();

//when a letter of the alphabet is clicked:
$("a").click(grayedOut)
  //make the letter in the alphabet grayed out
function grayedOut(){
  $(this).css("color", "lightgray")
  for (var i = 0; i < letters.length; i++) {
    if ($(this).text() == letters[i]) {
      test();
    }
  }
}
  //if the letter clicked is included in the phrase:
    //make the letter in the phrase appear
  //if the letter clicked is NOT included in the phrase:
    //add next piece of the skeleton
function test(){
  $("body").css("background","green")
}
