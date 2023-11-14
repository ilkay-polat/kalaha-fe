import { GameStatus, PlayerNo } from "@/models/enums";
import { IGameScore } from "@/models/interfaces";
import { Heading } from "@radix-ui/themes";
import React from "react";

type AnnouncementProps = {
  playerTurn: PlayerNo;
  gameStatus: GameStatus;
  score?: IGameScore;
};

function Announcement({ gameStatus, playerTurn, score }: AnnouncementProps) {
  return (
    <Heading size="9" align="center" mt="4">
      {gameStatus === GameStatus.CREATED ? "Preparing" : null}
      {gameStatus === GameStatus.IN_PROGRESS
        ? playerTurn === PlayerNo.PLAYER_1
          ? "First Player Turn"
          : "Second Player Turn"
        : null}
      {gameStatus === GameStatus.OVER && score?.winnerPlayer === undefined ? "Game Over" : null}
      {score?.winnerPlayer !== undefined && score?.scores !== undefined
        ? `${score.winnerPlayer}. Player won by ${score.scores[0]} / ${score.scores[1]}`
        : null}
    </Heading>
  );
}

export default Announcement;
