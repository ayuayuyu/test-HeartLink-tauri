import { Container } from "@mui/material";
import WebSocket from "./WebSocket";
import Topic from "./Topic";
import RandomTopic from "./Topic/RandomTopic";

function Room() {
  return (
    <Container>
      <Topic />
      <RandomTopic />
      <WebSocket />
    </Container>
  );
}

export default Room;
