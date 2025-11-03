"use client";

import { Col, Image, Row, Typography } from "antd";

const wrapStyle = {
  border: "1px solid #E1E3E8",
  borderRadius: 10,
  height: "100%",
  padding: "10px 24px",
};
const infoContentStyle = {
  marginTop: "16px",
};
export default function MovieInfo() {
  return (
    <div style={wrapStyle}>
      <Image
        width="100%"
        height={400}
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        alt=""
      />
      <div style={infoContentStyle}>
        <Row gutter={[0, 8]}>
          <Col span={24}>
            <Typography.Title level={4}>영화 제목</Typography.Title>
          </Col>
          <Col span={24}>
            <Typography.Title level={5}>개봉일 : 2025-09-19</Typography.Title>
          </Col>
          <Col span={24}>
            <Typography.Title level={5}>평점: ★★★★☆ (4.3/5) </Typography.Title>
          </Col>
          <Col span={24}>
            <Typography.Title level={5}>
              OTT : 쿠팡플레이, 넷플릭스
            </Typography.Title>
          </Col>
        </Row>
      </div>
    </div>
  );
}
