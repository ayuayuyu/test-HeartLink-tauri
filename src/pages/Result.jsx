import { Container } from "@mui/material";
import WebSocket from "./WebSocket";
import { Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { Line } from "react-chartjs-2";
import Topics from "./Topic/Topics";
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
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
// Swiperのスタイル
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
  const th1 = datasets.topicHeart1;
  const th2 = datasets.topicHeart2;
  const topicId = datasets.topicId;
  const hr11 = h1.filter((value) => value != 0);
  const hr21 = h2.filter((value) => value != 0);
  const thr11 = th1.filter((value) => value != 0);
  const thr21 = th2.filter((value) => value != 0);
  const filter = (heart) => {
    const validHeartRates = heart.filter(
      (value) => value !== "" && !isNaN(value)
    );
    return validHeartRates;
  };
  const hr1 = filter(hr11);
  const hr2 = filter(hr21);
  const thr1 = filter(thr11);
  const thr2 = filter(thr21);
  //   console.log(hr1 + " " + hr2);
  const labels1 = Array.from({ length: hr1.length }, (_, i) => i + 1);
  const labels2 = Array.from({ length: hr2.length }, (_, i) => i + 1);
  //   const labels3 = Array.from({ length: thr1[0].length }, (_, i) => i + 1);
  //   const labels4 = Array.from({ length: thr1[1].length }, (_, i) => i + 1);
  //   const labels5 = Array.from({ length: thr1[2].length }, (_, i) => i + 1);
  //   const labels6 = Array.from({ length: thr1[3].length }, (_, i) => i + 1);
  //   const labels7 = Array.from({ length: thr2[0].length }, (_, i) => i + 1);
  //   const labels8 = Array.from({ length: thr2[1].length }, (_, i) => i + 1);
  //   const labels9 = Array.from({ length: thr2[2].length }, (_, i) => i + 1);
  //   const labels10 = Array.from({ length: thr2[3].length }, (_, i) => i + 1);
  const labels3 = thr1[0]
    ? Array.from({ length: thr1[0].length }, (_, i) => i + 1)
    : [];
  const labels4 = thr1[1]
    ? Array.from({ length: thr1[1].length }, (_, i) => i + 1)
    : [];
  const labels5 = thr1[2]
    ? Array.from({ length: thr1[2].length }, (_, i) => i + 1)
    : [];
  const labels6 = thr1[3]
    ? Array.from({ length: thr1[3].length }, (_, i) => i + 1)
    : [];

  const labels7 = thr2[0]
    ? Array.from({ length: thr2[0].length }, (_, i) => i + 1)
    : [];
  const labels8 = thr2[1]
    ? Array.from({ length: thr2[1].length }, (_, i) => i + 1)
    : [];
  const labels9 = thr2[2]
    ? Array.from({ length: thr2[2].length }, (_, i) => i + 1)
    : [];
  const labels10 = thr2[3]
    ? Array.from({ length: thr2[3].length }, (_, i) => i + 1)
    : [];

  //   console.log(labels1 + " " + labels2);
  //   console.log(`hr1: ${hr1}`);
  console.log(`hr2: ${hr2}`);

  const data1 = (labels, data) => {
    return {
      labels: labels,
      datasets: [
        {
          label: "心拍",
          data: data,
          fill: false,
          borderColor: "rgb(0, 191, 255)",
          // backgroundColor: "rgba(0,0,0)",
          tension: 0.1,
        },
      ],
    };
  };

  const data2 = (labels, data) => {
    return {
      labels: labels,
      datasets: [
        {
          label: "心拍",
          data: data,
          fill: false,
          borderColor: "rgb(255, 0, 0)",
          // backgroundColor: "rgba(0,0,0)",
          tension: 0.1,
        },
      ],
    };
  };

  const data3 = (labels1, labels2, data1, data2) => {
    return {
      labels: labels1.length > labels2.length ? labels1 : labels2, // より長いラベル配列を使用
      datasets: [
        {
          label: "心拍",
          data: data1,
          fill: false,
          borderColor: "rgb(0, 191, 255)",
          tension: 0.1,
        },
        {
          label: "心拍",
          data: data2,
          fill: false,
          borderColor: "rgb(255, 0, 0)",
          tension: 0.1,
        },
      ],
    };
  };

  const avg = (heart) => {
    if (!heart || heart.length === 0) return 0; // 配列が定義されていない場合または空の場合は 0 を返す
    const sum = heart.reduce((acc, cur) => acc + cur, 0);
    return Math.round(sum / heart.length);
  };

  const max = (heart) => {
    if (!heart || heart.length === 0) return 0; // 配列が空の場合は 0 を返す
    return heart.reduce((acc, cur) => Math.max(acc, cur), -Infinity);
  };

  const min = (heart) => {
    if (!heart || heart.length === 0) return 0; // 配列が空の場合は 0 を返す
    return heart.reduce((acc, cur) => Math.min(acc, cur), Infinity);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Swiper
        style={{ paddingBottom: "20px", width: "80%" }} // 下に20pxの空白と幅80%
        dir="rtl"
        navigation={true}
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
      >
        <Button onClick={() => getName()}>getName</Button>
        <button onClick={() => reset()}>button</button>
        <SwiperSlide style={{ padding: "10px 10px" }}>
          <p style={{ paddingTop: "1vh" }}>{playerName1}</p>
          <div style={{ width: "70vw", height: "auto", paddingTop: "3vh" }}>
            <Line data={data1(labels1, hr1)} options={options} />
          </div>
          <h3>
            平均値:{avg(hr1)} 最大値:{max(hr1)} 最小値:{min(hr1)}
          </h3>
          <p style={{ paddingTop: "1vh" }}>{playerName2}</p>
          <div style={{ width: "70vw", height: "auto", paddingTop: "3vh" }}>
            <Line data={data2(labels2, hr2)} options={options} />
          </div>
          <h3>
            平均値:{avg(hr2)} 最大値:{max(hr2)} 最小値:{min(hr2)}
          </h3>
          <p style={{ paddingTop: "1vh" }}>
            {playerName1}&{playerName2}
          </p>
          <div style={{ width: "70vw", height: "auto", paddingTop: "3vh" }}>
            <Line data={data3(labels1, labels2, hr1, hr2)} options={options} />
          </div>
        </SwiperSlide>
        <SwiperSlide style={{ padding: "10px 10px" }}>
          <h4>お題1</h4>
          {topicId && topicId[0] !== undefined ? (
            <Topics id={topicId[0]} />
          ) : (
            <p>トピックがまだ設定されていません。</p>
          )}
          <p style={{ paddingTop: "1vh" }}>{playerName1}</p>
          <div style={{ width: "70vw", height: "auto", paddingTop: "3vh" }}>
            <Line data={data1(labels3, thr1[0])} options={options} />
          </div>
          平均値:{avg(thr1[0])} 最大値:{max(thr1[0])} 最小値:{min(thr1[0])}
          <div style={{ width: "70vw", height: "auto", paddingTop: "3vh" }}>
            <Line data={data2(labels7, thr2[0])} options={options} />
          </div>
          <p style={{ paddingTop: "1vh" }}>{playerName2}</p>
          平均値:{avg(thr2[0])} 最大値:{max(thr2[0])} 最小値:{min(thr2[0])}
          <p style={{ paddingTop: "1vh" }}>
            {playerName1}&{playerName2}
          </p>
          <div style={{ width: "70vw", height: "auto", paddingTop: "3vh" }}>
            <Line
              data={data3(labels3, labels7, thr1[0], thr2[0])}
              options={options}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide style={{ padding: "10px 10px" }}>
          <h4>お題2</h4>
          {topicId && topicId[1] !== undefined ? (
            <Topics id={topicId[1]} />
          ) : (
            <p>トピックがまだ設定されていません。</p>
          )}
          <p style={{ paddingTop: "1vh" }}>{playerName1}</p>
          <div style={{ width: "70vw", height: "auto", paddingTop: "3vh" }}>
            <Line data={data1(labels4, thr1[1])} options={options} />
          </div>
          平均値:{avg(thr1[1])} 最大値:{max(thr1[1])} 最小値:{min(thr1[1])}
          <p style={{ paddingTop: "1vh" }}>{playerName2}</p>
          <div style={{ width: "70vw", height: "auto", paddingTop: "3vh" }}>
            <Line data={data2(labels8, thr2[1])} options={options} />
          </div>
          平均値:{avg(thr2[1])} 最大値:{max(thr2[1])} 最小値:{min(thr2[1])}
          <p style={{ paddingTop: "1vh" }}>
            {playerName1}&{playerName2}
          </p>
          <div style={{ width: "70vw", height: "auto", paddingTop: "3vh" }}>
            <Line
              data={data3(labels4, labels8, thr1[1], thr2[1])}
              options={options}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide style={{ padding: "10px 10px" }}>
          <h4>お題3</h4>
          {topicId && topicId[2] !== undefined ? (
            <Topics id={topicId[2]} />
          ) : (
            <p>トピックがまだ設定されていません。</p>
          )}
          <p style={{ paddingTop: "1vh" }}>{playerName1}</p>
          <div style={{ width: "70vw", height: "auto", paddingTop: "3vh" }}>
            <Line data={data1(labels5, thr1[2])} options={options} />
          </div>
          平均値:{avg(thr1[2])} 最大値:{max(thr1[2])} 最小値:{min(thr1[2])}
          <p style={{ paddingTop: "1vh" }}>{playerName2}</p>
          <div style={{ width: "70vw", height: "auto", paddingTop: "3vh" }}>
            <Line data={data2(labels9, thr2[2])} options={options} />
          </div>
          平均値:{avg(thr2[2])} 最大値:{max(thr2[2])} 最小値:{min(thr2[2])}
          <p style={{ paddingTop: "1vh" }}>
            {playerName1}&{playerName2}
          </p>
          <div style={{ width: "70vw", height: "auto", paddingTop: "3vh" }}>
            <Line
              data={data3(labels5, labels9, thr1[2], thr2[2])}
              options={options}
            />
          </div>
        </SwiperSlide>
        <SwiperSlide style={{ padding: "10px 10px" }}>
          <h4>お題4</h4>
          {topicId && topicId[3] !== undefined ? (
            <Topics id={topicId[3]} />
          ) : (
            <p>トピックがまだ設定されていません。</p>
          )}
          <p style={{ paddingTop: "1vh" }}>{playerName1}</p>
          <div style={{ width: "70vw", height: "auto", paddingTop: "3vh" }}>
            <Line data={data1(labels6, thr1[3])} options={options} />
          </div>
          平均値:{avg(thr1[3])} 最大値:{max(thr1[3])} 最小値:{min(thr1[3])}
          <p style={{ paddingTop: "1vh" }}>{playerName2}</p>
          <div style={{ width: "70vw", height: "auto", paddingTop: "3vh" }}>
            <Line data={data2(labels10, thr2[3])} options={options} />
          </div>
          平均値:{avg(thr2[3])} 最大値:{max(thr2[3])} 最小値:{min(thr2[3])}
          <p style={{ paddingTop: "1vh" }}>
            {playerName1}&{playerName2}
          </p>
          <div style={{ width: "70vw", height: "auto", paddingTop: "3vh" }}>
            <Line
              data={data3(labels6, labels10, thr1[3], thr2[3])}
              options={options}
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Result;
