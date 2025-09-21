"use client";

import { Avatar, List, Typography } from "antd";

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
export default function SimilarMovie() {
  const data = [
    {
      title: "영화 제목 A",
      description: "장르 개봉연도",
    },
    {
      title: "영화 제목 B",
      description: "장르 개봉연도",
    },
  ];
  return (
    <div style={wrapStyle}>
      <Typography.Title level={2}>유사 영화 추천</Typography.Title>
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
    </div>
  );
}
