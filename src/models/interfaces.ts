import { GameStatus, PlayerNo } from "./enums";

export interface IGameData {
  status: GameStatus;
  playerTurn: PlayerNo;
  pits: number[];
}

export interface IGameScore {
  winnerPlayer?: PlayerNo;
  scores?: number[];
}