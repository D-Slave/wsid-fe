"use client";
import { Flex, Row, Space, Typography } from "antd";
import HashTag from "@/components/hashtag/HashTag";

export default function HashtagPage() {
  return (
    <div style={{ backgroundColor: "#fff", height: "100vh" }}>
      <Row justify="start" align="top" style={{ width: "400px" }}>
        <Space direction="vertical">
          <Typography.Title level={1}>
            나만의 관심 해시태그 설정
          </Typography.Title>
          <Typography.Title level={4} style={{ color: "#6B7280" }}>
            오늘 뭐하지?에 오신걸 환영합니다
          </Typography.Title>
        </Space>
      </Row>
      <HashTag />
    </div>
  );
}
