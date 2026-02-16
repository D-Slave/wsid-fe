import type { RecommendationResult } from "@/features/menu-mvp/types/menu";

interface RestaurantResultCardProps {
  result: RecommendationResult;
}

const categoryLabelMap = {
  KOREAN: "한식",
  CHINESE: "중식",
  JAPANESE: "일식",
  WESTERN: "양식",
  FASTFOOD: "패스트푸드",
  SNACK: "분식",
  ETC: "기타",
} as const;

export default function RestaurantResultCard({ result }: RestaurantResultCardProps) {
  const { restaurant, reasons } = result;

  return (
    <section className="menu-mvp-card menu-mvp-fade-up">
      <h1 className="menu-mvp-page-title" style={{ fontSize: 24, marginBottom: 10 }}>
        {restaurant.name}
      </h1>
      <p className="menu-mvp-result-meta">
        {categoryLabelMap[restaurant.category]} · {restaurant.distanceMeters}m · 평점{" "}
        {restaurant.rating}(
        {restaurant.reviewCount.toLocaleString()})
      </p>
      <p className="menu-mvp-result-meta" style={{ marginBottom: 14 }}>
        {restaurant.openNow ? "오늘 영업중" : "현재 영업 종료"} ({restaurant.openHours})
      </p>

      <h2 className="menu-mvp-subtitle">추천 이유</h2>
      <ul className="menu-mvp-reason-list">
        {reasons.map((reason) => (
          <li key={reason}>{reason}</li>
        ))}
      </ul>
    </section>
  );
}
