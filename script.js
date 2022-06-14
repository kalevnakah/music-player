// Header Info and Button
const switchBtn = document.getElementById('switch-album');
const albumTitle = document.getElementById('album-title');

//Album Image and Songs
const albumImage = document.getElementById('album-img');
const songList = document.getElementById('song-list');

//album Menu and Player
const albumMenu = document.getElementById('album-menu');
const albumPlayer = document.getElementById('album');

// HTML Audio Controls
const musicControls = document.getElementById('music-controls');
const playPause = document.getElementById('play-pause');
const progressBar = document.getElementById('progress-bar');
const progressBox = document.getElementById('progress-box');
const songTitle = document.getElementById('song-title');
const audioTag = document.getElementById('audio');

// Album List
const albums = [
  'The Baumann Brothers',
  'Old Yet New',
  'Close To You',
  'Christmas',
];

// Albums
const TheBaumannBrothers = [
  '01 He Called You',
  '02 God Knew Your Name',
  '03 Heaven',
  '04 Still the One',
  '05 Keep The Son In Your Eyes',
  '06 My Life is in Your Hands',
  '07 I Saw Her Standing There',
  '08 Alleluia',
  '09 He Has Forgiven Me',
  '10 It is Well with My Soul',
  '11 Stand In Awe',
  '12 The Gentle Healer',
  "13 There's Something About That Name",
  '14 Now I Lay Me Down To Sleep',
  '15 Now the Day is Over',
];
const OldYetNew = [
  "01 This Time I'm In It For You",
  '02 Young Love',
  '03 The Three Bells',
  '04 Roll on Mississippi',
  '05 Tonight You Belong to Me',
  '06 Return to Sender',
  '07 Lightning Express',
  '08 Elenore',
  '09 Day After Day (country)',
  '10 All I Have to Do is Dream',
  '11 Build Me Up Buttercup',
  '12 Mr. Lonely',
  '13 The Lion Sleeps Tonight',
  '14 Come Go With Me',
  '15 Beautiful Brown Eyes',
  '16 Day After Day Rock',
];
const CloseToYou = [
  '01 Close To You',
  '02 Have a Little Faith',
  '03 The Greatest Day in My Life',
  "04 Lovin' Family",
  '05 Make It Shine',
  '06 He Carried the Cross',
  '07 Healing Love',
  '08 I Wanna Live For You',
  "09 I Couldn't Live Without You Now",
  "10 Ain't Gonna Tear Down You and Me",
  '11 Surrender',
  '12 The Greatest Day in My Life (A Cappella Version)',
];
const Christmas = [
  '01 The Christmas Song (Chestnuts Roasting on an Open Fire)',
  '02 Silent Night',
  '03 Ring, Christmas Bells',
  '04 A Child in a Barren Land',
  '05 The First Noel',
  '06 Lullay, Thou Little Tiny Child',
  '07 Let There Be Peace on Earth',
  '08 O Holy Night',
  '09 White Christmas',
  '10 Lo, How A Rose',
  "11 Christmas Can't Be Far Away",
  "12 I'll Be Home for Christmas",
  '13 Silver Bells',
  '14 Merry Christmas Darling',
  '15 Away in a Manger',
];

// Convert album name to Array variable
function convertToVariable(album) {
  const arrVar1 = album.replace(/\s+/g, '');
  const arrVarEval1 = eval(arrVar1);
  return arrVarEval1;
}

// Currently Selected Album & Song
let albumCurrent = albums[0];
let songCurrent = convertToVariable(albumCurrent)[0];

// Load Album Art into Menu
function initAlbums() {
  albumMenu.innerHTML = '';
  albums.forEach((album) => {
    let imgTag = document.createElement('img');
    imgTag.src = `images/${album}.jpg`;
    imgTag.alt = `Album Cover Art - '${album}'`;
    imgTag.id = `${album}`;
    albumMenu.appendChild(imgTag);
  });
  loadSong(songCurrent);
}

// Load selected album into the player and hide album select menu
function loadAlbum(album) {
  albumCurrent = album;
  albumTitle.innerHTML = `${album}`;
  albumImage.src = `images/${album}.jpg`;

  songList.innerHTML = '';

  // Create song list
  const albumArr = convertToVariable(album);
  albumArr.forEach((song) => {
    let songTag = document.createElement('li');
    songTag.innerHTML = `${song}`;
    songList.appendChild(songTag);
  });

  // Listen for song to selected
  for (var song of document.querySelectorAll('#song-list li')) {
    song.addEventListener('click', (e) => {
      loadSong(e.target.innerHTML);
      playSong();
    });
  }

  // Switch to album player view
  albumMenu.classList.add('hide-view');
  albumPlayer.classList.remove('hide-view');
  switchBtn.style.visibility = 'visible';
}

// Switch to album selection view
function switchAlbum() {
  albumMenu.classList.remove('hide-view');
  albumPlayer.classList.add('hide-view');
  switchBtn.style.visibility = 'hidden';
}

function loadSong(song) {
  songTitle.innerHTML = '';
  songTitle.innerHTML = `${song}`;
  audioTag.src = `music/${albumCurrent}/${song}.mp3`;
  songCurrent = song;
}

function playSong() {
  musicControls.classList.add('playing');
  playPause.querySelector('i.fa').classList.remove('fa-play');
  playPause.querySelector('i.fa').classList.add('fa-pause');
  audioTag.play();
}

function pauseSong() {
  musicControls.classList.remove('playing');
  playPause.querySelector('i.fa').classList.remove('fa-pause');
  playPause.querySelector('i.fa').classList.add('fa-play');
  audioTag.pause();
}

function updateProgress(e) {
  const { duration, currentTime } = e.target;
  const percentProgress = (currentTime / duration) * 100;
  progressBar.style.width = `${percentProgress}%`;
}

function setProgress(e) {
  const clickX = e.offsetX;
  const progressWidth = this.clientWidth;
  const duration = audioTag.duration;

  audioTag.currentTime = (clickX / progressWidth) * duration;
}

function playNextSong() {
  const albumArr = convertToVariable(albumCurrent);
  let songIndex = albumArr.findIndex((song) => song === songCurrent);
  if (songIndex < albumArr.length - 1) {
    songIndex++;
    loadSong(albumArr[songIndex]);
    playSong();
  } else {
    songIndex = 0;
    loadSong(albumArr[songIndex]);
    playSong();
  }
}

initAlbums();

// Listen for album to be selected
for (var img of document.querySelectorAll('#album-menu img')) {
  img.addEventListener('click', (e) => {
    loadAlbum(e.target.id);
  });
}

// Listen for play/pause button to be pressed
playPause.addEventListener('click', () => {
  const isPlaying = musicControls.classList.contains('playing');
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Listen for progress bar click
progressBox.addEventListener('click', setProgress);

// Update progress bar with audio
audioTag.addEventListener('timeupdate', updateProgress);

// Listen for Switch button clicked to change the view;
switchBtn.addEventListener('click', switchAlbum);

audioTag.addEventListener('ended', playNextSong);
