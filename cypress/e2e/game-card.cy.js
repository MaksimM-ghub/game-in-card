/// <reference types="cypress" />

function shuffleArr(array) {
  for (let i = 0; i < array.length - 1; i++) {
    let temp = array[i];
    let j = Math.floor(Math.random() * array.length);
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
};

describe("Приложение Игра в пары", () => {
  beforeEach(() => {
    cy.visit("http://192.168.0.2:3000");
    cy.contains("Начать игру").click();
    cy.contains("8 карт").click();
    cy.contains("Найди пару чисел").click();
  })

  it("Проверка, что все карточки закрыты, и всего 8 карточек", () => {
    cy.get(".game-card").should("have.length", 8);
    cy.get(".game-card").each((card) => {
      cy.wrap(card).should("not.have.class", "open-card");
    })
  });

  it("Клик по произвольной карточке, убедимся, что она осталась открыта", () => {
    cy.get(".game-card").then((cards) => {
      const randomIndex = Math.floor(Math.random() * cards.length);
      cy.wrap(cards[randomIndex]).click();
      cy.wrap(cards[randomIndex]).should("have.class", "open-card");
    });
  });

  it("Находим все пары карточек и оставляем их открытыми или выходим при превышении попыток", () => {
    const maxAttempts = 5;

    function openNextPair(attempts) {
      if (attempts >= maxAttempts) {
        cy.log("Превышено максимальное количество попыток для текущей пары");
        return;
      }

      cy.get(".game-card").then((cards) => {
        const closedCards = [];
        cards.each((index, card) => {
          if (!card.classList.contains('success')) {
            closedCards.push(index);
          }
        });

        if (closedCards.length === 0) {
          cy.log("Все карты открыты!");
          return;
        }

        const indexArr = shuffleArr(closedCards);
        const [index1, index2] = indexArr.slice(0, 2);

        cy.get(".game-card").eq(index1).click();
        cy.wait(500);
        cy.get(".game-card").eq(index2).click();
        cy.wait(500);

        cy.window().then((window) => {
          const cardSuccess = window.document.querySelectorAll(".game-card.open-card.success");

          if (cardSuccess.length === 8) {
            cy.log("Все карты успешно открыты!");
          } else {
            if (window.document.querySelectorAll(".game-card.open-card.success").length % 2 === 0) {
              openNextPair(0);
            } else {
              openNextPair(attempts + 1);
            }
          }
        });
      });
    }

    openNextPair(0);
  });
});
