const masterPlay = document.getElementById('masterPlay');
const previous = document.getElementById('previous');
const next = document.getElementById('next');
const progressBar = document.getElementById('myProgressBar');
const masterSongName = document.getElementById('masterSongName');
const audioElement = new Audio('1.mp3');

const song = [
  { song: "I wish i knew", filepath: "1.mp3", cover: "cover1.jpg" },
  { song: "Can't hide", filepath: "2.mp3", cover: "cover2.jpg" },
  { song: "Silver waves", filepath: "3.mp3", cover: "cover3.jpg" },
  { song: "Dusk 'til dawn", filepath: "4.mp3", cover: "cover4.jpg" },
  { song: "Read all over", filepath: "5.mp3", cover: "cover5.jpg" },
  { song: "Fingerprints", filepath: "6.mp3", cover: "cover6.jpg" },
];

let currentSongIndex = 0;

function playSong(index) {
  audioElement.src = song[index].filepath;
  audioElement.currentTime = 0;
  audioElement.play();
  masterSongName.innerText = song[index].song;
  masterPlay.classList.remove('fa-play-circle');
  masterPlay.classList.add('fa-pause-circle');
}

function init() {
  masterSongName.innerText = song[currentSongIndex].song;

  masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime == 0) {
      audioElement.play();
      masterPlay.classList.remove("fa-play-circle");
      masterPlay.classList.add("fa-pause-circle");
    } else {
      audioElement.pause();
      masterPlay.classList.remove("fa-pause-circle");
      masterPlay.classList.add("fa-play-circle");
    }
  });

  audioElement.addEventListener('timeupdate', () => {
    progress = parseInt(audioElement.currentTime / audioElement.duration * 100);
    progressBar.value = progress;
  });

  progressBar.addEventListener('change', () => {
    audioElement.currentTime = progressBar.value * audioElement.duration / 100;
  });

  Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
      const index = parseInt(e.target.closest('.songItemPlay').id);
      playSong(index);
      currentSongIndex = index;
    });
  });

  previous.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + song.length) % song.length;
    playSong(currentSongIndex);
  });

  next.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % song.length;
    playSong(currentSongIndex);
  });
}

document.getElementById('Home').addEventListener('click', () => {
  window.location.href = "index.html"
});

init();
