"use client";

import React, { createContext, useState } from "react";

export type RecommendationType = "영화" | "카페" | "맛집" | "음악";

export const RecommendationContext = createContext<{
  activeTab: RecommendationType;
  setActiveTab: (tab: RecommendationType) => void;
} | null>(null);

export function RecommendationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeTab, setActiveTab] = useState<RecommendationType>("영화");
  return (
    <RecommendationContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </RecommendationContext.Provider>
  );
}
