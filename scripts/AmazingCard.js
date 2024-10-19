import { Card } from "./card.js";

export class AmazingCard extends Card {
  #cardNumber;
  #open = false;
  #success = false;
  #img;
  constructor(container, cardNumber, flip) {
    super(container, cardNumber, flip);
    this.cardNumber = cardNumber;
  }

  set cardNumber(value) {
    this.#cardNumber = value;
    const imgArray = [
      "../images/zenit.jpg",
      "../images/barselona.jpg",
      "../images/bayer.jpg",
      "../images/borussia.jpg",
      "../images/liverpool.jpg",
      "../images/psg.jpg",
      "../images/real.jpg",
    ];

    this.#img = document.createElement("img");
    this.#img.src = imgArray[value - 1];
    this.#img.classList.add("images-card");

    this.#img.addEventListener("error", () => {
      this.#img.src = "../images/default.jpg";
      this.#img.classList.add("images-error-card");
    });

    this.card.innerHTML = "";
    this.card.append(this.#img);
  }

  get cardNumber() {
    return this.#cardNumber;
  }

  set open(value) {
    this.#open = value;
    if (this.#open) {
      this.#img.classList.add("open-img");
      this.card.classList.add("game-card-filter");
    } else {
      this.#img.classList.remove("open-img");
      this.card.classList.remove("game-card-filter");
    }
  }

  get open() {
    return this.#open;
  }
}
