import { Col } from "antd";
import React from "react";
const style = {
    background: "#6F6CF3",
    color: "#FFFFFF",
    borderRadius: 16,
    padding: "20px 16px",
    textAlign: "center" as const,
    boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
    marginBottom: 16,
    height: "10vh",
}
export default function MainCard() {
  return (
    <Col span={24} style={style}>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>
          오늘 뭐하지?
        </div>
        <div style={{ fontSize: 12, opacity: 0.9 }}>
          취향에 맞는 추천을 한 번에
        </div>
    </Col>
  );
}