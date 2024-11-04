import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Stack,
  FormControl,
  Input,
} from "@mui/material";

const Home = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [player, setPlayer] = useState("");

  useEffect(() => {
    setName("");
    setPlayer("");
  }, []);

  const req = () => {
    const data = { player: player, name: name };

    console.log(`送信: ${JSON.stringify(data)}`);
    const url = "https://hartlink-websocket-api.onrender.com/name";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("ネットワーク応答が正常ではありません");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = () => {
    if (name && player) {
      req();
      navigate(`/select`, { state: { player: player } });
    } else {
      alert("名前の入力とPlayerを選択してください");
    }
  };

  const setPlayers = (player) => {
    setPlayer(player);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ backgroundColor: "#f0f0f0" }}
    >
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={3}
        sx={{ width: "80%", maxWidth: "400px" }}
      >
        <Typography variant="h4" gutterBottom color="blue">
          名前
        </Typography>
        <FormControl required fullWidth>
          <Input
            placeholder="名前を入力"
            value={name}
            onChange={handleNameChange}
            disableUnderline
            sx={{
              padding: "10px",
              borderRadius: "15px",
              border: "2px solid #ddd",
              backgroundColor: "#fff",
            }}
          />
        </FormControl>
        <Box display="flex" justifyContent="space-around" width="100%">
          <Button
            variant={player === "1" ? "contained" : "outlined"}
            onClick={() => setPlayers("1")}
            sx={{ width: "45%" }}
          >
            Player1
          </Button>
          <Button
            variant={player === "2" ? "contained" : "outlined"}
            onClick={() => setPlayers("2")}
            sx={{ width: "45%" }}
          >
            Player2
          </Button>
        </Box>
        <Button
          onClick={handleSubmit}
          fullWidth
          sx={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#fff",
            backgroundColor: "#ff4d4d",
            padding: "10px",
            borderRadius: "10px",
            ":hover": { backgroundColor: "#ff3333" },
          }}
        >
          タップ
        </Button>
      </Stack>
    </Box>
  );
};

export default Home;
