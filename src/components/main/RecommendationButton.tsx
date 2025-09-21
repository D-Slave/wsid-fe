"use client";
import React from "react";
import { Button } from "antd";
import { useRouter } from "next/navigation";

type Props = {
  bgColor: string;
};

export default function RecommendationButton({ bgColor }: Props) {
  const router = useRouter();
  return (
    <Button
      style={{
        marginTop: "270px",
        width: 200,
        height: 40,
        backgroundColor: bgColor,
      }}
      onClick={() => {
        router.push("recommend/movie");
      }}
    >
      추천하기
    </Button>
  );
}
