import {
  Box,
  Typography,
  Button,
  Stack,
  FormControl,
  Input,
} from "@mui/material";
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
export default function NormralTopic({ player, count, setCount }) {
  const navigate = useNavigate();
  const sendTopic = (id) => {
    console.log(`Normal_id: ${id}`);
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
      <h4>NormralTopic</h4>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {topicNormal.map((normal) => (
          <Button
            key={normal.id}
            style={{ padding: "10px 0" }}
            onClick={() => sendTopic(normal.id)}
          >
            {normal.topic}
          </Button>
        ))}
      </div>
    </>
  );
}
