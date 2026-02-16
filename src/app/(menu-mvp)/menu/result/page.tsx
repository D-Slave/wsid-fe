"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import RestaurantResultCard from "@/features/menu-mvp/components/restaurant-result-card";
import {
  getRecommendationCandidates,
  toRecommendationResult,
} from "@/features/menu-mvp/data/mock-restaurants";
import { addMenuActivity, isRestaurantSaved, toggleSavedRestaurant } from "@/features/menu-mvp/lib/menu-storage";
import type { RecommendationMode } from "@/features/menu-mvp/types/menu";

const modeLabelMap: Record<RecommendationMode, string> = {
  RANDOM_ONE_SHOT: "완전 랜덤 한방",
  CATEGORY_RANDOM: "카테고리 랜덤",
  NEARBY_RECOMMEND: "내 주변 추천",
};

const priceLabelMap = { LOW: "저가", MID: "중가", HIGH: "고가" } as const;

export default function MenuResultPage() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [notice, setNotice] = useState("");
  const [saved, setSaved] = useState(false);

  const mode = (searchParams.get("mode") as RecommendationMode) ?? "RANDOM_ONE_SHOT";
  const partySize = searchParams.get("partySize") ?? "3";
  const foodType = searchParams.get("foodType") ?? "한식";
  const budget = searchParams.get("budget") ?? "2~3만원";
  const distanceMeters = searchParams.get("distanceMeters") ?? "1000";
  const onlyOpenNow = searchParams.get("onlyOpenNow") !== "false";
  const priceLevels = searchParams.get("priceLevels") ?? "MID";
  const pickIndex = Number(searchParams.get("ri") ?? "0");

  const selectedPrices = priceLevels
    .split(",")
    .map((price) => priceLabelMap[price as keyof typeof priceLabelMap] ?? price)
    .join("/");

  const recommendation = useMemo(() => {
    const candidates = getRecommendationCandidates(mode, foodType);
    if (candidates.length === 0) {
      return null;
    }
    const index = Math.abs(pickIndex) % candidates.length;
    const picked = candidates[index];
    return toRecommendationResult(picked, mode);
  }, [foodType, mode, pickIndex]);

  const reroll = () => {
    const next = new URLSearchParams(searchParams.toString());
    next.set("ri", String(pickIndex + 1));
    router.push(`${pathname}?${next.toString()}`);
  };

  useEffect(() => {
    if (!recommendation) {
      return;
    }
    setSaved(isRestaurantSaved(recommendation.restaurant.id));
  }, [recommendation]);

  if (!recommendation) {
    return (
      <>
        <h1 className="menu-mvp-page-title menu-mvp-fade-up" style={{ marginBottom: 12 }}>
          추천 결과
        </h1>
        <section className="menu-mvp-card menu-mvp-fade-up">
          <p className="menu-mvp-card-desc" style={{ margin: 0 }}>
            조건에 맞는 식당이 없어요. 필터를 완화해서 다시 시도해보세요.
          </p>
          <div className="menu-mvp-button-row" style={{ marginTop: 10 }}>
            <Link href="/menu" className="menu-mvp-btn menu-mvp-btn-secondary">
              홈으로 가기
            </Link>
          </div>
        </section>
      </>
    );
  }

  const { restaurant } = recommendation;

  return (
    <>
      <h1 className="menu-mvp-page-title menu-mvp-fade-up" style={{ marginBottom: 12 }}>
        추천 결과
      </h1>

      <section className="menu-mvp-card menu-mvp-fade-up" style={{ marginBottom: 12 }}>
        <h2 className="menu-mvp-subtitle" style={{ margin: "0 0 8px" }}>
          선택 조건
        </h2>
        <p className="menu-mvp-result-meta">
          모드 {modeLabelMap[mode]} · 인원 {partySize}명 · {foodType} · {budget}
        </p>
        <p className="menu-mvp-result-meta">
          거리 {distanceMeters === "1000" ? "1km" : `${distanceMeters}m`} · {selectedPrices} ·{" "}
          {onlyOpenNow ? "영업중" : "전체"}
        </p>
      </section>

      <RestaurantResultCard result={recommendation} />

      <div className="menu-mvp-button-row menu-mvp-fade-up" style={{ marginTop: 12 }}>
        <button type="button" className="menu-mvp-btn menu-mvp-btn-primary" onClick={reroll}>
          다시 뽑기
        </button>
        <Link href={`/menu/restaurants/${restaurant.id}`} className="menu-mvp-btn menu-mvp-btn-secondary">
          상세 보기
        </Link>
      </div>

      <div className="menu-mvp-button-row menu-mvp-fade-up" style={{ marginTop: 8 }}>
        <button
          type="button"
          className="menu-mvp-btn menu-mvp-btn-secondary"
          onClick={() => {
            addMenuActivity({
              restaurantId: restaurant.id,
              restaurantName: restaurant.name,
              type: "LIKE",
            });
            setNotice("좋아요를 기록했어요.");
          }}
        >
          좋아요
        </button>
        <button
          type="button"
          className="menu-mvp-btn menu-mvp-btn-secondary"
          onClick={() => {
            addMenuActivity({
              restaurantId: restaurant.id,
              restaurantName: restaurant.name,
              type: "DISLIKE",
            });
            setNotice("싫어요를 기록했어요.");
          }}
        >
          싫어요
        </button>
        <button
          type="button"
          className="menu-mvp-btn menu-mvp-btn-secondary"
          onClick={() => {
            addMenuActivity({
              restaurantId: restaurant.id,
              restaurantName: restaurant.name,
              type: "VISITED",
            });
            setNotice("방문완료로 저장했어요.");
          }}
        >
          방문완료
        </button>
        <button
          type="button"
          className="menu-mvp-btn menu-mvp-btn-secondary"
          onClick={() => {
            const nextSaved = toggleSavedRestaurant(restaurant);
            setSaved(nextSaved);
            setNotice(nextSaved ? "찜 목록에 추가했어요." : "찜 목록에서 제거했어요.");
          }}
        >
          {saved ? "찜해제" : "찜하기"}
        </button>
      </div>

      {notice && (
        <p className="menu-mvp-muted menu-mvp-fade-up" style={{ marginTop: 10 }}>
          {notice}
        </p>
      )}
    </>
  );
}
