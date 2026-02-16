export type PriceLevel = "LOW" | "MID" | "HIGH";

export type Category =
  | "KOREAN"
  | "CHINESE"
  | "JAPANESE"
  | "WESTERN"
  | "FASTFOOD"
  | "SNACK"
  | "ETC";

export type RecommendationMode =
  | "RANDOM_ONE_SHOT"
  | "CATEGORY_RANDOM"
  | "NEARBY_RECOMMEND";

export type FeedbackType = "LIKE" | "DISLIKE" | "VISITED";

export interface MenuFilter {
  distanceMeters: 500 | 1000 | 3000;
  priceLevels: PriceLevel[];
  onlyOpenNow: boolean;
  includeCategories: Category[];
  excludeCategories: Category[];
}

export interface RestaurantSummary {
  id: string;
  name: string;
  category: Category;
  distanceMeters: number;
  rating: number;
  reviewCount: number;
  openNow: boolean;
  openHours: string;
}

export interface RecommendationResult {
  recommendationId: string;
  restaurant: RestaurantSummary;
  reasons: string[];
}

export interface RestaurantDetail extends RestaurantSummary {
  address: string;
  phone: string;
  menus: string[];
}

export interface MenuActivity {
  id: string;
  restaurantId: string;
  restaurantName: string;
  type: FeedbackType;
  createdAt: string;
}
