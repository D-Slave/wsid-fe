import { ReactNode } from "react";
import { Flex } from "antd";
import { Content, Header, Footer } from "antd/es/layout/layout";
const containerStyle = {
  height: "100vh",
  backgroundColor: "#001529",
};
const headerStyle = {
  height: "60px",
};

const contentStyle = {
  flex: 1,
};

const footerStyle = {
  height: "60px",
  backgroundColor: "#001529",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <Flex vertical={true} style={containerStyle}>
      <Header style={headerStyle}>header</Header>
      <Content style={contentStyle}>{children}</Content>
      <Footer style={footerStyle}>footer</Footer>
    </Flex>
  );
}
