document.addEventListener("DOMContentLoaded", () => {

  const song = {
    title: "Versace on the Floor",
    preview: "https://wartendd.github.io/BrunoBeats/Votf.mp3"
  };

  const audio = new Audio(song.preview);

  const clipLengths = [0.5, 1, 2.5, 5, 30];
  let attempt = 0;
  let gameOver = false;

  const playBtn = document.getElementById("playBtn");
  const skipBtn = document.getElementById("skipBtn");
  const guessBtn = document.getElementById("guessBtn");
  const guessInput = document.getElementById("guessInput");
  const message = document.getElementById("message");

  playBtn.addEventListener("click", () => {
    if (gameOver) return;

    audio.pause();
    audio.currentTime = 0;
    audio.play().then(() => {
      setTimeout(() => {
        audio.pause();
      }, clipLengths[attempt] * 1000);
    });
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
        message.textContent = `Out of tries! The song was "${song.title}"`;
        gameOver = true;
      } else {
        message.textContent = "Wrong! Try a longer clip…";
      }
    }

    guessInput.value = "";
  });

  skipBtn.addEventListener("click", () => {
    if (gameOver) return;

    attempt++;
    if (attempt >= clipLengths.length) {
      message.textContent = `Out of tries! The song was "${song.title}"`;
      gameOver = true;
    } else {
      message.textContent = "Skipped! Next clip is longer.";
    }
  });

});
