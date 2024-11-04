import { Button, Typography, Box, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const topicEasy = [
  { id: 1, topic: "好きな食べ物について話す" },
  { id: 2, topic: "行ってみたい旅行先を話す" },
  { id: 3, topic: "趣味や特技について話す" },
  { id: 4, topic: "最近ハマっていることを話す" },
  { id: 5, topic: "好きな音楽やアーティストを話す" },
  { id: 6, topic: "子どもの頃の思い出を話す" },
  { id: 7, topic: "好きな映画やドラマについて話す" },
  { id: 8, topic: "理想の休日の過ごし方を話す" },
  { id: 9, topic: "スポーツの経験や好きなスポーツを話す" },
  { id: 10, topic: "ペットがいるなら、ペットについて話す" },
];

export default function EasyTopic({ player, count, setCount }) {
  const navigate = useNavigate();

  const sendTopic = (id) => {
    console.log(`Easy_id: ${id}`);
    const data = { player: player, id: id };
    console.log("ただいま、メールを送信してます", data);
    const url = "https://hartlink-websocket-api.onrender.com/topicId";

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
        if (count === 1) {
          navigate(`/room`);
        }
        setCount(1);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
      sx={{ backgroundColor: "#f0f0f0", padding: "20px" }}
    >
      <Typography variant="h4" gutterBottom>
        Easy Topic
      </Typography>

      <Stack
        spacing={2}
        alignItems="center"
        sx={{ width: "100%", maxWidth: 500 }}
      >
        {topicEasy.map((easy) => (
          <Button
            key={easy.id}
            variant="contained"
            onClick={() => sendTopic(easy.id)}
            sx={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "#fff",
              backgroundColor: "#4CAF50",
              width: "100%",
              padding: "15px 20px",
              borderRadius: "10px",
              ":hover": { backgroundColor: "#388E3C" },
            }}
          >
            {easy.topic}
          </Button>
        ))}
      </Stack>
    </Box>
  );
}
