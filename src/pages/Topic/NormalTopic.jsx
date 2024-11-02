import {
  Box,
  Typography,
  Button,
  Stack,
  FormControl,
  Input,
} from "@mui/material";

const topicNormal = [
  { id: 1, topic: "好きな異性のタイプについて話す" },
  { id: 2, topic: "理想のデートプランを話す" },
  { id: 3, topic: "自分がドキッとする瞬間を話す" },
  { id: 4, topic: "誰かに言われて嬉しかった言葉を話す" },
  { id: 5, topic: "恋愛で一番大切にしていることを話す" },
  { id: 6, topic: "これまでの恋愛経験で印象に残っているエピソードを話す" },
  { id: 7, topic: "好きな異性の仕草を話す" },
  { id: 8, topic: "理想の結婚観について話す" },
  { id: 9, topic: "恋愛に関する自分のポリシーを話す" },
  { id: 10, topic: "初対面の異性で最初に気になるポイントを話す" },
];
export default function NormralTopic() {
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
          <Button key={normal.id} style={{ padding: "10px 0" }}>
            {normal.topic}
          </Button>
        ))}
      </div>
    </>
  );
}
