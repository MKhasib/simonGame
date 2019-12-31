var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var toggle=true;
var time=1;
$(document).keypress(function(event){
  if(toggle)
  {
    nextSequence();
    toggle=false;
  }
});
$('.btn').click(function() {
  // console.log('You clicked button with ID:' + this.id);
  if(!toggle)
{  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
  // console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
}

});
function checkAnswer(currentLevel){
if(userClickedPattern[currentLevel]===gamePattern[currentLevel])
{
if(userClickedPattern.length==gamePattern.length)
{
  startSequence();
  setTimeout(function(){nextSequence();},(time++)*2000);
userClickedPattern=[];
}
else
{

}
}
else
{
playSound("wrong");
$("body").addClass("game-over");
$("#level-title").text("Game Over, Press Any Key to Restart");

setTimeout(function() {
  $("body").removeClass("game-over");;
}, 200);
gamePattern=[];
userClickedPattern=[];
level=0;
toggle=true;
}
}
function startSequence(){
for(let i=0;i<gamePattern.length;i++)
{
  setTimeout(function timer(){  var clickedButton = $("#" + gamePattern[i]);
    clickedButton.fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(gamePattern[i]);},2000);

}
}
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
