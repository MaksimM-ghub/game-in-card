import { TableGame } from "./table-game.js";

export class GameMenu {
  constructor(container) {
    this.container = container;

    this.container.innerHTML = "";
    document.querySelector(".confetti").innerHTML = "";

    const gameMenu = document.createElement("div");
    gameMenu.classList.add("game-menu");
    const levelTitle = document.createElement("h2");
    levelTitle.classList.add("level-title");
    levelTitle.textContent = "Выбор сложности";

    gameMenu.append(levelTitle);

    gameMenu.append(this.createLevelBtn(6));
    gameMenu.append(this.createLevelBtn(8));
    gameMenu.append(this.createLevelBtn(10));
    gameMenu.append(this.createLevelBtn(12));
    gameMenu.append(this.createLevelBtn(14));

    this.container.append(gameMenu);
  }

  createLevelBtn(count) {
    const levelBtn = document.createElement("button");
    levelBtn.classList.add("level-btn");
    levelBtn.textContent = `${count} карт`;
    levelBtn.addEventListener("click", () => new TableGame(this.container, count));
    return levelBtn;
  }
}
