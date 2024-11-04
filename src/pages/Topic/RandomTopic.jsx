import React, { useState } from "react";
import { Button, Typography, Container } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

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

export default function RandomTopic() {
  const [currentTopic, setCurrentTopic] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const player = location.state.player;
  const [count, setCount] = useState(0);

  const getRandomTopic = () => {
    const index = Math.floor(Math.random() * randomTopics.length);
    sendTopic(index);
    setCurrentTopic(randomTopics[index]);
  };

  const sendTopic = (id) => {
    console.log(`random_id: ${id}, count: ${count}`);
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
    <Container style={{ textAlign: "center", padding: "20px" }}>
      <Typography variant="h4">2回ランダムボタンを押してね!</Typography>
      <Typography variant="h6">Random Topic</Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px",
        }}
      >
        <Button
          onClick={getRandomTopic}
          variant="contained"
          color="primary"
          style={{ marginBottom: "20px" }}
        >
          ランダムなお題
        </Button>
        {currentTopic && (
          <Button variant="outlined" color="secondary">
            {currentTopic.topic}
          </Button>
        )}
      </div>
    </Container>
  );
}
