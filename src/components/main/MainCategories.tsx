import { Col, Row } from "antd";
import { useRouter } from "next/navigation";
import React, { createElement } from "react";
import type { Category } from "@/components/main/constants/Category";



const rowStyle = {
  width: '100vw',
  height: '10vh'
}
const colStyle = {
  display: 'flex',
  justifyContent: 'space-between',
}

export default function MainCategories({ categories }: { categories: Category[] }) {
  const router = useRouter();
  // const { setActiveTab } = useContext(RecommendationContext)!;
  
  const goto = (c: Category) => {
    // setActiveTab(c.key);
    router.push(c.path);
  };

  
  return (
    <Row style={rowStyle}>
    <Col span={24} style={colStyle}>
      {categories.map((category) => (
        
      <button
            key={category.key}
            onClick={() => goto(category)}
            style={{
              appearance: "none",
              background: "transparent",
              border: "none",
              padding: 0,
              cursor: "pointer",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                margin: "0 auto 8px",
                borderRadius: "999px",
                background: category.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {createElement(category.icon, { style: category.iconStyle })}
            </div>
            <div style={{ fontSize: 12, color: "#5A5C5E" }}>{category.label}</div>
          </button>
        
      ))}
    </Col>
    </Row>
  );
}
