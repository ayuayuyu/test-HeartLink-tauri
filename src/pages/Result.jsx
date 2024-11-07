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

  // location.stateがundefinedの場合、空のオブジェクトをデフォルトにする
  const {
    heartRate1 = [],
    heartRate2 = [],
    topicId = "",
    dataArray = { array1: [], array2: [] },
  } = location.state || {};

  // 必要な配列データがあれば取得、なければ空配列にして初期化
  const h1 = heartRate1;
  const h2 = heartRate2;
  const th10 = dataArray.array1[0];
  const th11 = dataArray.array1[1];
  const th12 = dataArray.array1[2];
  const th13 = dataArray.array1[3];

  const th20 = dataArray.array2[0];
  const th21 = dataArray.array2[1];
  const th22 = dataArray.array2[2];
  const th23 = dataArray.array2[3];

  // データ確認のためのコンソール出力
  console.log(`dataArray:`, dataArray);
  console.log(`array1[0]:`, dataArray.array1?.[0]);
  console.log(`array2[2]:`, dataArray.array2?.[0]);
  console.log(`th10 ${th10}`);
  console.log(`th20 ${th20}`);

  // 配列のデータが存在するかを確認した上でfilterを適用
  const hr11 = h1.filter((value) => value != 0);
  const hr21 = h2.filter((value) => value != 0);

  const thrr10 = th10.filter((value) => value != 0);
  const thrr20 = th20.filter((value) => value != 0);
  const thrr11 = th11.filter((value) => value != 0);
  const thrr21 = th21.filter((value) => value != 0);
  const thrr12 = th12.filter((value) => value != 0);
  const thrr22 = th22.filter((value) => value != 0);
  const thrr13 = th13.filter((value) => value != 0);
  const thrr23 = th23.filter((value) => value != 0);
  const filter1 = (heart) => {
    const validHeartRates = heart
      .map((value) => parseFloat(value)) // 文字列を数値に変換
      .filter((value) => !isNaN(value) && value !== 0); // NaN や 0 を除外
    return validHeartRates;
  };

  const hr1 = filter1(hr11);
  const hr2 = filter1(hr21);
  const labels1 = Array.from({ length: hr1.length }, (_, i) => i + 1);
  const labels2 = Array.from({ length: hr2.length }, (_, i) => i + 1);
  // カンマで分割して、parseFloatを使って数値に変換
  const filter = (array) => {
    const parsedHeartRates = String(array[0])
      .split(",")
      .map((value) => {
        const parsedValue = parseFloat(value);
        return parsedValue;
      });
    // NaN や 0 を除外
    const validHeartRates = parsedHeartRates.filter(
      (value) => !isNaN(value) && value !== 0
    );
    return validHeartRates;
  };
  const thr10 = filter(thrr10);
  const thr20 = filter(thrr20);
  const thr11 = filter(thrr11);
  const thr21 = filter(thrr21);
  const thr12 = filter(thrr12);
  const thr22 = filter(thrr22);
  const thr13 = filter(thrr13);
  const thr23 = filter(thrr23);
  console.log(`thr10:${thr10}`);
  console.log(`thr20:${thr20}`);
  const labels3 = Array.from({ length: thr10.length }, (_, i) => i + 1);
  const labels4 = Array.from({ length: thr11.length }, (_, i) => i + 1);
  const labels5 = Array.from({ length: thr12.length }, (_, i) => i + 1);
  const labels6 = Array.from({ length: thr13.length }, (_, i) => i + 1);
  const labels7 = Array.from({ length: thr20.length }, (_, i) => i + 1);
  const labels8 = Array.from({ length: thr21.length }, (_, i) => i + 1);
  const labels9 = Array.from({ length: thr22.length }, (_, i) => i + 1);
  const labels10 = Array.from({ length: thr23.length }, (_, i) => i + 1);
  // const labels3 = thr10
  //     ? Array.from({ length: thr10.length }, (_, i) => i + 1)
  //     : [];
  //   const labels4 = thr11
  //     ? Array.from({ length: thr11.length }, (_, i) => i + 1)
  //     : [];
  //   const labels5 = thr12
  //     ? Array.from({ length: thr12.length }, (_, i) => i + 1)
  //     : [];
  //   const labels6 = thr13
  //     ? Array.from({ length: thr13.length }, (_, i) => i + 1)
  //     : [];

  //   const labels7 = thr20
  //     ? Array.from({ length: thr20.length }, (_, i) => i + 1)
  //     : [];
  //   const labels8 = thr21
  //     ? Array.from({ length: thr21.length }, (_, i) => i + 1)
  //     : [];
  //   const labels9 = thr22
  //     ? Array.from({ length: thr22.length }, (_, i) => i + 1)
  //     : [];
  //   const labels10 = thr23
  //     ? Array.from({ length: thr23.length }, (_, i) => i + 1)
  //     : [];

  //   console.log(labels1 + " " + labels2);
  //   console.log(`hr1: ${hr1}`);
  //   console.log(`hr2: ${hr2}`);

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
    const sum = heart.reduce((acc, cur) => parseInt(acc) + parseInt(cur), 0);
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
            <Line data={data1(labels3, thr10)} options={options} />
          </div>
          平均値:{avg(thr10)} 最大値:{max(thr10)} 最小値:{min(thr10)}
          <div style={{ width: "70vw", height: "auto", paddingTop: "3vh" }}>
            <Line data={data2(labels7, thr20)} options={options} />
          </div>
          <p style={{ paddingTop: "1vh" }}>{playerName2}</p>
          平均値:{avg(thr20)} 最大値:{max(thr20)} 最小値:{min(thr20)}
          <p style={{ paddingTop: "1vh" }}>
            {playerName1}&{playerName2}
          </p>
          <div style={{ width: "70vw", height: "auto", paddingTop: "3vh" }}>
            <Line
              data={data3(labels3, labels7, thr10, thr20)}
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
            <Line data={data1(labels4, thr11)} options={options} />
          </div>
          平均値:{avg(thr11)} 最大値:{max(thr11)} 最小値:{min(thr11)}
          <p style={{ paddingTop: "1vh" }}>{playerName2}</p>
          <div style={{ width: "70vw", height: "auto", paddingTop: "3vh" }}>
            <Line data={data2(labels8, thr21)} options={options} />
          </div>
          平均値:{avg(thr21)} 最大値:{max(thr21)} 最小値:{min(thr21)}
          <p style={{ paddingTop: "1vh" }}>
            {playerName1}&{playerName2}
          </p>
          <div style={{ width: "70vw", height: "auto", paddingTop: "3vh" }}>
            <Line
              data={data3(labels4, labels8, thr11, thr21)}
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
            <Line data={data1(labels5, thr12)} options={options} />
          </div>
          平均値:{avg(thr12)} 最大値:{max(thr12)} 最小値:{min(thr12)}
          <p style={{ paddingTop: "1vh" }}>{playerName2}</p>
          <div style={{ width: "70vw", height: "auto", paddingTop: "3vh" }}>
            <Line data={data2(labels9, thr22)} options={options} />
          </div>
          平均値:{avg(thr22)} 最大値:{max(thr22)} 最小値:{min(thr22)}
          <p style={{ paddingTop: "1vh" }}>
            {playerName1}&{playerName2}
          </p>
          <div style={{ width: "70vw", height: "auto", paddingTop: "3vh" }}>
            <Line
              data={data3(labels5, labels9, thr12, thr22)}
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
            <Line data={data1(labels6, thr13)} options={options} />
          </div>
          平均値:{avg(thr13)} 最大値:{max(thr13)} 最小値:{min(thr13)}
          <p style={{ paddingTop: "1vh" }}>{playerName2}</p>
          <div style={{ width: "70vw", height: "auto", paddingTop: "3vh" }}>
            <Line data={data2(labels10, thr23)} options={options} />
          </div>
          平均値:{avg(thr23)} 最大値:{max(thr23)} 最小値:{min(thr23)}
          <p style={{ paddingTop: "1vh" }}>
            {playerName1}&{playerName2}
          </p>
          <div style={{ width: "70vw", height: "auto", paddingTop: "3vh" }}>
            <Line
              data={data3(labels6, labels10, thr13, thr23)}
              options={options}
            />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Result;
