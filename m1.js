var readlineSync = require("readline-sync");

const deckOfCards = [];
const dealer = [];
const player = [];
let playerStand = false;

const cardNum = [
  {
    name: "Ace",
    value: 1,
  },
  {
    name: "2",
    value: 2,
  },
  {
    name: "3",
    value: 3,
  },
  {
    name: "4",
    value: 4,
  },
  {
    name: "5",
    value: 5,
  },
  {
    name: "6",
    value: 6,
  },
  {
    name: "7",
    value: 7,
  },
  {
    name: "8",
    value: 8,
  },
  {
    name: "9",
    value: 9,
  },
  {
    name: "10",
    value: 10,
  },
  {
    name: "J",
    value: 10,
  },
  {
    name: "Q",
    value: 10,
  },
  {
    name: "K",
    value: 10,
  },
];
const cardColor = ["♠", "♥", "⬥", "♣"];

cardColor.map((color) => {
  cardNum.map((num) => {
    deckOfCards.push({ ...num, color: color });
  });
});

const hit = () => {
  player.push(deckOfCards.pop());
  showCurrentCards();
  check();
};

const stand = () => {
  playerStand = true;
  let score = dealer.reduce((acc, { value }) => (acc += value), 0);
  while (score < 17) {
    let card = deckOfCards.pop();
    dealer.push(card);
    score += card.value;
  }
  showCurrentCards();
  checkWinner();
};

const checkWinner = () => {
  let playerScore = player.reduce((acc, { value }) => (acc += value), 0);
  let dealerScore = dealer.reduce((acc, { value }) => (acc += value), 0);
  console.log(dealerScore);
  console.log(playerScore);
  console.log(
    dealerScore > 21
      ? "You Won"
      : playerScore > dealerScore
      ? "You Won"
      : playerScore === dealerScore
      ? "Draw"
      : "You Lost"
  );
};

const askInput = () => {
  let action = ["Hit", "Stand"];
  let answer = readlineSync.keyInSelect(action, null, { cancel: false });
  switch (answer) {
    case 0:
      hit();
      break;
    case 1:
      stand();
      break;
  }
};

const showCurrentCards = () => {
  console.clear();
  console.log("###########################");
  console.log("Dealer");
  if (playerStand) {
    for (i = 0; i < dealer.length; i++) {
      console.log(dealer[i].name, dealer[i].color);
    }
  } else {
    console.log(dealer[0].name, dealer[0].color);
    console.log("🂠");
  }

  console.log("=======");
  console.log("Player");
  for (i = 0; i < player.length; i++) {
    console.log(player[i].name, player[i].color);
  }
  console.log("###########################");
};

const check = () => {
  let score = player.reduce((acc, { value }) => (acc += value), 0);
  if (score > 21) {
    console.log("Busted, you lost");
  } else {
    askInput();
  }
};

deckOfCards.sort((a, b) => 0.5 - Math.random());

player.push(deckOfCards.pop());
dealer.push(deckOfCards.pop());
player.push(deckOfCards.pop());
dealer.push(deckOfCards.pop());

showCurrentCards();

if (
  player[0].value + player[1].value === 11 &&
  (player[0].value === 1 || player[1].value === 1)
) {
  console.log("Black Jack, You Won");
} else {
  askInput();
}
