const startButton = document.getElementsByClassName("btn__reset")[0];
const startDiv = document.getElementById("overlay");

// Event listener for buttons
startButton.addEventListener("click", e => {
  if (e.target.textContent === "Reset") {
    location.reload(true);
  } else {
    runGame(5);
  }
});

function runGame(numLives) {
  let lives = numLives;
  startDiv.style.display = "none";

  const heartDiv = document.getElementById("scoreboard");
  appendHearts(heartDiv, lives);

  const phraseDiv = document.getElementById("phrase");
  let wholePhrase = phrases[Math.floor(Math.random() * phrases.length)];
  let phrasör = wholePhrase.split("");
  let htmlToRender = document.createElement("ul");

  renderPhraseToScreen(phrasör, htmlToRender);
  refreshPhraseDiv(phraseDiv, htmlToRender);

  phrasör = removeSpaces(phrasör, " ");

  const keyBoardDiv = document.getElementById("qwerty");

  refreshKeyboard(keyBoardDiv);

  for (let el of keyBoardDiv.getElementsByTagName("button")) {
    el.addEventListener("click", () => {
      tagLetterAsChosen(el);

      if (!phrasör.includes(el.innerHTML)) {
        lives--;
        appendHearts(heartDiv, lives);
        if (lives < 1) {
          displayLoss(startDiv, startButton);
          return;
        }
      }

      for (let square of htmlToRender.children) {
        if (square.innerHTML === el.innerHTML) {
          showLetter(square);
          phrasör = removeSpaces(phrasör, el.innerHTML);
          if (phrasör.length === 0) {
            displayWin(startDiv, startButton);
            return;
          }
        }
      }
    });
  }
}

function refreshPhraseDiv(parentDiv, elementToAppend) {
  while (parentDiv.firstChild) {
    parentDiv.removeChild(parentDiv.firstChild);
  }
  parentDiv.appendChild(elementToAppend);
}

function renderPhraseToScreen(phraseToRender, ulToHoldLetters) {
  phraseToRender.forEach(el => {
    if (el === " ") {
      return ulToHoldLetters.appendChild(createLiSpace());
    }
    return ulToHoldLetters.appendChild(createLiLetter(el));
  });
}

function createLiSpace() {
  let appendör = document.createElement("li");
  appendör.innerHTML = " ";
  appendör.className = "space";
  return appendör;
}

function createLiLetter(letter) {
  let appendör = document.createElement("li");
  appendör.innerHTML = letter;
  appendör.className = "letter";
  return appendör;
}

function tagLetterAsChosen(letter) {
  letter.disabled = true;
  letter.classList.add("chosen");
}

function refreshKeyboard(keyboard) {
  for (let el of keyboard.getElementsByTagName("button")) {
    refreshKeys(el);
  }
}

function refreshKeys(key) {
  key.disabled = false;
  key.classList.remove("chosen");
}

function showLetter(element) {
  element.classList.add("show");
}

function displayLoss(divToShow, buttonToChange) {
  divToShow.style.display = "";
  divToShow.classList.add("lose");
  divToShow.firstElementChild.innerHTML = "You Lost!";
  buttonToChange.innerHTML = "Reset";
}

function displayWin(divToShow, buttonToChange) {
  divToShow.style.display = "";
  divToShow.classList.add("win");
  divToShow.firstElementChild.innerHTML = "You Won!";
  buttonToChange.innerHTML = "Reset";
}

function removeSpaces(baseArray, charToRemove) {
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
    createHearts("live", ol);
  }

  for (let i = 0; i < 5 - numLives; i++) {
    createHearts("lost", ol);
  }
  while (parentDiv.firstChild) {
    parentDiv.removeChild(parentDiv.firstChild);
  }
  parentDiv.appendChild(ol);
}

function createHearts(type, parent) {
  let liToAppend = document.createElement("li");
  liToAppend.className = "tries";
  parent.appendChild(liToAppend);
  let imgToAppend = document.createElement("img");
  imgToAppend.src = "images/" + type + "Heart.png";
  imgToAppend.height = "35";
  imgToAppend.width = "30";
  liToAppend.appendChild(imgToAppend);
}
