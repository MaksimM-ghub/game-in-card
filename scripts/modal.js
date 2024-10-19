import { GameMenu } from "./menu-game.js";

export class Modal {
  constructor(text) {
    this.container = document.getElementById("game");

    this.modalDark = document.createElement("div");
    this.modalWindow = document.createElement("div");
    this.modalTitle = document.createElement("h2");
    this.restartGame = document.createElement("button");

    this.modalDark.classList.add("modal-dark");
    this.modalWindow.classList.add("modal-window");
    this.modalTitle.classList.add("modal-title");
    this.restartGame.classList.add("btn-restart");

    this.modalTitle.textContent = text;
    this.restartGame.textContent = "Начать заново";

    this.modalWindow.append(this.modalTitle, this.restartGame);
    this.modalDark.append(this.modalWindow);
    document.body.prepend(this.modalDark);

    this.restartGame.addEventListener("click", () => {
      new GameMenu(this.container);
      this.modalDark.classList.add("modal-hidden");
    });
  }
}
