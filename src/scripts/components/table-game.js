import { Card } from "./card.js";
import { GameMenu } from "./menu-game.js";
import { Modal } from "./modal.js";
import { confetti } from "./confetti.js";
import { AmazingCard } from "./AmazingCard.js";

export class TableGame {
  attempts = 0;
  constructor(container, count) {
    this.container = container;
    this.count = count;
    this.firstCard = null;
    this.secondCard = null;
    this.cardSuccess = [];
    this.attempts = this.calculateAttempts();

    this.container.innerHTML = "";

    this.gameTable = document.createElement("div");
    this.gameTitle = document.createElement("h2");
    this.attempt = document.createElement("span");
    this.btnNumber = document.createElement("button");
    this.btnImg = document.createElement("button");
    this.btnBack = document.createElement("button");

    this.gameTable.classList.add("game-table");
    this.gameTitle.classList.add("game-title");
    this.attempt.classList.add("attempt-title");
    this.btnNumber.classList.add("btn-table");
    this.btnImg.classList.add("btn-table");
    this.btnBack.classList.add("level-btn");

    this.gameTitle.textContent = "Найди пару";
    this.attempt.textContent = `Осталось попыток: ${this.calculateAttempts()}`;
    this.btnNumber.textContent = "Найди пару чисел";
    this.btnImg.textContent = "Найди пару картинок";
    this.btnBack.textContent = "Назад к выбору сложности";

    this.container.append(
      this.gameTitle,
      this.btnNumber,
      this.btnImg,
      this.gameTable
    );

    this.numArr = this.createArray(this.count);
    this.numShuffle = this.shuffleArr(this.numArr);

    this.btnNumber.addEventListener("click", () => {
      this.btnNumber.remove();
      this.btnImg.remove();

      this.container.append(this.attempt, this.gameTable, this.btnBack);

      this.numShuffle.map(
        (num) => new Card(this.gameTable, num, this.cardClick.bind(this))
      );
    });

    this.btnImg.addEventListener("click", () => {
      this.btnNumber.remove();
      this.btnImg.remove();

      this.container.append(this.attempt, this.gameTable, this.btnBack);
      this.numShuffle.map(
        (num) => new AmazingCard(this.gameTable, num, this.cardClick.bind(this))
      );
    });

    this.btnBack.addEventListener("click", () => {
      document.querySelector(".game-section").innerHTML = "";
      new GameMenu(this.container);
    });
  }

  calculateAttempts() {
    return this.count - 3;
  }

  createArray(count) {
    let cardArr = [];

    for (let i = 1; i <= count / 2; i++) {
      cardArr.push(i, i);
    }
    return cardArr;
  }

  shuffleArr(array) {
    for (let i = 0; i < array.length - 1; i++) {
      let temp = array[i];
      let j = Math.floor(Math.random() * array.length);
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  checkWinner() {
    if (this.cardSuccess.length === this.count) {
      new Modal("Поздравляю, Вы выиграли!");

      document.querySelector(".confetti").innerHTML = confetti;
    }
  }

  cardClick(card) {
    const gameCard = document.querySelector(".game-card");
    const imgCard = document.querySelector(".images-card");
    if (this.firstCard === null) {
      this.firstCard = card;
    } else if (this.secondCard === null) {
      this.secondCard = card;

      // Проверяем, совпадают ли карты
      if (this.firstCard.cardNumber === this.secondCard.cardNumber) {
        this.firstCard.success = true;
        this.secondCard.success = true;

        //Добавляем карты в массив, далее проверяем, если все карты совпали то появляется модальное окно
        this.cardSuccess.push(this.firstCard);
        this.cardSuccess.push(this.secondCard);
        this.checkWinner();

        // Сбрасываем выбранные карты после успешного совпадения
        this.firstCard = null;
        this.secondCard = null;
      } else {
        setTimeout(() => {
          this.firstCard.open = false;
          this.secondCard.open = false;

          // Сбрасываем выбранные карты после отказа

          this.firstCard = null;
          this.secondCard = null;
        }, 200);

        // Уменьшаем количество попыток и отрисоываем заново
        this.attempts--;
        this.attempt.textContent = `Осталось попыток: ${this.attempts}`;
        if (this.attempts <= 0) {
          new Modal("Игра окончена! Вы исчерпали все попытки.");
          return;
        }
      }
    }
  }
}
