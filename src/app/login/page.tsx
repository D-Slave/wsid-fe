"use client";

import React from "react";
import { Card, Row, Space, Typography } from "antd";
import Link from "next/link";
import SocialLogin from "@/components/login/SocialLogin";
import LoginContent from "@/components/login/LoginContent";
import EmailLogin, { LoginFormData } from "@/components/login/EmailLogin";
import { apiPost } from "@/lib/api-client";
import { saveTokenToStorage } from "@/lib/token-storage";
import { router } from "next/client";

interface LoginResponse {
  code: string;
  message?: string;
  data: {
    user: {
      id: string;
      email: string;
      name?: string;
      [key: string]: unknown;
    };
    token: string;
    refreshToken: string;
  };
}
export default function LoginPage() {
  const handleEmailLogin = async (values: LoginFormData) => {
    try {
      const response = await apiPost<LoginResponse, LoginFormData>(
        "api/auth/login",
        values,
        { skipAuth: true }
      );
      if (response.data?.token) {
        saveTokenToStorage(response.data.token, response.data.refreshToken);
        console.log("로그인 성공");
        router.push("/main");
      }
    } catch (error) {
      console.error(error);
    }
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
          <EmailLogin onSubmit={handleEmailLogin} />
          <Space direction="vertical" size={12} style={{ width: "100%" }}>
            <SocialLogin />
          </Space>

          <Typography.Paragraph style={{ marginTop: 8, textAlign: "center" }}>
            <Row justify="space-around">
              <Link href="/login"> 로그인 </Link>
              <Link href="/signup"> 또는 이메일로 회원가입 </Link>
            </Row>
          </Typography.Paragraph>
        </Space>
      </Card>
    </Row>
  );
}
