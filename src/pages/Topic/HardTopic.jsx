import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const topicHard = [
  { id: 21, topic: "相手の外見や性格で素敵だと思う部分を話す" },
  { id: 22, topic: "相手を恋人と考えてしてほしいことや願望を話す" },
  { id: 23, topic: "相手と付き合うことを想像したらどう思うか話す" },
  { id: 24, topic: "相手に一番ときめいた瞬間を話す" },
  { id: 25, topic: "相手を抱きしめたいと思う瞬間を話す" },
  { id: 26, topic: "相手に一番、求めるもているもの" },
  { id: 27, topic: "一番寂しかった恋愛経験を話す" },
  { id: 28, topic: "相手を好きな人としてどんな風に告白したいか話す" },
  { id: 29, topic: "相手にどのようにプロポーズをするか" },
  { id: 30, topic: "相手に対して今感じていることを素直に話す" },
];
export default function HardTopic({ player, count, setCount }) {
  const navigate = useNavigate();
  const sendTopic = (id) => {
    console.log(`Hard_id: ${id}`);
    const data = { player: player, id: id }; // dataを正しい形式で設定

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
        if (count == 1) {
          navigate(`/room`);
        }
        setCount(1);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <>
      <h4>HardTopic</h4>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {topicHard.map((hard) => (
          <Button
            key={hard.id}
            style={{ padding: "10px 0" }}
            onClick={() => sendTopic(hard.id)}
          >
            {hard.topic}
          </Button>
        ))}
      </div>
    </>
  );
}
