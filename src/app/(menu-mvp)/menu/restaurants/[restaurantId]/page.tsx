"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { getRestaurantDetail } from "@/features/menu-mvp/data/mock-restaurants";
import { addMenuActivity, isRestaurantSaved, toggleSavedRestaurant } from "@/features/menu-mvp/lib/menu-storage";

export default function RestaurantDetailPage() {
  const params = useParams<{ restaurantId: string }>();
  const [notice, setNotice] = useState("");
  const [saved, setSaved] = useState(false);

  const restaurant = useMemo(() => {
    return getRestaurantDetail(params.restaurantId);
  }, [params.restaurantId]);

  useEffect(() => {
    if (!restaurant) {
      return;
    }
    setSaved(isRestaurantSaved(restaurant.id));
  }, [restaurant]);

  if (!restaurant) {
    return (
      <section className="menu-mvp-card menu-mvp-fade-up">
        <h1 className="menu-mvp-subtitle" style={{ margin: 0 }}>
          음식점 정보를 찾을 수 없어요.
        </h1>
        <div className="menu-mvp-button-row" style={{ marginTop: 10 }}>
          <Link href="/menu/result" className="menu-mvp-btn menu-mvp-btn-secondary">
            추천 결과로 돌아가기
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="menu-mvp-card menu-mvp-fade-up">
        <h1 className="menu-mvp-page-title" style={{ fontSize: 28, marginBottom: 6 }}>
          {restaurant.name}
        </h1>
        <p className="menu-mvp-result-meta" style={{ marginBottom: 10 }}>
          {restaurant.category} · {restaurant.distanceMeters}m · ★{restaurant.rating} (
          {restaurant.reviewCount.toLocaleString()})
        </p>
        <p className="menu-mvp-card-desc" style={{ marginBottom: 4 }}>
          주소: {restaurant.address}
        </p>
        <p className="menu-mvp-card-desc" style={{ marginBottom: 4 }}>
          영업시간: {restaurant.openHours}
        </p>
        <p className="menu-mvp-card-desc" style={{ marginBottom: 4 }}>
          전화: {restaurant.phone}
        </p>
        <p className="menu-mvp-card-desc" style={{ marginBottom: 12 }}>
          대표메뉴: {restaurant.menus.join(", ")}
        </p>

        <div className="menu-mvp-button-row">
          <a
            href={`https://map.naver.com/p/search/${encodeURIComponent(restaurant.address)}`}
            target="_blank"
            rel="noreferrer"
            className="menu-mvp-btn menu-mvp-btn-primary"
          >
            길찾기
          </a>
          <a href={`tel:${restaurant.phone}`} className="menu-mvp-btn menu-mvp-btn-secondary">
            전화
          </a>
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
          <button
            type="button"
            className="menu-mvp-btn menu-mvp-btn-secondary"
            onClick={() => {
              addMenuActivity({
                restaurantId: restaurant.id,
                restaurantName: restaurant.name,
                type: "VISITED",
              });
              setNotice("방문 기록에 추가했어요.");
            }}
          >
            방문완료
          </button>
        </div>
      </section>

      {notice && (
        <p className="menu-mvp-muted menu-mvp-fade-up" style={{ marginTop: 10 }}>
          {notice}
        </p>
      )}

      <p style={{ marginTop: 12 }}>
        <Link href="/menu/result" className="menu-mvp-btn menu-mvp-btn-secondary menu-mvp-fade-up">
          추천 결과로 돌아가기
        </Link>
      </p>
    </>
  );
}
