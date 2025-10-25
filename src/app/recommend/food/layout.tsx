import RecommendHeader from "@/components/recommend/Header";
import { Flex } from "antd";
import { Header } from "antd/es/layout/layout";
import { ReactNode } from "react";
const wrapStyle = {
  margin: "24px 50px",
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <Flex
      vertical
      style={{
        backgroundColor: "#fff",
      }}
    >
      <Header style={{ backgroundColor: "#fff" }}>
        <RecommendHeader />
      </Header>
      <div style={wrapStyle}>{children}</div>
    </Flex>
  );
}
