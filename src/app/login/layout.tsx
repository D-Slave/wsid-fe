"use client";

import React, { ReactNode } from "react";
import { Flex } from "antd";
import { Header, Footer } from "antd/es/layout/layout";
import MainHeader from "@/components/main/MainHeader";

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
          minHeight: "calc(100vh - 120px)",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
          padding: 16,
        }}
      >
        {children}
      </Flex>
    </div>
  );
}
