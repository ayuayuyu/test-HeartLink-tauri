import { Button } from "@mui/material";

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
export default function EasyTopic() {
  return (
    <>
      <h4>EasyTopic</h4>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {topicEasy.map((easy) => (
          <Button key={easy.id} style={{ padding: "10px 0" }}>
            {easy.topic}
          </Button>
        ))}
      </div>
    </>
  );
}
