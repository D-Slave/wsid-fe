"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getSavedRestaurants, removeSavedRestaurant } from "@/features/menu-mvp/lib/menu-storage";
import type { RestaurantSummary } from "@/features/menu-mvp/types/menu";

const categoryLabelMap = {
  KOREAN: "한식",
  CHINESE: "중식",
  JAPANESE: "일식",
  WESTERN: "양식",
  FASTFOOD: "패스트푸드",
  SNACK: "분식",
  ETC: "기타",
} as const;

export default function SavedRestaurantsPage() {
  const [savedRestaurants, setSavedRestaurants] = useState<RestaurantSummary[]>([]);

  useEffect(() => {
    setSavedRestaurants(getSavedRestaurants());
  }, []);

  return (
    <>
      <h1 className="menu-mvp-page-title menu-mvp-fade-up" style={{ marginBottom: 12 }}>
        저장한 음식점
      </h1>

      {savedRestaurants.length === 0 ? (
        <section className="menu-mvp-card menu-mvp-fade-up">
          <p className="menu-mvp-card-desc" style={{ margin: 0 }}>
            아직 찜한 음식점이 없어요.
          </p>
        </section>
      ) : (
        <div className="menu-mvp-list-stack">
          {savedRestaurants.map((restaurant) => (
            <section key={restaurant.id} className="menu-mvp-card menu-mvp-fade-up">
              <h2 className="menu-mvp-subtitle" style={{ marginBottom: 6 }}>
                {restaurant.name}
              </h2>
              <p className="menu-mvp-result-meta">
                {categoryLabelMap[restaurant.category]} · {restaurant.distanceMeters}m · 평점{" "}
                {restaurant.rating}
              </p>
              <div className="menu-mvp-button-row" style={{ marginTop: 10 }}>
                <Link
                  href={`/menu/restaurants/${restaurant.id}`}
                  className="menu-mvp-btn menu-mvp-btn-secondary"
                >
                  상세 보기
                </Link>
                <button
                  type="button"
                  className="menu-mvp-btn menu-mvp-btn-secondary"
                  onClick={() => {
                    removeSavedRestaurant(restaurant.id);
                    setSavedRestaurants(getSavedRestaurants());
                  }}
                >
                  삭제
                </button>
              </div>
            </section>
          ))}
        </div>
      )}

      <p style={{ marginTop: 12 }}>
        <Link href="/menu" className="menu-mvp-btn menu-mvp-btn-secondary">
          홈으로 이동
        </Link>
      </p>
    </>
  );
}
