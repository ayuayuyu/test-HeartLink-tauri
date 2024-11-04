import { Container } from "@mui/material";
import WebSocket from "./WebSocket";
import { Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { destr } from "destr";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
  },
};

function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const [player, setPlayer] = useState("");
  const [playerName1, setPlayerName1] = useState("player1");
  const [playerName2, setPlayerName2] = useState("player2");

  const getName = () => {
    const url = "https://hartlink-websocket-api.onrender.com/getName";

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
        // if (data.player1) {
        //   playerName1 = destr(data.player1);
        // } else if (data.player2) {
        //   playerName2 = data.player2;
        // }
        setPlayer(destr(data));
        console.log(
          `player1: ${data.player1}  player2: ${destr(data).player2}`
        );
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const reset = () => {
    const url = "https://hartlink-websocket-api.onrender.com/reset";

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
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    setPlayerName1(player.player1);
    setPlayerName2(player.player2);
    console.log(`player1だよ:${player.player1}  player2だよ:${player.player2}`);
  }, [player]);
  const datasets = location.state;
  const h1 = datasets.heartRate1;
  const h2 = datasets.heartRate2;
  const hr11 = h1.filter((value) => value != 0);
  const hr21 = h2.filter((value) => value != 0);
  const filter = (heart) => {
    const validHeartRates = heart.filter(
      (value) => value !== "" && !isNaN(value)
    );
    return validHeartRates;
  };
  const hr1 = filter(hr11);
  const hr2 = filter(hr21);
  //   console.log(hr1 + " " + hr2);
  const labels1 = Array.from({ length: hr1.length }, (_, i) => i + 1);
  const labels2 = Array.from({ length: hr2.length }, (_, i) => i + 1);
  //   console.log(labels1 + " " + labels2);
  //   console.log(`hr1: ${hr1}`);
  console.log(`hr2: ${hr2}`);

  const data1 = {
    labels: labels1,
    datasets: [
      {
        label: "心拍",
        data: hr1,
        fill: false,
        borderColor: "rgb(0, 191, 255)",
        // backgroundColor: "rgba(0,0,0)",
        tension: 0.1,
      },
    ],
  };

  const data2 = {
    labels: labels2,
    datasets: [
      {
        label: "心拍",
        data: hr2,
        fill: false,
        borderColor: "rgb(255, 0, 0)",
        tension: 0.1,
      },
    ],
  };

  const data3 = {
    labels: labels1.length > labels2.length ? labels1 : labels2, // より長いラベル配列を使用
    datasets: [
      {
        label: "心拍",
        data: hr1,
        fill: false,
        borderColor: "rgb(0, 191, 255)",
        tension: 0.1,
      },
      {
        label: "心拍",
        data: hr2,
        fill: false,
        borderColor: "rgb(255, 0, 0)",
        tension: 0.1,
      },
    ],
  };

  const avg = (heart) => {
    const sum = heart.reduce((acc, cur) => acc + cur);
    // console.log(`sum:${sum} length:${heart.length}`);
    // console.log(`平均値:${sum / heart.length}`);
    return Math.round(sum / heart.length);
  };
  const max = (heart) => {
    const max = heart.reduce((acc, cur) => Math.max(acc, cur));
    return max;
  };
  const min = (heart) => {
    const max = heart.reduce((acc, cur) => Math.min(acc, cur));
    return max;
  };

  return (
    <>
      <Button onClick={() => getName()}>getName</Button>
      <button onClick={() => reset()}>button</button>
      <p style={{ paddingTop: "1vh" }}>{playerName1}</p>
      <div style={{ width: "70vw", height: "auto", paddingTop: "3vh" }}>
        <Line data={data1} options={options} />
      </div>
      <h3>
        平均値:{avg(hr1)} 最大値:{max(hr1)} 最小値:{min(hr1)}
      </h3>
      <p style={{ paddingTop: "1vh" }}>{playerName2}</p>
      <div style={{ width: "70vw", height: "auto", paddingTop: "3vh" }}>
        <Line data={data2} options={options} />
      </div>
      <h3>
        平均値:{avg(hr2)} 最大値:{max(hr2)} 最小値:{min(hr2)}
      </h3>
      <p style={{ paddingTop: "1vh" }}>
        {playerName1}&{playerName2}
      </p>
      <div style={{ width: "70vw", height: "auto", paddingTop: "3vh" }}>
        <Line data={data3} options={options} />
      </div>
    </>
  );
}

export default Result;
