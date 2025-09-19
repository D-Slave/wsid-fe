import React from "react";
import { Button } from "antd";

type Props = {
  title: string;
  bgColor: string;
  onClick: () => void;
};

export default function RecommendationTap({ title, bgColor, onClick }: Props) {
  return (
    <Button
      onClick={onClick}
      style={{
        backgroundColor: bgColor,
        color: "#FFF",
        width: 130,
        height: 40,
        borderRadius: "10px",
        border: "none",
      }}
    >
      {title}
    </Button>
  );
}
