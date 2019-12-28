let NUM_LIVES = 5;

const startButton = document.getElementsByClassName("btn__reset")[0];
const startDiv = document.getElementById("overlay");
startButton.addEventListener("click", () => {
  startDiv.style.display = "none";
});

// parent div of hearts
const heartDiv = document.getElementById("scoreboard");
appendHearts(heartDiv, NUM_LIVES);

const phraseDiv = document.getElementById("phrase");
const wholePhrase = phrases[Math.floor(Math.random() * phrases.length)];
console.log("Whole phrase: ", wholePhrase);
let phrasör = wholePhrase.split("");
console.log("Phrasör split: ", phrasör);

let htmlToRender = document.createElement("ul");
phrasör.forEach(el => {
  if (el === " ") {
    let appendör = document.createElement("li");
    appendör.innerHTML = " ";
    appendör.className = "space";
    return htmlToRender.appendChild(appendör);
  }
  let appendör = document.createElement("li");
  appendör.innerHTML = el;
  appendör.className = "letter";
  return htmlToRender.appendChild(appendör);
});
phraseDiv.appendChild(htmlToRender);

phrasör = removeChars(phrasör, " ");

const keyBoardDiv = document.getElementById("qwerty");
const keyBoardButtons = keyBoardDiv.getElementsByTagName("button");

for (let el of keyBoardDiv.getElementsByTagName("button")) {
  el.addEventListener("click", () => {
    el.disabled = true;
    el.classList.add("chosen");

    if (!phrasör.includes(el.innerHTML)) {
      NUM_LIVES--;
      appendHearts(heartDiv, NUM_LIVES);
      if (NUM_LIVES < 1) {
        // logic to game over here.
        startDiv.style.display = "";
        startDiv.classList.add("lose");
        console.log("lose");
      }
    }

    for (let square of htmlToRender.children) {
      if (square.innerHTML === el.innerHTML) {
        square.classList.add("show");
        phrasör = removeChars(phrasör, el.innerHTML);
        console.log("new phrasor: ", phrasör);
        if (phrasör.length === 0) {
          //logic to win gayme here
          startDiv.style.display = "";
          startDiv.classList.add("win");
          console.log("Winner");
        }
      }
    }
  });
}

function removeChars(baseArray, charToRemove) {
  let returnArray = [];
  for (let i = 0; i < baseArray.length; i++) {
    if (baseArray[i] !== charToRemove) {
      returnArray.push(baseArray[i]);
    }
  }
  return returnArray;
}

function appendHearts(parentDiv, numLives) {
  let ol = document.createElement("ol");
  for (let i = 0; i < numLives; i++) {
    let liToAppend = document.createElement("li");
    liToAppend.className = "tries";
    ol.appendChild(liToAppend);
    let imgToAppend = document.createElement("img");
    imgToAppend.src = "images/liveHeart.png";
    imgToAppend.height = "35";
    imgToAppend.width = "30";
    liToAppend.appendChild(imgToAppend);
  }

  for (let i = 0; i < 5 - numLives; i++) {
    let liToAppend = document.createElement("li");
    liToAppend.className = "tries";
    ol.appendChild(liToAppend);
    let imgToAppend = document.createElement("img");
    imgToAppend.src = "images/lostHeart.png";
    imgToAppend.height = "35";
    imgToAppend.width = "30";
    liToAppend.appendChild(imgToAppend);
  }
  while (parentDiv.firstChild) {
    parentDiv.removeChild(parentDiv.firstChild);
  }
  parentDiv.appendChild(ol);
}
