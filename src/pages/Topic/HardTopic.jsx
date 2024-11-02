import { Button } from "@mui/material";

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
export default function HardTopic() {
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
          <Button key={hard.id} style={{ padding: "10px 0" }}>
            {hard.topic}
          </Button>
        ))}
      </div>
    </>
  );
}
