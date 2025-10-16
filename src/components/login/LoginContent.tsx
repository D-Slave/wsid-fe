import { Card, Typography } from "antd";
import React from "react";

export default function LoginContent() {
  return (
    <>
      <div style={{ textAlign: "center" }}>
        <Typography.Title level={2} style={{ marginBottom: 8 }}>
          오늘 뭐하지?
        </Typography.Title>
        <Typography.Text type="secondary">
          나에게 꼭 맞는 오늘의 추천
        </Typography.Text>
      </div>
      <div
        style={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card
          style={{
            borderRadius: "16px",
            width: "80vw",
            height: "15vh",
            backgroundColor: "#d9d9d9",
          }}
        ></Card>
      </div>
    </>
  );
}
