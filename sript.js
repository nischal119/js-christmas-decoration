const treeCanvas = document.getElementById("christmas-tree");
const canvasContext = treeCanvas.getContext("2d");

let treeBulbs = [];
let blinkAnimationTimer;

function renderCanvas() {
  canvasContext.clearRect(0, 0, treeCanvas.width, treeCanvas.height);

  const treeImage = new Image();
  treeImage.src = "./tree.jpg";
  treeImage.onload = function () {
    const x = treeCanvas.width / 2 - treeImage.width / 2;
    const y = treeCanvas.height / 2 - treeImage.height / 2;
    canvasContext.drawImage(treeImage, x, y);

    drawTreeBulbs();
  };
}

function TreeBulb(x, y, color) {
  this.x = x;
  this.y = y;
  this.color = color;
}

function drawTreeBulbs() {
  for (const bulb of treeBulbs) {
    canvasContext.beginPath();
    canvasContext.arc(bulb.x, bulb.y, 10, 0, 2 * Math.PI);
    canvasContext.fillStyle = bulb.color;
    canvasContext.strokeStyle = "black";
    canvasContext.lineWidth = 2;
    canvasContext.fill();
    canvasContext.stroke();
  }
}

function addTreeBulb(event) {
  const rect = treeCanvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const randomColor = getRandomColor();
  treeBulbs.push(new TreeBulb(x, y, randomColor));
  renderCanvas();
}

function activateBlink() {
  document.getElementById("startBtn").disabled = true;
  document.getElementById("stopBtn").disabled = false;
  document.getElementById("resetBtn").disabled = true;

  blinkAnimationTimer = setInterval(function () {
    treeBulbs.forEach((bulb) => {
      bulb.color = bulb.color === "white" ? getRandomColor() : "white";
    });

    renderCanvas();
  }, 600);
}

function deactivateBlink() {
  clearInterval(blinkAnimationTimer);

  document.getElementById("startBtn").disabled = false;
  document.getElementById("stopBtn").disabled = true;
  document.getElementById("resetBtn").disabled = false;

  treeBulbs.forEach((bulb) => (bulb.color = "white"));
  renderCanvas();
}

function resetTree() {
  document.getElementById("startBtn").disabled = false;
  document.getElementById("stopBtn").disabled = true;
  document.getElementById("resetBtn").disabled = true;

  treeBulbs = [];
  renderCanvas();
}

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

treeCanvas.addEventListener("click", addTreeBulb);
renderCanvas();
