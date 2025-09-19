"use client";

import React from "react";
import { Col, Row, Select, Space } from "antd";
import SectionHeader from "./SectionHeader";
import { MediumOutlined } from "@ant-design/icons";
import RecommendationButton from "./RecommendationButton";
import { moodOptions, genreOptions } from "@/constant/musicOptions";
import RecommendationPreview from "./RecommendationPreview";

export default function CafePage() {
  return (
    <Row style={{ margin: "40px" }} gutter={40}>
      <Col span={14}>
        <SectionHeader
          icon={<MediumOutlined />}
          title="노래 추천"
          description="상황·기분·활동에 맞는 곡을 제안합니다."
          features={["앨범/가수/가사 미리보기", "비슷한 곡/재추천으로 탐색"]}
        />
        <RecommendationPreview />
      </Col>
      <Col span={10}>
        {/* 필터 폼 */}
        <Space direction={"vertical"} style={{ flex: 1, color: "#C7D3F5" }}>
          <p>기분/활동</p>
          <Select
            defaultValue="focus"
            style={{ width: 200 }}
            options={moodOptions}
          />
          <p>장르</p>
          <Select
            defaultValue="ballad"
            style={{ width: 200 }}
            options={genreOptions}
          />
          <RecommendationButton bgColor="#E3B0FF" />
        </Space>
      </Col>
    </Row>
  );
}
