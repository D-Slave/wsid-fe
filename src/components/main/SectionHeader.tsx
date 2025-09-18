import React from "react";

type Props = {
  icon?: React.ReactNode;
  title: string;
  description: string;
  features: string[];
};

export default function SectionHeader({
  icon,
  title,
  description,
  features,
}: Props) {
  return (
    <div
      style={{
        color: "#C7D3F5",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginBottom: "10px",
      }}
    >
      <div style={{ display: "flex", gap: "10px" }}>
        {icon}
        <p style={{ fontSize: "42px", color: "#FFF" }}>{title}</p>
      </div>
      <p>{description}</p>
      <ul style={{ marginLeft: "10px" }}>
        {features.map((feat, idx) => (
          <li key={idx}>{feat}</li>
        ))}
      </ul>
    </div>
  );
}
