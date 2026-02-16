import type {
  RecommendationMode,
  RestaurantDetail,
  RecommendationResult,
} from "@/features/menu-mvp/types/menu";

export const mockRestaurants: RestaurantDetail[] = [
  {
    id: "rest_001",
    name: "홍콩반점 강남점",
    category: "CHINESE",
    distanceMeters: 420,
    rating: 4.4,
    reviewCount: 1280,
    openNow: true,
    openHours: "11:00~21:00",
    address: "서울 강남구 강남대로 408",
    phone: "02-1234-5678",
    menus: ["짬뽕", "탕수육", "짜장면"],
  },
  {
    id: "rest_002",
    name: "정성가득 한식당",
    category: "KOREAN",
    distanceMeters: 620,
    rating: 4.6,
    reviewCount: 760,
    openNow: true,
    openHours: "10:30~22:00",
    address: "서울 강남구 테헤란로 123",
    phone: "02-2222-1111",
    menus: ["김치찌개", "제육볶음", "된장찌개"],
  },
  {
    id: "rest_003",
    name: "스시로 도심점",
    category: "JAPANESE",
    distanceMeters: 890,
    rating: 4.5,
    reviewCount: 950,
    openNow: true,
    openHours: "11:30~21:30",
    address: "서울 강남구 봉은사로 55",
    phone: "02-3333-9999",
    menus: ["모둠초밥", "사케동", "우동"],
  },
  {
    id: "rest_004",
    name: "브런치 하우스",
    category: "WESTERN",
    distanceMeters: 740,
    rating: 4.2,
    reviewCount: 410,
    openNow: true,
    openHours: "09:00~20:00",
    address: "서울 강남구 언주로 77",
    phone: "02-8888-1234",
    menus: ["파스타", "리조또", "스테이크"],
  },
];

const reasonByMode: Record<RecommendationMode, string[]> = {
  RANDOM_ONE_SHOT: ["조건 최소로 빠르게 선정", "리뷰가 많은 편", "즉시 방문 가능"],
  CATEGORY_RANDOM: ["선택한 카테고리와 일치", "평점이 안정적", "접근성이 괜찮음"],
  NEARBY_RECOMMEND: ["도보 이동 가능 거리", "영업중인 매장", "후기가 많은 편"],
};

export function getRestaurantDetail(restaurantId: string) {
  return mockRestaurants.find((restaurant) => restaurant.id === restaurantId) ?? null;
}

export function getRecommendationCandidates(mode: RecommendationMode, foodType?: string) {
  if (mode === "CATEGORY_RANDOM" && foodType) {
    const categoryByFoodType = {
      한식: "KOREAN",
      일식: "JAPANESE",
      양식: "WESTERN",
    } as const;
    const matchedCategory = categoryByFoodType[foodType as keyof typeof categoryByFoodType];
    if (matchedCategory) {
      return mockRestaurants.filter((restaurant) => restaurant.category === matchedCategory);
    }
  }

  if (mode === "NEARBY_RECOMMEND") {
    return [...mockRestaurants].sort((a, b) => a.distanceMeters - b.distanceMeters);
  }

  return mockRestaurants;
}

export function toRecommendationResult(
  restaurant: RestaurantDetail,
  mode: RecommendationMode,
): RecommendationResult {
  return {
    recommendationId: `rec_${restaurant.id}`,
    restaurant,
    reasons: reasonByMode[mode],
  };
}
