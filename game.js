var gamePattern = [];
var userPattern = [];
var buttonColors = ["green", "blue", "red", "yellow"]
var started = false;
var level = 0;

function playSound(key) {
  var audio = new Audio("sounds/" + key + ".mp3");
  audio.play();
};

function animatePress(key) {
  $("#" + key).addClass("pressed");
  setTimeout(function() {
    $("#" + key).removeClass("pressed")
  }, 100)
};

function nextSequence() {
  $("h1").text("level " + level);
  var next = Math.floor(Math.random() * 3);
  var nextColor = buttonColors[next];
  playSound(nextColor);
  $("#"+nextColor).fadeIn().fadeOut().fadeIn();
  gamePattern.push(nextColor);
};

function reset(){
  gamePattern = [];
  userPattern = [];
  started = false;
  level = 0;

}

function gameOver(){
  $("h1").text("Game Over, Press Any Key to Restart");
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function() {
  $("body").removeClass("game-over")}, 100)
  reset()
}

function checkAnswer() {
  for (var i = 0; i < userPattern.length; i++) {
    if (userPattern[i] === gamePattern[i]) {
      continue;
    } else {
      gameOver()
      return;
    }
  }
  if (userPattern.length === gamePattern.length) {
    userPattern = [];
    setTimeout(nextSequence, 1000);
    level++;
  }
}

$(document).keypress(function() {
  if (!started) {
    setTimeout(nextSequence, 400);
    started = true;
  }
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id")
  playSound(userChosenColour);
  animatePress(userChosenColour);
  userPattern.push(userChosenColour);
  console.log(gamePattern);
  console.log(userPattern);
  checkAnswer();

});
