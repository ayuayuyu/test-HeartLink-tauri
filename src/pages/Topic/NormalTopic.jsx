import { Box, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

const topicNormal = [
  { id: 11, topic: "好きな異性のタイプについて話す" },
  { id: 12, topic: "理想のデートプランを話す" },
  { id: 13, topic: "自分がドキッとする瞬間を話す" },
  { id: 14, topic: "誰かに言われて嬉しかった言葉を話す" },
  { id: 15, topic: "恋愛で一番大切にしていることを話す" },
  { id: 16, topic: "これまでの恋愛経験で印象に残っているエピソードを話す" },
  { id: 17, topic: "好きな異性の仕草を話す" },
  { id: 18, topic: "理想の結婚観について話す" },
  { id: 19, topic: "恋愛に関する自分のポリシーを話す" },
  { id: 20, topic: "初対面の異性で最初に気になるポイントを話す" },
];

export default function NormalTopic({ player, count, setCount }) {
  const navigate = useNavigate();

  const sendTopic = (id) => {
    console.log(`Normal_id: ${id}`);
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
        Normal Topic
      </Typography>

      <Stack
        spacing={2}
        alignItems="center"
        sx={{ width: "100%", maxWidth: 500 }}
      >
        {topicNormal.map((normal) => (
          <Button
            key={normal.id}
            variant="contained"
            onClick={() => sendTopic(normal.id)}
            sx={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "#fff",
              backgroundColor: "#2196F3",
              width: "100%",
              padding: "15px 20px",
              borderRadius: "10px",
              ":hover": { backgroundColor: "#1976D2" },
            }}
          >
            {normal.topic}
          </Button>
        ))}
      </Stack>
    </Box>
  );
}
