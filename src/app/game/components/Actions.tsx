import { ExitIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Flex, IconButton, Tooltip } from "@radix-ui/themes";
import React from "react";

type ActionsProps = {
  handleDeleteBoard: () => void;
  handleResetBoard: () => void;
};

function Actions({
  handleResetBoard,
  handleDeleteBoard,
}: ActionsProps) {
  return (
    <Flex gap="3">
      <Tooltip content="Restart">
        <IconButton
          variant="soft"
          size="4"
          mr="2"
          color="cyan"
          radius="full"
          onClick={handleResetBoard}
        >
          <ReloadIcon width="30" height="30" />
        </IconButton>
      </Tooltip>
      <Tooltip content="Quit">
        <IconButton
          variant="soft"
          size="4"
          ml="2"
          color="red"
          radius="full"
          onClick={handleDeleteBoard}
        >
          <ExitIcon width="30" height="30" />
        </IconButton>
      </Tooltip>
    </Flex>
  );
}

export default Actions;
