import { Card } from "./card.js";
import zenit from "../../images/zenit.jpg";
import barselona from "../../images/barselona.jpg";
import bayer from "../../images/bayer.jpg";
import borussia from "../../images/borussia.jpg";
import liverpool from "../../images/liverpool.jpg";
import psg from "../../images/psg.jpg";
import real from "../../images/real.jpg";
import defaultImg from "../../images/default.jpg";

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
      zenit,
      barselona,
      bayer,
      borussia,
      liverpool,
      psg,
      real,
    ];

    this.#img = document.createElement("img");
    this.#img.src = imgArray[value - 1];
    this.#img.classList.add("images-card");

    this.#img.addEventListener("error", () => {
      this.#img.src = defaultImg;
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
