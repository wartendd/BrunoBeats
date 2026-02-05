// Step 1: Define a song
const song = {
  title: "Versace on the Floor",  // Song name
  preview: "https://wartendd.github.io/BrunoBeats/Votf.mp3"
};

// Step 2: Create an audio object
const audio = new Audio(song.preview);

// Step 3: Set clip lengths (seconds)
const clipLengths = [0.5, 1, 2.5, 5, 30]; // progressively longer clips
let attempt = 0;

// Step 4: Connect buttons
const playBtn = document.getElementById("playBtn");
const guessBtn = document.getElementById("guessBtn");
const guessInput = document.getElementById("guessInput");
const message = document.getElementById("message");

// Play clip button
playBtn.onclick = () => {
  audio.currentTime = 0;         // start at beginning
  audio.play();
  setTimeout(() => audio.pause(), clipLengths[attempt] * 1000); // stop after clip
};

// Guess button
guessBtn.onclick = () => {
  const guess = guessInput.value.toLowerCase();

  if (guess === song.title.toLowerCase()) {
    message.textContent = `Correct! You got it in ${attempt + 1} tries 🎉`;
  } else {
    attempt++;
    if (attempt >= clipLengths.length) {
      message.textContent = `Out of tries! The song was "${song.title}"`;
    } else {
      message.textContent = `Nope! Next clip will be longer…`;
    }
  }
};