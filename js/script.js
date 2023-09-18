const musicPlayer = document.getElementById('music-player');
const audio = document.getElementById('audio');
// Song Info
const songTitle = document.getElementById('song-title');
const songImage = document.getElementById('song-image');

// Duration
const durationContainer = document.getElementById('duration-container');
const currentTimeShow = document.getElementById('current-time');
const totalDuration = document.getElementById('total-duration');

// Action Buttons
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const repeatBtn = document.getElementById('repeat');

// Volume
const volumeBarWrapper = document.getElementById('volume-bar-wrapper');
const volumeBar = document.getElementById('volume-bar');
const volumeBtn = document.getElementById('volume-btn');

// Progress
const progressWrapper = document.getElementById('progress-wrapper');
const progress = document.getElementById('progress');

const songs = ['Değirmenler', 'Kağıttan Kaptanlar', 'Şarkıcının Şarkısı'];

let initialSongIndex = 1;

const loadSong = () => {
    const song = songs[initialSongIndex];
    audio.src = `music/${song}.mp3`;
    songImage.src = `images/${song}.jpg`;
    songTitle.innerText = song;
    audio.volume = 0.5;
};

const playSong = () => {
    musicPlayer.classList.add('play');
    playBtn.querySelector('i.fa-solid').classList.add('fa-pause');
    playBtn.querySelector('i.fa-solid').classList.remove('fa-play');
    audio.play();
};
const pauseSong = () => {
    musicPlayer.classList.remove('play');
    playBtn.querySelector('i.fa-solid').classList.add('fa-play');
    playBtn.querySelector('i.fa-solid').classList.remove('fa-pause');
    durationContainer.classList.remove('show');
    audio.pause();
};

const playPause = () => {
    if (musicPlayer.classList.contains('play')) {
        pauseSong();
    } else {
        playSong();
        setTimeout(() => {
            durationContainer.classList.add('show');
        }, 300);
    }
};

const prevNext = (e) => {
    if (e.currentTarget.id === 'next') {
        initialSongIndex = (initialSongIndex + 1) % songs.length;
    } else {
        initialSongIndex = (initialSongIndex - 1 + songs.length) % songs.length;
    }
    loadSong();
    playSong();
    showDurationContainer();
};

const repeatSong = () => {
    if (repeatBtn.classList.contains('repeat')) {
        repeatBtn.classList.remove('repeat');
    } else {
        repeatBtn.classList.add('repeat');
    }
};
const handleAudio = () => {
    const { duration, currentTime } = audio;

    if (duration) {
        const durationMinutes = Math.floor(duration / 60);
        const durationSeconds = Math.floor(duration % 60);

        const currentMinutes = Math.floor(currentTime / 60);
        const currentSeconds = Math.floor(currentTime % 60);

        const formattedDuration = `${durationMinutes}:${
            durationSeconds < 10 ? '0' : ''
        }${durationSeconds} `;

        const formattedCurrentTime = `${currentMinutes}:${
            currentSeconds < 10 ? '0' : ''
        }${currentSeconds} `;

        totalDuration.innerText = formattedDuration;
        currentTimeShow.innerText = formattedCurrentTime;
        progress.style.width = `${(currentTime / duration) * 100}%`;

        if (duration === currentTime) {
            if (repeatBtn.classList.contains('repeat')) {
                showDurationContainer();
            } else {
                nextBtn.click();
            }
        }
    }
};

const showVolume = () => {
    if (volumeBarWrapper.classList.contains('show')) {
        volumeBarWrapper.classList.remove('show');
    } else {
        volumeBarWrapper.classList.add('show');
    }
};

const hideVolume = (e) => {
    if (!volumeBarWrapper.contains(e.target) && !volumeBtn.contains(e.target)) {
        volumeBarWrapper.classList.remove('show');
    }
};

const volume = (e) => {
    const height = e.currentTarget.clientHeight;
    const clientY = e.offsetY;
    volumeBar.style.height = `${(clientY / height) * 100}%`;
    audio.volume = clientY / height;
};

const updateProgress = (e) => {
    const width = e.currentTarget.clientWidth;
    const clickX = e.offsetX;
    audio.currentTime = (clickX / width) * audio.duration;
    progress.style.width = `${(clickX / width) * 100}%`;
};

const showDurationContainer = () => {
    durationContainer.classList.remove('show');
    setTimeout(() => {
        durationContainer.classList.add('show');
        playSong();
    }, 500);
};

// Event Listeners
window.addEventListener('DOMContentLoaded', loadSong);
window.addEventListener('click', hideVolume);
playBtn.addEventListener('click', playPause);
prevBtn.addEventListener('click', prevNext);
nextBtn.addEventListener('click', prevNext);
repeatBtn.addEventListener('click', repeatSong);

audio.addEventListener('timeupdate', handleAudio);
volumeBtn.addEventListener('click', showVolume);
volumeBarWrapper.addEventListener('click', volume);
progressWrapper.addEventListener('click', updateProgress);
