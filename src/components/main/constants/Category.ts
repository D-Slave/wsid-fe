import React from "react";
import { RecommendationType } from "@/context/RecommendationContext";

export type Category = {
  key: RecommendationType; // 도메인 키
  label: string; // 화면 표시 텍스트
  icon: React.ComponentType<any>; // 아이콘 컴포넌트 타입
  iconStyle?: React.CSSProperties; // 아이콘 인라인 스타일
  path: string; // 이동 경로
  bg: string; // 아이콘 원형 배경색
};


