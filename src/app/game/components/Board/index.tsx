"use client";

import React from "react";
import styles from "./styles.module.css";
import { Button, Text } from "@radix-ui/themes";
import { PlayerNo } from "@/models/enums";

type BoardProps = {
  pits: Array<number>;
  handlePlay: ({
    pitsNumber,
    playerNumber,
  }: {
    pitsNumber: 1 | 2 | 3 | 4 | 5 | 6;
    playerNumber: PlayerNo;
  }) => void;
  playerTurn: PlayerNo;
  isActive: boolean;
};

function Board({ pits, handlePlay, playerTurn, isActive }: BoardProps) {
  const player2PitsActive = isActive
    ? playerTurn === PlayerNo.PLAYER_2
      ? true
      : false
    : false;
  const player1PitsActive = isActive
    ? playerTurn === PlayerNo.PLAYER_1
      ? true
      : false
    : false;

  return (
    <div className={styles.board}>
      <div className={styles.endsection}>
        <div className={styles.pot} style={{ cursor: "default" }}>
          <Text
            weight="bold"
            align="center"
            style={{ width: "100%", cursor: "inherit", scale: "inherit" }}
            size="9"
          >
            {pits[6]}
          </Text>
        </div>
      </div>
      <div className={styles.midsection}>
        <div className={styles.midrow}>
          <Button
            className={styles.pot}
            onDoubleClick={() =>
              handlePlay({ pitsNumber: 6, playerNumber: playerTurn })
            }
            disabled={!player1PitsActive}
          >
            <Text
              weight="bold"
              align="center"
              style={{ width: "100%", cursor: "inherit" }}
              size="8"
            >
              {pits[5]}
            </Text>
          </Button>
          <Button
            className={styles.pot}
            onDoubleClick={() =>
              handlePlay({ pitsNumber: 5, playerNumber: playerTurn })
            }
            disabled={!player1PitsActive}
          >
            <Text
              weight="bold"
              align="center"
              style={{ width: "100%", cursor: "inherit" }}
              size="8"
            >
              {pits[4]}
            </Text>
          </Button>
          <Button
            className={styles.pot}
            onDoubleClick={() =>
              handlePlay({ pitsNumber: 4, playerNumber: playerTurn })
            }
            disabled={!player1PitsActive}
          >
            <Text
              weight="bold"
              align="center"
              style={{ width: "100%", cursor: "inherit" }}
              size="8"
            >
              {pits[3]}
            </Text>
          </Button>
          <Button
            className={styles.pot}
            onDoubleClick={() =>
              handlePlay({ pitsNumber: 3, playerNumber: playerTurn })
            }
            disabled={!player1PitsActive}
          >
            <Text
              weight="bold"
              align="center"
              style={{ width: "100%", cursor: "inherit" }}
              size="8"
            >
              {pits[2]}
            </Text>
          </Button>
          <Button
            className={styles.pot}
            onDoubleClick={() =>
              handlePlay({ pitsNumber: 2, playerNumber: playerTurn })
            }
            disabled={!player1PitsActive}
          >
            <Text
              weight="bold"
              align="center"
              style={{ width: "100%", cursor: "inherit" }}
              size="8"
            >
              {pits[1]}
            </Text>
          </Button>
          <Button
            className={styles.pot}
            onDoubleClick={() =>
              handlePlay({ pitsNumber: 1, playerNumber: playerTurn })
            }
            disabled={!player1PitsActive}
          >
            <Text
              weight="bold"
              align="center"
              style={{ width: "100%", cursor: "inherit" }}
              size="8"
            >
              {pits[0]}
            </Text>
          </Button>
        </div>
        <div className={styles.midrow}>
          <Button
            className={styles.pot}
            disabled={!player2PitsActive}
            onDoubleClick={() =>
              handlePlay({ pitsNumber: 1, playerNumber: playerTurn })
            }
          >
            <Text
              weight="bold"
              align="center"
              style={{ width: "100%", cursor: "inherit" }}
              size="8"
            >
              {pits[7]}
            </Text>
          </Button>{" "}
          <Button
            className={styles.pot}
            disabled={!player2PitsActive}
            onDoubleClick={() =>
              handlePlay({ pitsNumber: 2, playerNumber: playerTurn })
            }
          >
            <Text
              weight="bold"
              align="center"
              style={{ width: "100%", cursor: "inherit" }}
              size="8"
            >
              {pits[8]}
            </Text>
          </Button>{" "}
          <Button
            className={styles.pot}
            disabled={!player2PitsActive}
            onDoubleClick={() =>
              handlePlay({ pitsNumber: 3, playerNumber: playerTurn })
            }
          >
            <Text
              weight="bold"
              align="center"
              style={{ width: "100%", cursor: "inherit" }}
              size="8"
            >
              {pits[9]}
            </Text>
          </Button>{" "}
          <Button
            className={styles.pot}
            disabled={!player2PitsActive}
            onDoubleClick={() =>
              handlePlay({ pitsNumber: 4, playerNumber: playerTurn })
            }
          >
            <Text
              weight="bold"
              align="center"
              style={{ width: "100%", cursor: "inherit" }}
              size="8"
            >
              {pits[10]}
            </Text>
          </Button>{" "}
          <Button
            className={styles.pot}
            disabled={!player2PitsActive}
            onDoubleClick={() =>
              handlePlay({ pitsNumber: 5, playerNumber: playerTurn })
            }
          >
            <Text
              weight="bold"
              align="center"
              style={{ width: "100%", cursor: "inherit" }}
              size="8"
            >
              {pits[11]}
            </Text>
          </Button>{" "}
          <Button
            className={styles.pot}
            disabled={!player2PitsActive}
            onDoubleClick={() =>
              handlePlay({ pitsNumber: 6, playerNumber: playerTurn })
            }
          >
            <Text
              weight="bold"
              align="center"
              style={{ width: "100%", cursor: "inherit" }}
              size="8"
            >
              {pits[12]}
            </Text>
          </Button>
        </div>
      </div>
      <div className={styles.endsection}>
        <div className={styles.pot} style={{ cursor: "default" }}>
          <Text
            weight="bold"
            align="center"
            style={{ width: "100%", cursor: "inherit", scale: "inherit" }}
            size="9"
          >
            {pits[13]}
          </Text>
        </div>
      </div>
    </div>
  );
}

export default Board;
