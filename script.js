document.addEventListener("DOMContentLoaded", () => {

  const song = {
    title: "Versace on the Floor",
    preview: "https://wartendd.github.io/BrunoBeats/Votf.mp3"
  };

  const audio = new Audio(song.preview);

  // Only three attempts: 0.5s, 1s, 2.5s
  const clipLengths = [0.5, 1, 2.5];
  let attempt = 0;
  let gameOver = false;

  const playBtn = document.getElementById("playBtn");
  const skipBtn = document.getElementById("skipBtn");
  const guessBtn = document.getElementById("guessBtn");
  const guessInput = document.getElementById("guessInput");
  const message = document.getElementById("message");

  function playClip() {
    audio.pause();
    audio.currentTime = 0;
    audio.play().then(() => {
      setTimeout(() => audio.pause(), clipLengths[attempt] * 1000);
    });
  }

  playBtn.addEventListener("click", () => {
    if (gameOver) return;
    playClip();
  });

  skipBtn.addEventListener("click", () => {
    if (gameOver) return;

    attempt++;

    if (attempt >= clipLengths.length) {
      message.textContent = `Out of tries! The song was "${song.title}" 🎵`;
      gameOver = true;
      return;
    }

    message.textContent = "Skipped! Here's a longer clip…";
    playClip();
  });

  guessBtn.addEventListener("click", () => {
    if (gameOver) return;

    const guess = guessInput.value.toLowerCase().trim();

    if (guess === song.title.toLowerCase()) {
      message.textContent = `Correct! You got it in ${attempt + 1} tries 🎉`;
      gameOver = true;
    } else {
      attempt++;

      if (attempt >= clipLengths.length) {
        message.textContent = `Out of tries! The song was "${song.title}" 🎵`;
        gameOver = true;
      } else {
        message.textContent = "Wrong! Try a longer clip…";
        playClip();
      }
    }

    guessInput.value = "";
  });

});
