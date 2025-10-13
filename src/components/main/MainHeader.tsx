import React from "react";

export default function MainHeader() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "100%",
        padding: "0 16px",
      }}
    >
      <div style={{ fontWeight: 600 }}>오늘 뭐하지?</div>
      <div
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          border: "2px solid #5F5CF1",
        }}
      />
    </div>
  );
}


