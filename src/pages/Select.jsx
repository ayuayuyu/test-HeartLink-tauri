import { Button, Box, Stack, Typography } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

export default function Select() {
  const navigate = useNavigate();
  const location = useLocation();
  const player = location.state?.player;

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ backgroundColor: "#f0f0f0" }}
    >
      <Stack spacing={4} alignItems="center">
        <Typography variant="h4" gutterBottom color="blue">
          プレイヤー{player}の選択
        </Typography>

        <Button
          onClick={() =>
            navigate(`/randomtopic`, { state: { player: player } })
          }
          sx={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#fff",
            backgroundColor: "#4CAF50",
            padding: "15px 40px",
            borderRadius: "10px",
            ":hover": { backgroundColor: "#45a049" },
          }}
        >
          RandomTopic
        </Button>

        <Button
          onClick={() => navigate(`/topic`, { state: { player: player } })}
          sx={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#fff",
            backgroundColor: "#2196F3",
            padding: "15px 40px",
            borderRadius: "10px",
            ":hover": { backgroundColor: "#1e88e5" },
          }}
        >
          SelectTopic
        </Button>
      </Stack>
    </Box>
  );
}
