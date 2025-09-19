"use client";

import React from "react";
import { Col, Row, Select, Space } from "antd";
import SectionHeader from "./SectionHeader";
import { MediumOutlined } from "@ant-design/icons";
import RecommendationButton from "./RecommendationButton";
import {
  peopleOptions,
  categoryOptions,
  priceOptions,
} from "@/constant/cafeOptions";
import RecommendationPreview from "./RecommendationPreview";

export default function CafePage() {
  return (
    <Row style={{ margin: "40px" }} gutter={40}>
      <Col span={14}>
        <SectionHeader
          icon={<MediumOutlined />}
          title="카페 추천"
          description="목적에 맞는 카페를 간단 선택으로 추천합니다."
          features={[
            "좌석/소음/콘센트 등 환경 요약",
            "전화/길찾기/자리 현황 연결",
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
          <p>목적</p>
          <Select
            defaultValue="work"
            style={{ width: 200 }}
            options={categoryOptions}
          />
          <p>시간대</p>
          <Select
            defaultValue="10000"
            style={{ width: 200 }}
            options={priceOptions}
          />
          <RecommendationButton bgColor="#9BE7B2" />
        </Space>
      </Col>
    </Row>
  );
}
