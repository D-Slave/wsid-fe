"use client";

import React, { useContext, useRef } from "react";
import { Carousel } from "antd";
import { MoviePage } from "@/components/main/Movie";
import type { CarouselRef } from "antd/es/carousel";
import {
  RecommendationContext,
  RecommendationType,
} from "@/context/RecommendationContext";
import CafePage from "@/components/main/Cafe";
import RecommendationTap from "@/components/main/RecommendationTap";
import FoodPage from "@/components/main/Food";
import MusicPage from "@/components/main/Music";

const carouselStyle = {
  width: "800px",
  height: "600px",
  borderRadius: "16px",
  border: "1px solid rgb(90, 92, 94)",
  opacity: 0.8,
};

const TapButton: Tab[] = [
  {
    id: 1,
    title: "영화",
    bgColor: "#1C2436",
  },
  {
    id: 2,
    title: "카페",
    bgColor: "#1D2D25",
  },
  {
    id: 3,
    title: "맛집",
    bgColor: "#32261B",
  },
  {
    id: 4,
    title: "음악",
    bgColor: "#322133",
  },
];

export type Tab = {
  id: number;
  title: RecommendationType;
  bgColor: string;
};

const MainPage = () => {
  const { activeTab, setActiveTab } = useContext(RecommendationContext)!;

  const carouselRef = useRef<CarouselRef>(null);

  const handleTabClick = (tab: Tab, idx: number) => {
    setActiveTab(tab.title);

    if (carouselRef.current) {
      carouselRef.current.goTo(idx);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
        {TapButton.map((tab, idx) => (
          <RecommendationTap
            key={tab.id}
            title={tab.title}
            bgColor={tab.bgColor}
            onClick={() => handleTabClick(tab, idx)}
          />
        ))}
      </div>

      {/* 캐러셀 */}
      <Carousel
        ref={carouselRef}
        dots
        arrows
        infinite={false}
        style={{
          ...carouselStyle,
          backgroundColor: TapButton.find((t) => t.title === activeTab)
            ?.bgColor,
        }}
        afterChange={(current) => {
          const currentTab = TapButton[current];
          if (currentTab) {
            setActiveTab(currentTab.title);
          }
        }}
      >
        <div>
          <MoviePage />
        </div>
        <div>
          <CafePage />
        </div>
        <div>
          <FoodPage />
        </div>
        <div>
          <MusicPage />
        </div>
      </Carousel>
    </div>
  );
};

export default MainPage;
