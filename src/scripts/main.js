import '../index.html';
import '../scss/main.scss';

import { StartGame } from "./components/start-game.js";

const gameSection = document.getElementById("game");

const start = new StartGame(gameSection);
