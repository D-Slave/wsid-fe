import React from "react";
import { Dropdown, Typography } from "antd";
import type { MenuProps } from "antd";
import { useRouter } from "next/navigation";
import { SmallDashOutlined, LeftOutlined } from "@ant-design/icons";

export default function MainHeader() {
  const router = useRouter();

  const items: MenuProps["items"] = [
    { key: "login", label: "로그인" },
    { key: "signup", label: "회원가입" },
  ];

  const onMenuClick: MenuProps["onClick"] = ({ key }) => {
    if (key === "login") router.push("/login");
    else if (key === "signup") router.push("/signup");
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "100%",
        padding: "0 16px",
      }}
    >
      <button
        onClick={() => router.back()}
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          padding: 0,
        }}
      >
        <LeftOutlined style={{ fontSize: 18, color: "#000" }} />
      </button>
      <a href="/main" style={{ marginTop: "12px" }}>
        <Typography.Title level={4}>오늘 뭐하지?</Typography.Title>
      </a>
      <Dropdown menu={{ items, onClick: onMenuClick }} placement="bottomRight">
        <button
          aria-label="user actions"
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            border: "1px solid #E6E8EB",
            background: "transparent",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SmallDashOutlined style={{ fontSize: 18, color: "#5F5CF1" }} />
        </button>
      </Dropdown>
    </div>
  );
}
