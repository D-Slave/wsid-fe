"use client";

import { ReactNode, useContext } from "react";
import { Header, Footer } from "antd/es/layout/layout";
import { RecommendationContext } from "@/context/RecommendationContext";
import { Flex } from "antd";

export default function RootLayout({ children }: { children: ReactNode }) {
  const { activeTab } = useContext(RecommendationContext)!;

  const bgMap: Record<string, string> = {
    영화: "#1C2436",
    카페: "#1D2D25",
    맛집: "#32261B",
    음악: "#322133",
  };

  const bgColor = bgMap[activeTab];

  return (
    <Flex
      vertical
      style={{
        minHeight: "100vh",
        backgroundColor: bgColor,
        color: "#fff",
      }}
    >
      <Header style={{ background: "transparent", height: "60px" }}>
        header
      </Header>

      <Flex style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {children}
      </Flex>

      <Footer style={{ background: "transparent", height: "60px" }}>
        footer
      </Footer>
    </Flex>
  );
}
