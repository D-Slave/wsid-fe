"use client";

import React, { useState } from "react";
import { Button, Card, Form, Space, Typography } from "antd";
import {
  foodOptions,
  peopleOptions,
  priceOptions,
} from "@/constant/foodOptions";

// 상수 정의
const CARD_STYLE = {
  borderRadius: 10,
  width: "400px",
  border: "none",
} as const;

const OPTION_BUTTON_STYLE = {
  borderRadius: 16,
  height: 40,
  width: 80,
} as const;

// 타입 정의
type FoodFilter = {
  people: string;
  foodType: string;
  priceRange: string;
};

type FoodInfoProps = {
  onSubmit?: (filters: FoodFilter) => void;
};

export default function FoodInfo({ onSubmit }: FoodInfoProps) {
  const [selectedFilters, setSelectedFilters] = useState<FoodFilter>({
    people: "1",
    foodType: "korean",
    priceRange: "10000",
  });

  const handleFilterChange = (key: keyof FoodFilter, value: string) => {
    setSelectedFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    console.log("선택된 필터:", selectedFilters);
    onSubmit?.(selectedFilters);
  };

  return (
    <Card
      hoverable={false}
      style={CARD_STYLE}
      cover={
        <img
          draggable={false}
          alt="맛집 추천 이미지"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
    >
      <Form layout="vertical">
        <Space direction="vertical" style={{ width: "100%" }}>
          <Typography.Title level={3}>
            가장 맛있는 집을 찾아드려요
          </Typography.Title>

          <Typography.Text type="secondary">
            인원과 음식 종류, 예산에 맞는 맞춤 추천
          </Typography.Text>

          <Form.Item label="인원">
            <Space wrap>
              {peopleOptions.map((option) => (
                <Button
                  key={option.value}
                  type={
                    selectedFilters.people === option.value
                      ? "primary"
                      : "default"
                  }
                  style={OPTION_BUTTON_STYLE}
                  onClick={() => handleFilterChange("people", option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </Space>
          </Form.Item>

          <Form.Item label="음식종류">
            <Space wrap>
              {foodOptions.map((option) => (
                <Button
                  key={option.value}
                  type={
                    selectedFilters.foodType === option.value
                      ? "primary"
                      : "default"
                  }
                  style={OPTION_BUTTON_STYLE}
                  onClick={() => handleFilterChange("foodType", option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </Space>
          </Form.Item>

          <Form.Item label="가격대">
            <Space wrap>
              {priceOptions.map((option) => (
                <Button
                  key={option.value}
                  type={
                    selectedFilters.priceRange === option.value
                      ? "primary"
                      : "default"
                  }
                  style={OPTION_BUTTON_STYLE}
                  onClick={() => handleFilterChange("priceRange", option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </Space>
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            onClick={handleSubmit}
            style={{ width: "100%", height: 44, marginTop: 24 }}
          >
            추천하기
          </Button>
        </Space>
      </Form>
    </Card>
  );
}
