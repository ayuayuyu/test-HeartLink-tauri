import { Button, Typography, Box, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const topicHard = [
  { id: 1, topic: "相手の外見や性格で素敵だと思う部分を話す" },
  { id: 2, topic: "相手を恋人と考えてしてほしいことや願望を話す" },
  { id: 3, topic: "相手と付き合うことを想像したらどう思うか話す" },
  { id: 4, topic: "相手に一番ときめいた瞬間を話す" },
  { id: 5, topic: "相手を抱きしめたいと思う瞬間を話す" },
  { id: 6, topic: "相手に一番、求めるもているもの" },
  { id: 7, topic: "一番寂しかった恋愛経験を話す" },
  { id: 8, topic: "相手を好きな人としてどんな風に告白したいか話す" },
  { id: 9, topic: "相手にどのようにプロポーズをするか" },
  { id: 10, topic: "相手に対して今感じていることを素直に話す" },
];

export default function HardTopic({ player, count, setCount }) {
  const navigate = useNavigate();

  const sendTopic = (id) => {
    console.log(`Hard_id: ${id}`);
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
        Hard Topic
      </Typography>

      <Stack
        spacing={2}
        alignItems="center"
        sx={{ width: "100%", maxWidth: 500 }}
      >
        {topicHard.map((hard) => (
          <Button
            key={hard.id}
            variant="contained"
            onClick={() => sendTopic(hard.id)}
            sx={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "#fff",
              backgroundColor: "#f44336",
              width: "100%",
              padding: "15px 20px",
              borderRadius: "10px",
              ":hover": { backgroundColor: "#d32f2f" },
            }}
          >
            {hard.topic}
          </Button>
        ))}
      </Stack>
    </Box>
  );
}
