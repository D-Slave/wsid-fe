"use client";
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Space,
  Tag,
  Typography,
} from "antd";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <Form layout="vertical">
      <Row
        gutter={[0, 16]}
        style={{ padding: "24px" }}
        align="middle"
        justify="start"
      >
        <Space
          direction="vertical"
          style={{ textAlign: "center", width: "100%" }}
        >
          <Typography.Title level={2}>회원가입</Typography.Title>
          <Typography.Text type="secondary">
            오늘 뭐하지?에 오신걸 환영합니다
          </Typography.Text>
        </Space>
        <Col span={24}>
          <Form.Item label="이름" name="name">
            <Input placeholder="홍길동" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="이메일" name="email">
            <Input placeholder="example@gmail.com" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="비밀번호" name="password">
            <Input placeholder="example@gmail.com" />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="성별" name="gender">
            <Space direction="horizontal">
              <Button>남성</Button>
              <Button>여성</Button>
            </Space>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="나이">
            <Input />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="관심 해시태그 선택">
            <Tag>#가성비</Tag>
            <Tag>#야간감성</Tag>
            <Tag>#좌석여유</Tag>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Checkbox>개인정보 수집 및 이용에 동의합니다.</Checkbox>
        </Col>
        <Col span={24}>
          <Button
            type="primary"
            htmlType="submit"
            style={{
              width: "100%",
              height: "56px",
              borderRadius: "16px",
            }}
          >
            가입하기
          </Button>
        </Col>
        <Col span={24} style={{ textAlign: "center" }}>
          <Typography.Text>
            <Link href="/login">이미 계정이 있나요? 로그인</Link>
          </Typography.Text>
        </Col>
      </Row>
    </Form>
  );
}
