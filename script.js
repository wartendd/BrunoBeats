document.addEventListener("DOMContentLoaded", () => {
  // Define the song
  const song = {
    title: "Versace on the Floor",
    preview: "https://wartendd.github.io/BrunoBeats/Votf.mp3"
  };

  // Create audio object
  const audio = new Audio(song.preview);

  // Clip lengths in seconds
  const clipLengths = [0.5, 1, 2.5, 5, 30];
  let attempt = 0;

  // Connect buttons
  const playBtn = document.getElementById("playBtn");
  const guessBtn = document.getElementById("guessBtn");
  const guessInput = document.getElementById("guessInput");
  const message = document.getElementById("message");

  // Play clip button
  playBtn.addEventListener("click", () => {
    // Force user interaction
    audio.pause();
    audio.currentTime = 0;
    audio.play().then(() => {
      // Pause after clip length
      setTimeout(() => audio.pause(), clipLengths[attempt] * 1000);
    }).catch(err => {
      console.log("Audio play error:", err);
      message.textContent = "Cannot play audio. Try refreshing the page.";
    });
  });

  // Guess button
  guessBtn.addEventListener("click", () => {
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
  });
});
