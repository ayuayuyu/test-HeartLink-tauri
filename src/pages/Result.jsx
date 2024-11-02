import { Container } from "@mui/material";
import WebSocket from "./WebSocket";
import { useNavigate, useLocation } from "react-router-dom";
import { Line } from "react-chartjs-2";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
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

  let playerName1 = "player1";
  let playerName2 = "player2";

  const datasets = location.state;
  const h1 = datasets.heartRate1;
  const h2 = datasets.heartRate2;
  const hr11 = h1.filter((value) => value != 0);
  const hr21 = h2.filter(
    (value) => parseFloat(value) !== 0 && parseFloat(value) !== 0.0
  );
  const filter = (heart) => {
    const validHeartRates = heart.filter(
      (value) => value !== "" && !isNaN(value)
    );
    return validHeartRates;
  };
  const hr1 = filter(hr11);
  const hr2 = filter(hr21);
  console.log(hr1 + " " + hr2);
  const labels1 = Array.from({ length: hr1.length }, (_, i) => i + 1);
  const labels2 = Array.from({ length: hr2.length }, (_, i) => i + 1);
  console.log(labels1 + " " + labels2);
  console.log(`hr1: ${hr1}`);
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
    console.log(`sum:${sum} length:${heart.length}`);
    console.log(`平均値:${sum / heart.length}`);
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
      <button onClick={() => navigate("/")}>button</button>
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
