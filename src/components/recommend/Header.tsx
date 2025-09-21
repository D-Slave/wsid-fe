"use client";
import { Button, Row, Typography } from "antd";
import { useRouter } from "next/navigation";

export default function RecommendHeader() {
  const router = useRouter();
  return (
    <Row justify={"space-between"}>
      <Button
        onClick={() => {
          router.back();
        }}
      >
        돌아가기
      </Button>
      <Typography.Title level={2}>영화 추천</Typography.Title>
      <Button>마이페이지</Button>
    </Row>
  );
}
