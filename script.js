const button = document.getElementById("button");
const audioElement = document.getElementById("audio");
const quoteText = document.getElementById("quote");
const quoteContainer = document.getElementById("quote_container");

// Disable quote text box on page load
window.onload = function () {
  // quoteContainer.style.display = "none";
};

// Disable/Enable Button
function toggleButton() {
  button.disabled = !button.disabled;
  quoteContainer.style.display = "block";
}

// VoiceRSS Speech Function
function tellMe(joke) {
  const jokeString = joke.trim().replace(/ /g, "%20");
  // VoiceRSS Speech Parameters
  VoiceRSS.speech({
    key: "dbf55db5566c492088c233728c5f14ce",
    src: jokeString,
    hl: "en-us",
    v: "mary",
    r: 1,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// Get jokes from Joke API
async function getJokes() {
  let joke = "";
  const apiUrl = "https://v2.jokeapi.dev/joke/Any";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    // Assign One or Two Part Joke
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    console.log(joke);
    quoteText.innerText = joke;
    // Passing Joke to VoiceRSS API
    tellMe(joke);
    // Disable Button
    toggleButton();
  } catch (error) {
    // Catch Error Here
  }
}

// Event Listeners
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toggleButton);
