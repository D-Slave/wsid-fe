"use client";

import React, { useState } from "react";
import { Button, Card, Row, Space, Typography } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SocialLogin from "@/components/login/SocialLogin";
import LoginContent from "@/components/login/LoginContent";
import EmailLogin, { LoginFormData } from "@/components/login/EmailLogin";
import { apiPost } from "@/lib/api-client";
import { saveTokenToStorage } from "@/lib/token-storage";


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
  const router = useRouter();
  const [formValues, setFormValues] = useState<LoginFormData>({
    email: "",
    password: ""
  });

  const handleEmailLogin = async () => {
    if (!formValues.email || !formValues.password) {
      alert("이메일과 비밀번호를 입력해주세요.");
      return;
    }
    try {
      const response = await fetch("http://localhost:8080/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });

      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
        return;
      }

      saveTokenToStorage(data.token, data.refreshToken);
      console.log("로그인 성공:", data);

      // 로그인 성공 후 페이지 이동
      router.push("/main");
      
    } catch (error) {
      console.error("로그인 오류:", error);
      alert("서버 오류가 발생했습니다.");
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

          {/* 이메일/비밀번호 입력 컴포넌트 */}
          <EmailLogin onChange={setFormValues} />
          <Button type="primary" block onClick={handleEmailLogin}>
            로그인
          </Button>
          <Space direction="vertical" size={12} style={{ width: "100%" }}>
            <SocialLogin />
          </Space>

          <Typography.Paragraph style={{ marginTop: 8, textAlign: "center" }}>
            <Row justify="space-around">
              <Link href="/signup"> 또는 이메일로 회원가입 </Link>
            </Row>
          </Typography.Paragraph>
        </Space>
      </Card>
    </Row>
  );
}
