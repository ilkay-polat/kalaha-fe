import { Container } from "@radix-ui/themes";
import React from "react";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <Container size="4" position="relative" m="auto">
      {children}
    </Container>
  );
}