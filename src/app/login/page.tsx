"use client";

import React from "react";
import { Card, Row, Space, Typography } from "antd";
import Link from "next/link";
import SocialLogin from "@/components/login/SocialLogin";
import LoginContent from "@/components/login/LoginContent";

export default function LoginPage() {
  const startOAuth = (provider: "google" | "kakao" | "naver") => {
    window.location.href = `/auth/${provider}`;
  };

  return (
    <Row
      style={{
        width: "100%",
        minHeight: "calc(100vh - 120px)",
        padding: 16,
      }}
      justify="center"
      align="middle"
    >
      <Card style={{ width: 360, border: "none" }}>
        <Space direction="vertical" size={16} style={{ width: "100%" }}>
          <LoginContent />
          <Space direction="vertical" size={12} style={{ width: "100%" }}>
            <SocialLogin startOAuth={startOAuth} />
          </Space>

          <Typography.Paragraph style={{ marginTop: 8, textAlign: "center" }}>
            <Link href="/signup"> 또는 이메일로 회원가입 </Link>
          </Typography.Paragraph>
        </Space>
      </Card>
    </Row>
  );
}
