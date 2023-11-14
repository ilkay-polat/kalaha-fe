import { PlayerNo } from "@/models/enums";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { Flex, Text } from "@radix-ui/themes";
import React from "react";

type DirectionSignProps = {
  playerType: PlayerNo;
  active: boolean;
};

function DirectionSign({ playerType, active }: DirectionSignProps) {
  const opacityValue = active ? 1 : 0.1;

  return (
    <Flex
      gap="2"
      align="center"
      justify="between"
      p="4"
      pl="0"
      style={{ opacity: opacityValue }}
    >
      {playerType === PlayerNo.PLAYER_1 ? (
        <ArrowLeftIcon width="30" height="30" />
      ) : null}
      <Text size="4">Direction Of Play</Text>
      {playerType === PlayerNo.PLAYER_2 ? (
        <ArrowRightIcon width="30" height="30" />
      ) : null}
    </Flex>
  );
}

export default DirectionSign;