"use client";

import { Avatar, Divider, List, Row, Typography } from "antd";
const wrapStyle = {
  width: "100%",
  border: "1px solid #E1E3E8",
  borderRadius: 10,
  height: "100%",
  padding: "10px 24px",
};

const listStyle = {
  width: "100%",
  border: "1px solid #E6E8ED",
  borderRadius: 16,
  padding: "16px 8px",
  backgroundColor: "#E9E9E9",
};
export default function MovieActor() {
  const data = [
    {
      title: "배우 1",
      description: "작품 A, 작품 B",
    },
    {
      title: "배우 2",
      description: "작품 C, 작품 D",
    },
  ];
  return (
    <div style={wrapStyle}>
      <Row>
        <Typography.Title level={2}>등장 배우</Typography.Title>
      </Row>
      <Divider type="horizontal" />
      <Row>
        <List
          style={listStyle}
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                  />
                }
                title={<a href="https://ant.design">{item.title}</a>}
                description={item.description}
              />
            </List.Item>
          )}
        ></List>
      </Row>
    </div>
  );
}
