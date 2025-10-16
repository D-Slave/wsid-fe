import { ReactNode } from "react";
import { Flex } from "antd";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
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
  );
}
