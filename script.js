const player = document.querySelector('#player');
const video = player.querySelector('.video_player');
const progress = player.querySelector('.current_progress');
const progressBar = player.querySelector('.progress_bar');
const playButton = player.querySelector('.togglePlay');
const audio = player.querySelector('.play_slider');
const skipButtons = player.querySelectorAll('[data-skip]');
const fullscreenButton = player.querySelector('.fullscreen');

function togglePlay(){  //Toggles whether video is playing
  if(video.paused){
    video.play();
  }else {
    video.pause();
  }
}

function updateButton(){  //Toggles button according to whether video is playing
  if(video.paused){
    playButton.textContent = '❚ ❚';
  }else{
    playButton.textContent = '►';
  }
}

function skip(){      //Allows to skip time by given value
  video.currentTime += parseFloat(this.dataset.skip);
}

function changeVolume(){    //Volume changed according to bar
  video.volume = this.value;
}

function barProgress(){ //Bar changed according to time
  const percent = (video.currentTime/video.duration)*100;
  progress.style.width = `${percent}%`
}

function scrub(e){ //Slide progress bar according to what time you want to go to

  const percent = (e.offsetX/progressBar.offsetWidth);
  video.currentTime = parseFloat(video.duration * percent);


}

// Find the right method, call on correct element
function launchIntoFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

// Whack fullscreen
function exitFullscreen() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

function toggleFullscreen(){
  if (!window.screenTop && !window.screenY) {
    exitFullscreen();
    fullscreenButton.textContent= "+";
  }else{
    launchIntoFullscreen(player);
    fullscreenButton.textContent= "-";
  }
}


document.onload =updateButton();  //Check if playing or not at beginning

video.addEventListener('click',togglePlay);  //Play if video is clicked
video.addEventListener('play',updateButton); //Update button if video is playing
video.addEventListener('pause',updateButton); //Update button if video is paused
video.addEventListener('timeupdate',barProgress); //Update bar if video changes

playButton.addEventListener('click',togglePlay);  //press play button to play
skipButtons.forEach(button=>button.addEventListener('click',skip)); //For each time buttons, go skip function
audio.addEventListener('mousemove',changeVolume);  //If mouse is moved over volume bar, change volume
fullscreenButton.addEventListener('click',toggleFullscreen);

let mousedown = false;
progressBar.addEventListener('mousemove',(e) => mousedown && scrub(e));
progressBar.addEventListener('mousedown', ()=>mousedown = true);
progressBar.addEventListener('mouseup', ()=>mousedown = false);
