document.addEventListener("DOMContentLoaded", () => {

  const song = {
    title: "Versace on the Floor",
    preview: "https://wartendd.github.io/BrunoBeats/Votf.mp3"
  };

  const clipLengths = [0.5, 1, 2.5];
  const audio = new Audio(song.preview);

  const playBtn = document.getElementById("playBtn");
  const skipBtn = document.getElementById("skipBtn");
  const message = document.getElementById("message");
  const inputs = Array.from(document.querySelectorAll(".guessInput"));
  const submitButtons = Array.from(document.querySelectorAll(".submitBtn"));

  let currentAttempt = 0;
  let gameOver = false;

  function playClip() {
    if (gameOver) return;
    audio.pause();
    audio.currentTime = 0;
    audio.play().then(() => {
      setTimeout(() => audio.pause(), clipLengths[currentAttempt] * 1000);
    });
  }

  playBtn.addEventListener("click", () => {
    playClip();
  });

  skipBtn.addEventListener("click", () => {
    if (gameOver) return;

    // Mark current input as Skipped
    inputs[currentAttempt].value = "Skipped";
    inputs[currentAttempt].disabled = true;
    submitButtons[currentAttempt].disabled = true;

    // Move to next attempt
    currentAttempt++;

    if (currentAttempt >= clipLengths.length) {
      message.textContent = `Out of tries! The song was "${song.title}" 🎵`;
      gameOver = true;
      return;
    }

    // Enable next input and focus
    inputs[currentAttempt].disabled = false;
    submitButtons[currentAttempt].disabled = false;
    inputs[currentAttempt].focus();
  });

  submitButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      if (gameOver) return;

      const guess = inputs[index].value.toLowerCase().trim();

      if (guess === song.title.toLowerCase()) {
        message.textContent = `Correct! You got it in ${index + 1} tries 🎉`;
        gameOver = true;
        return;
      } else {
        // Mark as wrong visually
        inputs[index].classList.add("wrong");

        // Disable current input and button
        inputs[index].disabled = true;
        btn.disabled = true;

        // Move to next attempt
        currentAttempt++;

        if (currentAttempt >= clipLengths.length) {
          message.textContent = `Out of tries! The song was "${song.title}" 🎵`;
          gameOver = true;
          return;
        }

        // Enable next input and focus
        inputs[currentAttempt].disabled = false;
        submitButtons[currentAttempt].disabled = false;
        inputs[currentAttempt].focus();
      }
    });
  });

  // Initially focus the first input
  inputs[0].focus();

});
