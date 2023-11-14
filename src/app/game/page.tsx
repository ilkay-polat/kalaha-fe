"use client";

import { Card, Flex } from "@radix-ui/themes";
import Actions from "./components/Actions";
import Announcement from "./components/Announcement";
import DirectionSign from "./components/DirectionSign";
import { GameStatus, PlayerNo } from "@/models/enums";
import Board from "./components/Board";
import PlayerAvatar from "./components/PlayerAvatar";
import React, { useEffect } from "react";
import { IGameData, IGameScore } from "@/models/interfaces";
import { useRouter } from "next/navigation";
import { handleResponse, removeResourceLocation } from "@/utils";

type Props = {};

const intialGameInformation: IGameData = {
  status: GameStatus.CREATED,
  playerTurn: PlayerNo.PLAYER_1,
  pits: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};

const intialGameScore: IGameScore = {
  winnerPlayer: undefined,
  scores: undefined,
};
function Game({ }: Props) {
  const router = useRouter();

  React.useEffect(() => {
    if (window !== undefined && !window.localStorage.getItem("player2"))
      router.push("/");
  }, [router]);
  const [gameScore, setGameScore] = React.useState(intialGameScore);
  const [gameInformation, setGameInformation] = React.useState(
    intialGameInformation
  );
  const [player1, setPlayer1] = React.useState("");
  const [player2, setPlayer2] = React.useState("");

  React.useEffect(() => {
    if (window !== undefined) {
      setPlayer1(window.localStorage.getItem("player1") ?? "");
      setPlayer2(window.localStorage.getItem("player2") ?? "");
    }
  }, []);
  async function getGamesByIdBoard(): Promise<IGameData | undefined> {
    const resourceUrl = window.localStorage.getItem("resourceUrl");
    try {
      const response = await fetch(`${resourceUrl}`, {
        method: "GET",
      });
      handleResponse(response);
      const data: IGameData = await response.json();
      setGameInformation(data);
      return data;
    } catch (e: any) {
      console.log(e);
    }
  }
  useEffect(() => {
    if (window !== undefined) {
      getGamesByIdBoard();
    }
  }, []);

  const boardIsActive =
    gameInformation.status === GameStatus.IN_PROGRESS ? true : false;
  async function handleResetBoard() {
    const resourceUrl = window.localStorage.getItem("resourceUrl");
    try {
      const response = await fetch(`${resourceUrl}`, {
        method: "PUT",
      });
      handleResponse(response);
      getGamesByIdBoard();
    } catch (e: any) {
      console.log(e);
    }
  }

  async function handleDeleteBoard() {
    const resourceUrl = window.localStorage.getItem("resourceUrl");
    try {
      const response = await fetch(`${resourceUrl}`, {
        method: "DELETE",
      });
      handleResponse(response);
      removeResourceLocation();
      router.push("/");
    } catch (e: any) {
      console.log(e);
    }
  }

  async function handlePlay({
    pitsNumber,
    playerNumber,
  }: {
    pitsNumber: 1 | 2 | 3 | 4 | 5 | 6;
    playerNumber: PlayerNo;
  }) {
    const resourceUrl = window.localStorage.getItem("resourceUrl");
    try {
      const response = await fetch(`${resourceUrl}/players/${playerNumber}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          pitNumber: pitsNumber,
        }),
      });
      handleResponse(response);
      const data: IGameData = await response.json();
      setGameInformation(data);
    } catch (e: any) {
      console.log(e);
    }
  }

  async function handleBoardScore() {
    const resourceUrl = window.localStorage.getItem("resourceUrl");
    try {
      const response = await fetch(`${resourceUrl}/score`, {
        method: "GET",
      });
      handleResponse(response);
      const data: IGameScore = await response.json();
      setGameScore(data);
    } catch (e: any) {
      console.log(e);
    }
  }
  useEffect(() => {
    if (gameInformation.status === GameStatus.OVER) {
      handleBoardScore()
    }
  }, [gameInformation.status]);
  return (
    <Card>
      <Announcement
        playerTurn={gameInformation.playerTurn}
        gameStatus={gameInformation.status}
        score={gameScore}
      />
      <Flex align="center" justify="between" p="4" pl="0">
        <PlayerAvatar
          playerType={PlayerNo.PLAYER_1}
          active={gameInformation.playerTurn === PlayerNo.PLAYER_1 && gameInformation.status === GameStatus.IN_PROGRESS}
          name={player1}
        />
        <DirectionSign
          playerType={PlayerNo.PLAYER_1}
          active={gameInformation.playerTurn === PlayerNo.PLAYER_1 && gameInformation.status === GameStatus.IN_PROGRESS}
        />
        <Actions
          handleResetBoard={handleResetBoard}
          handleDeleteBoard={handleDeleteBoard}
        />
      </Flex>
      <Board
        pits={gameInformation.pits}
        handlePlay={handlePlay}
        playerTurn={gameInformation.playerTurn}
        isActive={boardIsActive}
      />
      <Flex align="center" justify="between" p="4" pl="0">
        <div></div>
        <DirectionSign
          playerType={PlayerNo.PLAYER_2}
          active={gameInformation.playerTurn === PlayerNo.PLAYER_2 && gameInformation.status === GameStatus.IN_PROGRESS}
        />
        <PlayerAvatar
          playerType={PlayerNo.PLAYER_2}
          active={gameInformation.playerTurn === PlayerNo.PLAYER_2 && gameInformation.status === GameStatus.IN_PROGRESS}
          name={player2}
        />
      </Flex>
    </Card>
  );
}

export default Game;