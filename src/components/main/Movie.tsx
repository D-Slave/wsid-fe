"use client";
import { Button, Col, Row, Select, Space, Typography } from "antd";
import React from "react";
import { StepForwardOutlined } from "@ant-design/icons";
const peopleOptions = [
  { label: "2명", value: "2" },
  { label: "3명", value: "3" },
  { label: "4명", value: "4" },
];
const categoryOptions = [
  { label: "액션", value: "action" },
  { label: "로맨스", value: "romance" },
  { label: "스릴러", value: "thriller" },
];
const { Title } = Typography;
const timeOptions = [{ label: "지금", value: "now" }];
export const MoviePage = () => {
  return (
    <Row style={{ marginLeft: "40px", marginTop: "40px" }} gutter={16}>
      <Col span={14}>
        <Title>
          <StepForwardOutlined /> 영화 추천
        </Title>
        <p>검색 없이, 지금 상황에 맞춘 상영작을 바로 추천합니다.</p>
        <ul>
          <li>위치/시간/날씨/동반자 자동 반영</li>
          <li>근처 상영관 & 예매 링크까지 한번에</li>
        </ul>
        <div
          style={{
            width: "100%",
            height: "400px",
            backgroundColor: "#000",
            marginTop: "20px",
            marginLeft: "-40px",
          }}
        ></div>
      </Col>
      <Col span={10}>
        <Space direction={"vertical"} style={{ flex: 1 }}>
          <p>인원</p>
          <Select
            defaultValue="2"
            style={{ width: 200 }}
            options={peopleOptions}
          />
          <p>장르</p>
          <Select
            defaultValue="action"
            style={{ width: 200 }}
            options={categoryOptions}
          />
          <p>시간대</p>
          <Select
            defaultValue="now"
            style={{ width: 200 }}
            options={timeOptions}
          />
          <Button style={{ marginTop: "270px", width: 200 }}>추천하기</Button>
        </Space>
      </Col>
    </Row>
  );
};
