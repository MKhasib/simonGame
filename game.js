var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var pressAnyKey = true;
var time = 2;
var anserIsTrue = true;
$(document).keypress(function(event) {
  if (pressAnyKey) {
    anserIsTrue = true;
    nextSequence();
    pressAnyKey = false;
  }
});
$('.btn').click(function() {
  // console.log('You clicked button with ID:' + this.id);
  if (!pressAnyKey) {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
    // console.log(userClickedPattern);
    if (anserIsTrue) {
      playSound(userChosenColour);
      animatePress(userChosenColour);
    }
  }

});

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length == gamePattern.length) {
      for (let i = 0; i < gamePattern.length; i++) {
        startSequence(gamePattern[i], i + 1);
      }
      setTimeout(function() {
        nextSequence();
      }, (time++) * 1000);
      userClickedPattern = [];
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function() {
      $("body").removeClass("game-over");;
    }, 200);
    startOver();
    anserIsTrue = false;

  }
}

function startSequence(pattern, i) {

  setTimeout(function() {
    var clickedButton = $("#" + pattern);
    clickedButton.fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(pattern);
  }, 1000 * i);


}

function startOver() {
  gamePattern = [];
  userClickedPattern = [];
  level = 0;
  pressAnyKey = true;
}

function nextSequence() {
  var randomNumber = Math.floor((Math.random() * 4));
  level += 1;
  $("#level-title").text("Level " + level);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  var clickedButton = $("#" + randomChosenColour);
  clickedButton.fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");

  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");;
  }, 100);

}
