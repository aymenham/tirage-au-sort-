//balloon code
const gifts = ["Stylo", "Téléphone", "Livre", "Boxe", "Boxe1"];
const messages = [
  " une surprise 😁 !",
  "Un cadeau t'attend ici😎  !",
  "Je suis un ballon magique 💪🏽",
  "Je suis sûr que tu vas aimer😚",
  "clique !😘",
  " surprise géniale 😄 !",
  "Tu ne vas pas croire ce que je te cache🙊",
  "Prêt pour une surprise ? Clique ici !🤡",
  "Je suis un ballon mystérieux.😅",
  "je suis un menteur 🤓",
  "me fait pas confiance 😛",
  "vive sqli 😁",
  "je t'aime ❤️",
];
const BallonColors = ["#799ED2", "#8882C9", "#66CC86", "#C9C85E", "#CE8355"];
let lastMessagePicked = undefined;
let balloonInetrval = null;
const popIt = (ballon, box, value, gift) => {
  const elements = document.querySelectorAll(".ballon-container");
  clearInterval(balloonInetrval);
  elements.forEach((element) => {
    element.style.animationPlayState = "paused";
  });
  document.getElementById("messageInside" + value).className = "makeappear";
  ballon.style.display = "none";
  box.style.display = "none";
  document.getElementById("particle1" + value).className = "animateParticle1";
  document.getElementById("particle2" + value).className = "animateParticle2";
  document.getElementById("particle3" + value).className = "animateParticle3";
  document.getElementById("particle4" + value).className = "animateParticle4";
  document.getElementById("particle5" + value).className = "animateParticle5";
  document.getElementById("particle6" + value).className = "animateParticle6";

  setTimeout(() => {
    showFinishModal(gift);
  }, 1900);
};
const createBallon = (value) => {
  const gift = getRandomIndexFromArray(gifts);
  let message = getRandomIndexFromArray(messages);
  const ballonColor = getRandomIndexFromArray(BallonColors);
  while (message === lastMessagePicked) {
    message = getRandomIndexFromArray(messages);
  }
  lastMessagePicked = message;
  const balloonContainer = document.createElement("div");
  balloonContainer.classList.add("ballon-container");
  balloonContainer.style.animationDuration = `${80 / value}s`;

  const balloon = document.createElement("div");

  balloon.style.background = ballonColor;
  balloon.classList.add("balloon");
  balloon.style.setProperty("--beforColor", ballonColor);

  const boxContainer = document.createElement("div");
  boxContainer.classList.add("box-container");

  const box = document.createElement("div");
  box.classList.add("box");
  box.textContent = message;
  boxContainer.appendChild(box);

  const particle1 = document.createElement("div");
  particle1.setAttribute("id", "particle1" + value);
  addStyleToDiv(particle1, ballonColor);
  const particle2 = document.createElement("div");
  particle2.setAttribute("id", "particle2" + value);
  addStyleToDiv(particle2, ballonColor);
  const particle3 = document.createElement("div");
  particle3.setAttribute("id", "particle3" + value);
  addStyleToDiv(particle3, ballonColor);
  const particle4 = document.createElement("div");
  particle4.setAttribute("id", "particle4" + value);
  addStyleToDiv(particle4, ballonColor);
  const particle5 = document.createElement("div");
  particle5.setAttribute("id", "particle5" + value);
  addStyleToDiv(particle5, ballonColor);
  const particle6 = document.createElement("div");
  particle6.setAttribute("id", "particle6" + value);
  addStyleToDiv(particle6, ballonColor);

  const messageInside = document.createElement("div");
  messageInside.classList.add("gift-text");
  messageInside.setAttribute("id", "messageInside" + value);
  messageInside.textContent = "Félicitation vous avez gagné un(e) " + gift;
  messageInside.style.opacity = 0;

  balloonContainer.appendChild(balloon);
  balloonContainer.appendChild(messageInside);
  balloonContainer.appendChild(particle1);
  balloonContainer.appendChild(particle2);
  balloonContainer.appendChild(particle3);
  balloonContainer.appendChild(particle4);
  balloonContainer.appendChild(particle5);
  balloonContainer.appendChild(particle6);
  balloonContainer.appendChild(boxContainer);

  balloon.addEventListener("click", () => {
    popIt(balloon, box, value, gift);
  });

  document.body.appendChild(balloonContainer);
};

const addStyleToDiv = (myDiv, backgroundColor) => {
  myDiv.style.width = "5px";
  myDiv.style.height = "20px";
  myDiv.style.borderRadius = "50px";
  myDiv.style.position = "absolute";
  myDiv.style.top = "80px";
  myDiv.style.left = "80px";
  myDiv.style.transition = "all .7s ease-out";
  myDiv.style.zIndex = "1";
  myDiv.style.backgroundColor = backgroundColor;
};

const createBalloonStream = () => {
  balloonInetrval = setInterval(() => {
    const value = getRandomAnimationDelay(5, 15);
    createBallon(value);
  }, 800);
};

const showFinishModal = (gift) => {
  const modalContainer = document.querySelector("#modal-container");
  const giftText = document.querySelector("#gift-text");

  giftText.innerHTML = gift;
  modalContainer.removeAttribute("class");
  modalContainer.classList.add("six");
  document.body.classList.add("modal-active");

  modalContainer.addEventListener("click", function () {
    modalContainer.classList.add("out");
    document.body.classList.remove("modal-active");
    setTimeout(() => {
      restartAll();
    }, 1000);
  });
};

const closeFinishModal = () => {
  const modalContainer = document.querySelector("#modal-container");
  modalContainer.addEventListener("click", function () {
    this.classList.add("out");
    document.body.classList.remove("modal-active");
  });
};

const restartAll = () => {
  const balloons = document.querySelectorAll(".ballon-container");
  balloons.forEach((balloon) => {
    balloon.remove();
  });
  clearInterval(balloonInetrval);
  createBalloonStream();
};

const setStartModal = () => {
  var startModal = document.getElementById("start-modal");
  var startBtn = document.querySelector(".start-button");
  startBtn.addEventListener("click", function () {
    isStart = true;
    startModal.style.display = "none";
    createBalloonStream();
  });
};

const getRandomAnimationDelay = (min, max) => {
  return Math.random() * (max - min) + min;
};

const getRandomIndexFromArray = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

setStartModal();
