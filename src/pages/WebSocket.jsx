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
    heartRate1: "0",
    player2: null,
    heartRate2: "0",
  });
  const [heartBeeat1, setHeartBeeat1] = useState([]);
  const [heartBeeat2, setHeartBeeat2] = useState([]);
  const [topicId, setTopicId] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [dataArray1, setDataArray1] = useState([]);
  const [dataArray2, setDataArray2] = useState([]);
  const [dataArray, setDataArray] = useState({
    array1: {},
    array2: {},
  });
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
    setHeartBeeat1((prev) => [...prev, heartRate.heartRate1]);
    setHeartBeeat2((prev) => [...prev, heartRate.heartRate2]);
    if (isRecording) {
      setDataArray1((prev) => [...prev, heartRate.heartRate1]);
      setDataArray2((prev) => [...prev, heartRate.heartRate2]);
    }
    console.log("現在のheartBeeat1配列:", heartBeeat1);
    console.log("現在のheartBeeat2配列:", heartBeeat2);
    console.log("現在のdataArray1配列:", dataArray1);
    console.log("現在のdataArray1配列:", dataArray2);
    setTopicId(heartRate.topicId || []);
  }, [heartRate]);

  const handleStart = () => {
    setIsRecording(true);
    setDataArray1([]);
    setDataArray2([]);
    console.log("記録開始しました");
  };

  const handleComplete = () => {
    setIsRecording(false);
    console.log("現在のdataArray1配列:", dataArray1);
    console.log("現在のdataArray1配列:", dataArray2);
    console.log("記録完了。データが以下に保存されました:");
    // console.log("heart2:", heart2);
    sendArray(dataArray1, dataArray2);
  };
  const sendArray = (heart1, heart2) => {
    console.log(`array1: ${heart1} array2: ${heart2}`);
    const data = { array1: heart1, array2: heart2 };

    console.log("ただいま、メールを送信してます", data);
    const url = "https://hartlink-websocket-api.onrender.com/topicArray";

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
        console.log(`Suuce: ${data}`);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const topicArray = () => {
    console.log("topicArray動いたよ");
    const url = "https://hartlink-websocket-api.onrender.com/getTopicArray";

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("ネットワーク応答が正常ではありません");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        console.log("array1:", data.array1);
        console.log("array2:", data.array2);
        console.log("th10:", data.array1["0"]);
        setDataArray(data);

        console.log(`array1: ${data.array1}  array2: ${data.array2}`);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  console.log(`dataArray: ${dataArray}`);

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
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleStart()}
            >
              開始
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleComplete()}
            >
              完了
            </Button>
          </Stack>
        </Box>
      ))}
      <Button onClick={() => topicArray()}>getTopicArray</Button>

      <Button
        variant="contained"
        color="primary"
        // {...console.log(`heartBeeat1: ${heartBeeat1}`)}
        // {...console.log(`heartBeeat2: ${heartBeeat2}`)}
        onClick={() =>
          navigate("/result", {
            state: {
              heartRate1: heartBeeat1,
              heartRate2: heartBeeat2,
              topicId: topicId,
              dataArray: dataArray,
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
