"use client";
import { Row, Space, Tag, Typography } from "antd";

export default function HashTag() {
  return (
    <Row style={{ marginTop: 8 }}>
      <Space direction="vertical">
        <Typography.Title level={2}>음식/가격</Typography.Title>
        <Space>
          <Tag>#프로먹방러</Tag>
          <Tag>#미식가</Tag>
        </Space>
      </Space>
    </Row>
  );
}
