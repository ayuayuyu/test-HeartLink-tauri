import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
// Swiperのスタイル
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import EasyTopic from "./EasyTopic";
import NormralTopic from "./NormalTopic";
import HardTopic from "./HardTopic";
import { useNavigate, useLocation } from "react-router-dom";

// カスタムCSS
// import "./styles.css";

export default function Topic() {
  const location = useLocation();
  const player = location.state.player;
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>お題をにこ押してください</h1>
      <Swiper
        style={{ paddingBottom: "20px" }} // 下に20pxの空白
        dir="rtl"
        navigation={true}
        pagination={{
          clickable: true,
        }}
        modules={[Navigation, Pagination]}
      >
        <SwiperSlide style={{ padding: "10px 10px" }}>
          <HardTopic player={player} count={count} setCount={setCount} />
        </SwiperSlide>
        <SwiperSlide style={{ padding: "10px 10px" }}>
          <NormralTopic player={player} count={count} setCount={setCount} />
        </SwiperSlide>
        {/* <SwiperSlide style={{ padding: "10px 10px" }}>
          <EasyTopic player={player} count={count} setCount={setCount} />
        </SwiperSlide> */}
      </Swiper>
    </>
  );
}
