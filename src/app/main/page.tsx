"use client";

import React, { useContext } from "react";
import { Button, Divider, Row, Col } from "antd";
import { useRouter } from "next/navigation";
import { RecommendationContext } from "@/context/RecommendationContext";
import type { Category } from "@/components/main/constants/Category";
import { Categories } from "@/components/main/constants/CategoriesData";
import MainCard from "@/components/main/MainCard";
import MainCategories from "@/components/main/MainCategories";

export default function MainPage() {
  const router = useRouter();
  const { setActiveTab } = useContext(RecommendationContext)!;

  const goto = (c: Category) => {
    setActiveTab(c.key);
    router.push(c.path);
  };

  const randomGo = () => {
    const r = Categories[Math.floor(Math.random() * Categories.length)];
    goto(r);
  };

  return (
    <Row
      style={{
        width: "100vw",
        margin: "0 auto",
        padding: "16px",
      }}
      gutter={[16, 40]}
      align="top"
    >
      <MainCard />
      <MainCategories categories={Categories} />

      <Col span={24}>
        <Divider style={{ margin: "4px 0 12px", borderColor: "#E9E9EF" }} />

        {/* 랜덤 추천받기 버튼 */}

        <Button
          type="primary"
          size="large"
          onClick={randomGo}
          style={{
            width: "100%",
            height: 44,
            borderRadius: 22,
            background: "#6F6CF3",
          }}
        >
          랜덤 추천받기
        </Button>
      </Col>
    </Row>
  );
}
