import { ReactNode } from "react";
import { Flex } from "antd";
import { Header, Footer } from "antd/es/layout/layout";
const containerStyle = {
  height: "100vh",
  backgroundColor: "#001529",
};
const headerStyle = {
  height: "60px",
};

const contentStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
};

const footerStyle = {
  height: "60px",
  backgroundColor: "#001529",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <Flex vertical={true} style={containerStyle}>
      <Header style={headerStyle}>header</Header>
      <Flex style={contentStyle}>{children}</Flex>
      <Footer style={footerStyle}>footer</Footer>
    </Flex>
  );
}
