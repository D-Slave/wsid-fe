"use client";

import React from "react";
import { Col, Row, Select, Space } from "antd";
import SectionHeader from "./SectionHeader";
import { MediumOutlined } from "@ant-design/icons";
import RecommendationButton from "./RecommendationButton";
import {
  peopleOptions,
  foodOptions,
  priceOptions,
} from "@/constant/foodOptions";
import RecommendationPreview from "./RecommendationPreview";

export default function CafePage() {
  return (
    <Row style={{ margin: "40px" }} gutter={40}>
      <Col span={14}>
        <SectionHeader
          icon={<MediumOutlined />}
          title="맛집 추천"
          description="간단 선택 → 지금 가기 좋은 식당 추천."
          features={[
            "대기/영업/날씨 자동 고려",
            "사진→위치→메뉴판 순서로 확인",
          ]}
        />
        <RecommendationPreview />
      </Col>
      <Col span={10}>
        {/* 필터 폼 */}
        <Space direction={"vertical"} style={{ flex: 1, color: "#C7D3F5" }}>
          <p>인원</p>
          <Select
            defaultValue="2"
            style={{ width: 200 }}
            options={peopleOptions}
          />
          <p>음식유형</p>
          <Select
            defaultValue="korean"
            style={{ width: 200 }}
            options={foodOptions}
          />
          <p>예산(1인)</p>
          <Select
            defaultValue="10000"
            style={{ width: 200 }}
            options={priceOptions}
          />
          <RecommendationButton bgColor="#FFC48A" />
        </Space>
      </Col>
    </Row>
  );
}
