"use client";

import { ReactNode } from "react";
import { Header, Footer } from "antd/es/layout/layout";
import { Flex } from "antd";
import MainHeader from "@/components/main/MainHeader";
import MainFooter from "@/components/main/MainFooter";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <Flex
      vertical
      style={{
        minHeight: "100vh",
        backgroundColor: "#FFFFFF",
        color: "#111111",
      }}
    >
      <Header
        style={{
          background: "transparent",
          height: "60px",
          width: "100vw",
          padding: 0,
        }}
      >
        <MainHeader />
      </Header>

      <Flex
        style={{
          flex: 1,
          justifyContent: "center",
          height: "100vh",
          display: "block",
        }}
      >
        {children}
      </Flex>

      <Footer
        style={{
          background: "transparent",
          height: "60px",
          width: "100vw",
          padding: 0,
        }}
      >
        <MainFooter />
      </Footer>
    </Flex>
  );
}
