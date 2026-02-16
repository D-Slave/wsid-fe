"use client";

import { useEffect, useMemo, useState } from "react";
import StateFeedback from "@/features/menu-mvp/components/state-feedback";
import { getMenuActivities } from "@/features/menu-mvp/lib/menu-storage";
import type { MenuActivity } from "@/features/menu-mvp/types/menu";

const labelMap = {
  LIKE: "좋아요",
  DISLIKE: "싫어요",
  VISITED: "방문",
} as const;

export default function ActivityPage() {
  const [activities, setActivities] = useState<MenuActivity[]>([]);

  useEffect(() => {
    setActivities(getMenuActivities());
  }, []);

  const stats = useMemo(() => {
    return {
      like: activities.filter((activity) => activity.type === "LIKE").length,
      dislike: activities.filter((activity) => activity.type === "DISLIKE").length,
      visited: activities.filter((activity) => activity.type === "VISITED").length,
    };
  }, [activities]);

  return (
    <>
      <h1 className="menu-mvp-page-title menu-mvp-fade-up" style={{ marginBottom: 12 }}>
        내 활동
      </h1>

      <section className="menu-mvp-card menu-mvp-fade-up">
        <ul className="menu-mvp-list" style={{ paddingLeft: 18 }}>
          <li>좋아요: {stats.like}건</li>
          <li>싫어요: {stats.dislike}건</li>
          <li>방문 기록: {stats.visited}건</li>
        </ul>
      </section>

      <h2 className="menu-mvp-subtitle" style={{ marginTop: 14 }}>
        최근 활동
      </h2>
      {activities.length === 0 ? (
        <section className="menu-mvp-card menu-mvp-fade-up">
          <p className="menu-mvp-card-desc" style={{ margin: 0 }}>
            아직 활동 기록이 없어요.
          </p>
        </section>
      ) : (
        <section className="menu-mvp-card menu-mvp-fade-up">
          <ul className="menu-mvp-list" style={{ paddingLeft: 18 }}>
            {activities.slice(0, 10).map((activity) => (
              <li key={activity.id}>
                {labelMap[activity.type]} · {activity.restaurantName} ·{" "}
                {new Date(activity.createdAt).toLocaleString("ko-KR")}
              </li>
            ))}
          </ul>
        </section>
      )}

      <h2 className="menu-mvp-subtitle" style={{ marginTop: 14 }}>
        예외 상태 예시
      </h2>
      <StateFeedback type="network_error" />
    </>
  );
}
