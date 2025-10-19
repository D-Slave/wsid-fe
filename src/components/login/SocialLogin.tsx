import React from "react";
import { Button, Space } from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import Image from "next/image";
import NaverIcon from "./naver/icon/naver_icon_short.png";
import KakaoIcon from "./kakao/icon/kakao_login_short.png";

type Props = {
  startOAuth: (provider: "google" | "kakao" | "naver") => void;
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
        로그인
      </Button>

      <Button
        onClick={() => startOAuth("kakao")}
        style={{
          width: "100%",
          height: 44,
          background: "#FEE500",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 0,
        }}
      >
        <Image
          src={KakaoIcon}
          alt="카카오 로그인"
          height={44}
          style={{ objectFit: "contain", width: "100%" }}
        />
      </Button>

      <Button
        onClick={() => startOAuth("naver")}
        style={{
          width: "100%",
          height: 48,
          background: "#03C75A",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image
          src={NaverIcon}
          alt="네이버 로그인"
          height={44}
          style={{ objectFit: "contain", width: "100%" }}
        />
      </Button>
    </Space>
  );
}
