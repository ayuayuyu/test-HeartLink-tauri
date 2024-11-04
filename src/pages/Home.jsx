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
    const data = { player: player, name: name }; // dataを正しい形式で設定

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
    console.log(name);
    setName(e.target.value);
  };

  const handleSubmit = () => {
    if (name && player) {
      req();
      navigate(`/select`, { state: { player: player } });
    } else {
      alert("名前の入力とPlayerを選択してください");
      console.log("名前の入力");
    }
  };

  const setPlayers = (player) => {
    console.log(`player: ${player}`);
    setPlayer(player);
  };

  return (
    <>
      <Box>
        <Box>
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            spacing={3}
            sx={{ mt: "20%" }}
          >
            {/* 名前入力 */}
            <Typography
              variant="body1"
              sx={{
                fontSize: "8vw",
              }}
            >
              名前
            </Typography>
            <FormControl required color="primary" sx={{ width: "60%" }}>
              <Input
                placeholder="名前を入力"
                name="Name"
                autoComplete="off"
                fullWidth
                disableUnderline
                onChange={handleNameChange}
                sx={{
                  padding: "10px",
                  borderRadius: "15px",
                  border: "3px solid white",
                  backgroundColor: "white",
                }}
              />
            </FormControl>
          </Stack>
          <Box>
            <Box
              sx={{
                mt: 5,
                position: "relative",
              }}
            ></Box>
          </Box>
          <Button onClick={() => setPlayers("1")}>Player1</Button>
          <Button onClick={() => setPlayers("2")}>Player2</Button>

          <Button
            onClick={() => handleSubmit()}
            sx={{
              fontSize: "8vw",
              fontWeight: "bold",
              color: "white",
              backgroundColor: "#ffdbdb",
              marginTop: "10%",
              border: "10px solid white",
              borderRadius: "15px",
              padding: "2px 30px 2px 30px",
            }}
          >
            タップ
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Home;
