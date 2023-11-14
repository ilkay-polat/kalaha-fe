"use client";
import { FormStatus } from "@/models/enums";
import React from "react";
import {
  Flex,
  Button,
  TextField,
  Container,
  Card,
  Heading,
} from "@radix-ui/themes";
import { PersonIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { baseUrl } from "@/constants";
import {
  handleCreatedFirstPlayer,
  handleCreatedResourceLocation,
  handleCreatedSecondPlayer,
  handleResponse,
} from "@/utils";

export default function Home() {
  const router = useRouter();

  const [formStatus, setFormStatus] = React.useState<FormStatus>(
    FormStatus.FIRSTPLAYER
  );

  const [playerName, setPlayerName] = React.useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPlayerName(e.target.value);
  }

  async function handleSubmit(e: React.ChangeEvent<EventTarget>) {
    e.preventDefault();
    if (formStatus === FormStatus.FIRSTPLAYER) {
      setFormStatus(FormStatus.LOADING);
      const url = process.env.NEXT_PUBLIC_BASE_URL;
      try {
        const response = await fetch(`${baseUrl}/games`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ playerName: playerName }),
        });
        handleResponse(response);
        handleCreatedResourceLocation(response);
        handleCreatedFirstPlayer(playerName);
      } catch (e: any) {
        setFormStatus(FormStatus.FIRSTPLAYER);
        console.log(e);
        return;
      }
      setFormStatus(FormStatus.SECONDPLAYER);
    }
    if (formStatus === FormStatus.SECONDPLAYER) {
      setFormStatus(FormStatus.LOADING);
      const resourceUrl = window.localStorage.getItem("resourceUrl");
      console.log(resourceUrl);
      try {
        const response = await fetch(`${resourceUrl}`, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ playerName: playerName }),
        });
        handleResponse(response);
        handleCreatedSecondPlayer(playerName);
      } catch (e: any) {
        setFormStatus(FormStatus.SECONDPLAYER);
        console.log(e);
        return;
      }
      router.push("/game");
      setFormStatus(FormStatus.COMPLETED);
    }
    setPlayerName("");
  }

  React.useEffect(() => {
    if (window !== undefined && window.localStorage.getItem("player2"))
      router.push("/game");
    else if (window !== undefined && window.localStorage.getItem("resourceUrl"))
      setFormStatus(FormStatus.SECONDPLAYER);
  }, [router]);

  return (
    <Container size="1" m="auto">
      <Card size="5">
        <Heading align="center">
          {formStatus === FormStatus.FIRSTPLAYER ? "Player 1" : null}
          {formStatus === FormStatus.SECONDPLAYER ? "Player 2" : null}
          {formStatus === FormStatus.LOADING ? "Game Creating" : null}
        </Heading>
        <form onSubmit={handleSubmit}>
          <Flex direction="column" gap="2" mt="5">
            <TextField.Root m="3" size="3">
              <TextField.Slot>
                <PersonIcon height="16" width="16" />
              </TextField.Slot>
              <TextField.Input
                placeholder="Enter your name..."
                value={playerName}
                onChange={handleChange}
              />
            </TextField.Root>
            <Button
              type="submit"
              m="3"
              disabled={formStatus === FormStatus.LOADING}
            >
              {formStatus === FormStatus.FIRSTPLAYER ? "Create Game" : null}
              {formStatus === FormStatus.SECONDPLAYER ? "Join Game" : null}
              {formStatus === FormStatus.LOADING ? "Submitting ..." : null}
            </Button>
          </Flex>
        </form>
      </Card>
    </Container>
  );
}