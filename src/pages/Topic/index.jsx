import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Swiperのスタイル
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import EasyTopic from "./EasyTopic";
import NormralTopic from "./NormalTopic";
import HardTopic from "./HardTopic";

// カスタムCSS
// import "./styles.css";

export default function Topic() {
  return (
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
        <HardTopic />
      </SwiperSlide>
      <SwiperSlide style={{ padding: "10px 10px" }}>
        <NormralTopic />
      </SwiperSlide>
      <SwiperSlide style={{ padding: "10px 10px" }}>
        <EasyTopic />
      </SwiperSlide>
    </Swiper>
  );
}
