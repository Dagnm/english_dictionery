const inputEl = document.getElementById("input");
const infoTextEl = document.getElementById("info-text");
const meaningContainerEl = document.getElementById("meaning-container");
const wordGiven = document.getElementById("title");
const meaning = document.getElementById("meaning");
const audioSource = document.getElementById("audio");

async function fetchAPI(word) {
  try {
    infoTextEl.style.display = "block";
    meaningContainerEl.style.display = "none";

    infoTextEl.innerText = `searching the meaning  of "${word}"`;
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const result = await fetch(url).then((res) => res.json());

    if (result.title) {
      meaningContainerEl.style.display = "block";
      infoTextEl.style.display = "none";

      wordGiven.innerText = word;
      meaning.innerText = "N/A";
      audioSource.style.display = "none";
    } else {
      infoTextEl.style.display = "none";
      meaningContainerEl.style.display = "block";
      audioSource.style.display='inline-flex';
      wordGiven.innerText = result[0].word;
      meaning.innerText = result[0].meanings[0].definitions[0].definition;
    }

    audioSource.src = result[0].phonetics[1].audio;
  } catch (error) {
    
    infoTextEl.innerText=`an error happen tray again latter`;
  }
}

inputEl.addEventListener("keyup", (e) => {
  if (e.target.value && e.key === "Enter") {
    fetchAPI(e.target.value);
  }
});
