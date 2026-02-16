import type {
  FeedbackType,
  MenuFilter,
  RecommendationMode,
} from "@/features/menu-mvp/types/menu";

export interface RequestRecommendationInput {
  mode: RecommendationMode;
  filter: MenuFilter;
}

export interface SubmitFeedbackInput {
  recommendationId: string;
  feedback: FeedbackType;
}

export interface SavePreferenceInput {
  userId: string;
  preferredCategories: string[];
}

export const menuMvpApi = {
  requestRecommendation: async (input: RequestRecommendationInput) => {
    void input;
    return {
      endpoint: "/v1/recommendations",
      method: "POST",
    } as const;
  },
  submitFeedback: async (input: SubmitFeedbackInput) => {
    return {
      endpoint: `/v1/recommendations/${input.recommendationId}/feedback`,
      method: "POST",
    } as const;
  },
  getRestaurantDetail: async (restaurantId: string) => {
    return {
      endpoint: `/v1/restaurants/${restaurantId}`,
      method: "GET",
    } as const;
  },
  savePreference: async (input: SavePreferenceInput) => {
    return {
      endpoint: `/v1/users/${input.userId}/preferences`,
      method: "POST",
    } as const;
  },
};
