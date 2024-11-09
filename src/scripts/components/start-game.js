import { GameMenu } from './menu-game.js';

export class StartGame {
  constructor(container) {
    this.container = container;

    const startBtn = document.createElement("button");
    const startTitle = document.createElement("h1");

    startTitle.classList.add("start-title");
    startTitle.textContent = "Игра в пары";

    startBtn.classList.add("start-btn");
    startBtn.textContent = "Начать игру";

    startBtn.addEventListener("click", () => {
      new GameMenu(this.container);
    });

    container.append(startTitle);
    container.append(startBtn);
  }
}
