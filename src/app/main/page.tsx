import React from "react";
import { Carousel } from "antd";
import { MoviePage } from "@/components/main/Movie";

const carouselStyle = {
  width: "800px",
  height: "600px",
  backgroundColor: "#fff", // 회색 배경
  display: "flex",
  justifyContent: "center",
};
const MainPage = () => {
  return (
    <Carousel dots style={carouselStyle}>
      <div style={{ padding: "24px" }}>
        <MoviePage />
      </div>
      <div>
        <MoviePage />
      </div>
    </Carousel>
  );
};

export default MainPage;
