"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

export const SwiperContainer = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      breakpoints={{
        768: {
          slidesPerView: 3,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 50,
        },
      }}
    >
      <SwiperSlide>
        <div>Slide 1</div>
      </SwiperSlide>
      <SwiperSlide>
        <div>Slide 2</div>
      </SwiperSlide>
      <SwiperSlide>
        <div>Slide 3</div>
      </SwiperSlide>
      <SwiperSlide>
        <div>Slide 4</div>
      </SwiperSlide>
    </Swiper>
  );
};
