import { Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

export default function Select() {
  const navigate = useNavigate();
  const location = useLocation();
  const player = location.state.player;
  return (
    <>
      <Button
        onClick={() => navigate(`/randomtopic`, { state: { player: player } })}
      >
        RandomTopic
      </Button>
      <Button onClick={() => navigate(`/topic`, { state: { player: player } })}>
        SelectTopic
      </Button>
    </>
  );
}
