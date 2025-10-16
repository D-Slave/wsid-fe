"use client";

import React, { ReactNode } from "react";
import { Flex } from "antd";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
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
  );
}
