var video=document.querySelector('.video');
var juice=document.querySelector('.orange-juice');

var btnPlay=document.getElementById('play');
var btnPause=document.getElementById('pause');

const fullscreen = document.querySelector('.c-video');


function togglePlayPause() {
    if (video.paused) {
        btnPause.className = 'pause';
        
        btnPause.style.display = "block 10s";
        btnPlay.style.display = "none";

        video.play();

    } else {
        btnPlay.className = 'play';

        btnPause.style.display = "none";
        btnPlay.style.display = "block";

        video.pause();
    }
}

fullscreen.onclick = function() {
   togglePlayPause();
}

video.addEventListener ("timeupdate", function() {
    var juicePos = video.currentTime / video.duration;
    juice.style.width = juicePos * 100 + "%";
    if (video.ended) {
        btn.className = 'play';
    }
});
