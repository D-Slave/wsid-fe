"use client";
import React, { ReactNode } from "react";
import { Flex } from "antd";
import MainHeader from "@/components/main/MainHeader";
import { Header } from "antd/es/layout/layout";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header
        style={{
          background: "transparent",
          height: "60px",
          width: "100vw",
          padding: 0,
          backgroundColor: "#fff",
        }}
      >
        <MainHeader />
      </Header>
      <Flex
        style={{
          backgroundColor: "#FFFFFF",
          // minHeight: "calc(100vh - 120px)",
          minHeight: "100vh",
          padding: 16,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
      </Flex>
    </div>
  );
}
