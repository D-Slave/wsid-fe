import React from "react";
import { Button, Space } from "antd";
import { GoogleOutlined, GithubOutlined } from "@ant-design/icons";

type Props = {
  startOAuth: (provider: "google" | "github" | "kakao") => void;
};

export default function SocialLogin({ startOAuth }: Props) {
  return (
    <Space direction="vertical" size={12} style={{ width: "100%" }}>
      <Button
        type="primary"
        icon={<GoogleOutlined />}
        onClick={() => startOAuth("google")}
        style={{ width: "100%", height: 44 }}
      >
        Google로 계속하기
      </Button>

      <Button
        icon={<GithubOutlined />}
        onClick={() => startOAuth("github")}
        style={{ width: "100%", height: 44 }}
      >
        GitHub로 계속하기
      </Button>

      <Button
        onClick={() => startOAuth("kakao")}
        style={{ width: "100%", height: 44, background: "#FEE500" }}
      >
        카카오로 계속하기
      </Button>
    </Space>
  );
}