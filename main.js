let duration = 1000;
let count = 0;
// Catch the elements
// Info elements
let spanName = document.querySelector(".info-container .name span");
let spanTries = document.querySelector(".info-container .tries span");
// Game block elements
let blocksContainer = document.querySelector(".blocks-container");
let blocks = Array.from(blocksContainer.children);

// Arrange blocks randomly
blocks.forEach((block) => {
  block.style.order = Math.floor(Math.random() * 20);
  block.addEventListener("click", function (e) {
    flipBlock(this);
  });
});
// Start the game
// Strat game button
document.querySelector(".control-btns .start").onclick = function () {
  // Get the player name
  let yourName = prompt("Whats Your Name ?");

  // Add the player name to the page
  yourName == null || yourName.match(/(\s+)/) || yourName == ""
    ? (spanName.innerHTML = "Unknown")
    : (spanName.innerHTML = yourName);
  // Remove the splash screen
  this.parentElement.remove();
  // Flip all blocks for a few seconds
  showAll();
  // Play Background Effects
  document.querySelector("#background-sound").play();
};

// Restart the game
document.querySelector(".the-end .restart").onclick = function () {
  // Get the player name
  let yourName = prompt("Whats Your Name ?");

  // Add the player name to the page
  yourName == null || yourName.match(/(\s+)/) || yourName == ""
    ? (spanName.innerHTML = "Unknown")
    : (spanName.innerHTML = yourName);
  // Reflip the blocks
  blocks.forEach((block) => {
    block.classList.remove("has-matched");
  });
  // Re arrange the blocks
  arrangeBlocks();
  // Remove the splash screen
  this.parentElement.style.display = "none";
  // Flip all blocks for a few seconds
  showAll();
  // Reset count of true match
  count = 0;
  // Reset end message classlist
  document.querySelector(".the-end .msg").className = "msg";
  document.querySelector("#background-sound").play();
};

// All functions
function showAll() {
  // Flip all blocks
  blocks.forEach((block) => block.classList.add("is-flipped"));
  setTimeout(() => {
    blocks.forEach((block) => block.classList.remove("is-flipped"));
  }, 1500);
}
// Flip function
function flipBlock(block) {
  // Add flipped class
  block.classList.add("is-flipped");
  // Collect flipped blocks
  let flippedBlocks = blocks.filter((block) =>
    block.classList.contains("is-flipped")
  );
  if (flippedBlocks.length === 2) {
    // Stop clicking
    stopClick();
    // Compare the blocks
    checkMatching(flippedBlocks[0], flippedBlocks[1]);
  }
}
// Stop clicking function
function stopClick() {
  // Add stop-click class
  blocksContainer.classList.add("stop-click");
  // After particular duration
  setTimeout(() => {
    // Remove stop-click class
    blocksContainer.classList.remove("stop-click");
    blocks.forEach((block) => block.classList.remove("is-flipped"));
  }, duration);
}
// Check matching function
function checkMatching(firstBlock, secondBlock) {
  // When wrong answer
  if (firstBlock.dataset.food === secondBlock.dataset.food) {
    // Bin the mathched
    firstBlock.classList.add("has-matched");
    secondBlock.classList.add("has-matched");
    count += 1;
    if (count === 10) {
      endGame(true);
      // Reflip the blocks
      blocks.forEach((block) => {
        block.classList.remove("has-matched");
      });
    }

    // Play success sound effect
    document.getElementById("success").play();
  } else {
    setTimeout(() => {
      spanTries.innerHTML++;
      if (spanTries.innerHTML == 5) {
        endGame(false);
        // Reflip the blocks
        blocks.forEach((block) => {
          block.classList.remove("has-matched");
        });
      }
    }, 500);
    // Play success sound effect
    document.getElementById("fail").play();
  }
}
// Game end function
function endGame(result) {
  if (result === true) {
    document.querySelector(".the-end .msg").classList.add("won");
    document.querySelector(".the-end .msg").innerHTML = "You Won !";
  } else {
    document.querySelector(".the-end .msg").classList.add("lose");
    document.querySelector(".the-end .msg").innerHTML = "You Lose !";
  }
  document.querySelector(".the-end").style.display = "block";
  spanTries.innerHTML = "0";
}
// Arrange blocks randomly
function arrangeBlocks() {
  blocks.forEach((block) => {
    block.style.order = Math.floor(Math.random() * 20);
  });
}
