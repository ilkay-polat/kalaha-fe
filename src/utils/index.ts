export function handleResponse(response: Response): void {
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
}

export function handleCreatedResourceLocation(response: Response): void {
  const newResourceUrl = JSON.stringify(response.headers.get("Location"));
  window.localStorage.setItem("resourceUrl", JSON.parse(newResourceUrl));
}

export function handleCreatedFirstPlayer(playerName: string): void {
  window.localStorage.setItem("player1", playerName);
}

export function handleCreatedSecondPlayer(playerName: string): void {
  window.localStorage.setItem("player2", playerName);
}

export function removeResourceLocation(): void {
  window.localStorage.removeItem("resourceUrl");
  window.localStorage.removeItem("player1");
  window.localStorage.removeItem("player2");
}