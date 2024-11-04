import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ReconnectingWebSocket from "reconnecting-websocket";
import { destr } from "destr";
import Topics from "./Topic/Topics";
import { Box, Typography, Button, Stack } from "@mui/material";

const WebSocket = () => {
  const navigate = useNavigate();
  const url = `wss://hartlink-websocket-api.onrender.com/ws`;

  const [heartRate, setHeartRate] = useState({
    player1: null,
    heartRate1: 0.0,
    player2: null,
    heartRate2: 0.0,
  });
  const [heartBeeat1, setHeartBeeat1] = useState([]);
  const [heartBeeat2, setHeartBeeat2] = useState([]);
  const [topicId, setTopicId] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [dataArray1, setDataArray1] = useState([]);
  const [dataArray2, setDataArray2] = useState([]);
  const [heart1, setHeart1] = useState([]);
  const [heart2, setHeart2] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    const websocket = new ReconnectingWebSocket(url);
    socketRef.current = websocket;

    websocket.onopen = () => {
      console.log("WebSocket connection established");
      websocket.send("0");
    };

    websocket.onmessage = (event) => {
      const data = destr(event.data);
      setHeartRate(data);
      console.log("Received HeartRate:", data);
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    console.log("心拍: ", heartRate.heartRate1);
    if (isRecording) {
      setHeartBeeat1((prev) => [...prev, heartRate.heartRate1]);
      setHeartBeeat2((prev) => [...prev, heartRate.heartRate2]);
      setDataArray1((prev) => [...prev, heartRate.heartRate1]);
      setDataArray2((prev) => [...prev, heartRate.heartRate2]);

      console.log("現在のheartBeeat1配列:", heartBeeat1);
      console.log("現在のheartBeeat2配列:", heartBeeat2);
    }
    setTopicId(heartRate.topicId || []);
  }, [heartRate, isRecording]);

  const handleStart = () => {
    setIsRecording(true);
    setDataArray1([]);
    setDataArray2([]);
    console.log("記録開始しました");
  };

  const handleComplete = () => {
    setIsRecording(false);
    setHeart1((prev) => [...prev, dataArray1]);
    setHeart2((prev) => [...prev, dataArray2]);
    console.log("記録完了。データが以下に保存されました:");
    console.log("heart1:", heart1);
    console.log("heart2:", heart2);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
      sx={{ backgroundColor: "#f0f0f0", padding: "20px" }}
    >
      <Typography variant="h3" gutterBottom color="black">
        WebSocket 接続
      </Typography>

      {Array.from({ length: 4 }, (_, index) => (
        <Box key={index} mb={4} textAlign="center">
          <Typography color="black" variant="h5">
            お題{index + 1}{" "}
          </Typography>
          {topicId[index] !== undefined ? (
            <Topics id={topicId[index]} />
          ) : (
            <Typography variant="body1" color="textSecondary">
              トピックがまだ設定されていません。
            </Typography>
          )}
          <Stack spacing={2} mt={2} justifyContent="center" alignItems="center">
            <Button variant="contained" color="primary" onClick={handleStart}>
              開始
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleComplete}
            >
              完了
            </Button>
          </Stack>
        </Box>
      ))}

      <Button
        variant="contained"
        color="primary"
        onClick={() =>
          navigate("/result", {
            state: {
              heartRate1: heartBeeat1,
              heartRate2: heartBeeat2,
              topicHeart1: heart1,
              topicHeart2: heart2,
              topicId: topicId,
            },
          })
        }
        sx={{ marginTop: "20px" }}
      >
        次のページ
      </Button>

      <Typography color="black" variant="h6" sx={{ marginTop: "20px" }}>
        心拍数: {heartRate.player1}: {heartRate.heartRate1}
      </Typography>
      <Typography color="black" variant="h6">
        心拍数: {heartRate.player2}: {heartRate.heartRate2}
      </Typography>
    </Box>
  );
};

export default WebSocket;
