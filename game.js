var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var toggle=true;
$(document).keypress(function(event){
  if(toggle)
  {
    nextSequence();
    toggle=false;
  }
});
$('.btn').click(function() {
  // console.log('You clicked button with ID:' + this.id);
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  // console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);


});
function nextSequence() {
  var randomNumber = Math.floor((Math.random() * 4));
  level += 1;
  $("#level-title").text("Level "+level);
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
