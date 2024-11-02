import React, { useState } from "react";
import { Button } from "@mui/material";

const randomTopics = [
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
  { id: 11, topic: "相手の外見や性格で素敵だと思う部分を話す" },
  { id: 12, topic: "相手を恋人と考えてしてほしいことや願望を話す" },
  { id: 13, topic: "相手と付き合うことを想像したらどう思うか話す" },
  { id: 14, topic: "相手に一番ときめいた瞬間を話す" },
  { id: 15, topic: "相手を抱きしめたいと思う瞬間を話す" },
  { id: 16, topic: "相手に一番、求めるもの" },
  { id: 17, topic: "一番寂しかった恋愛経験を話す" },
  { id: 18, topic: "相手を好きな人としてどんな風に告白したいか話す" },
  { id: 19, topic: "相手にどのようにプロポーズをするか" },
  { id: 20, topic: "相手に対して今感じていることを素直に話す" },
  { id: 21, topic: "好きな異性のタイプについて話す" },
  { id: 22, topic: "理想のデートプランを話す" },
  { id: 23, topic: "自分がドキッとする瞬間を話す" },
  { id: 24, topic: "誰かに言われて嬉しかった言葉を話す" },
  { id: 25, topic: "恋愛で一番大切にしていることを話す" },
  { id: 26, topic: "これまでの恋愛経験で印象に残っているエピソードを話す" },
  { id: 27, topic: "好きな異性の仕草を話す" },
  { id: 28, topic: "理想の結婚観について話す" },
  { id: 29, topic: "恋愛に関する自分のポリシーを話す" },
  { id: 30, topic: "初対面の異性で最初に気になるポイントを話す" },
];

export default function RandomTopic() {
  const [currentTopic, setCurrentTopic] = useState(null);

  function getRandomTopic() {
    const index = Math.floor(Math.random() * randomTopics.length);
    setCurrentTopic(randomTopics[index]);
  }

  return (
    <>
      <h4>Random Topic</h4>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button onClick={getRandomTopic} variant="contained">
          Show Random Topic
        </Button>
        {currentTopic && <p>{currentTopic.topic}</p>}
      </div>
    </>
  );
}
