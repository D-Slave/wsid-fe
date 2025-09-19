"use client";
import React from "react";
import { Button } from "antd";

type Props = {
  bgColor: string;
};

export default function RecommendationButton({ bgColor }: Props) {
  return (
    <Button
      style={{
        marginTop: "270px",
        width: 200,
        height: 40,
        backgroundColor: bgColor,
      }}
    >
      추천하기
    </Button>
  );
}
