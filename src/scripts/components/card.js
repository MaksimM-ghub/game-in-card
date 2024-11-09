export class Card {
  #cardNumber;
  #open = false;
  #success = false;

  constructor(container, cardNumber, flip) {
    this.container = container;
    this.flip = flip;
    this.#cardNumber = cardNumber;

    const cardElement = this.createElement();
    this.container.append(cardElement);
  }

  createElement() {
    this.card = document.createElement("div");
    this.card.classList.add("game-card");
    this.card.textContent = this.#cardNumber;
    this.card.addEventListener("click", () => {
      if (!this.#success && !this.#open) {
        this.open = true;
        this.flip(this);
      }
    });
    return this.card;
  }

  set cardNumber(value) {
    this.#cardNumber = value;
    this.card.textContent = this.#cardNumber;
  }

  get cardNumber() {
    return this.#cardNumber;
  }

  set open(value) {
    this.#open = value;
    if (this.#open) {
      this.card.classList.add("open-card");
    } else {
      this.card.classList.remove("open-card");
    }
  }

  get open() {
    return this.#open;
  }

  set success(value) {
    this.#success = value;
    if (this.#success) {
      this.card.classList.add("success");
      this.card.removeEventListener("click", this.flip);
    }
  }

  get success() {
    return this.#success;
  }
}
