import { ReactNode } from "react";
import { Button, Flex, Row } from "antd";
import { Header } from "antd/es/layout/layout";
import RecommendHeader from "@/components/recommend/Header";
const wrapStyle = {
  margin: "24px 50px",
};
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <Flex
      vertical
      style={{
        backgroundColor: "#fff",
        height: "100vh",
        width: "100%",
      }}
    >
      <Header style={{ backgroundColor: "#fff" }}>
        <RecommendHeader />
      </Header>
      {/*<Flex style={{ flex: 1 }}>{children}</Flex>*/}
      <div style={wrapStyle}>{children}</div>
      {/*{children}*/}
    </Flex>
  );
}
