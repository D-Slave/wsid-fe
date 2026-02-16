"use client";

import type { FeedbackType, MenuActivity, RestaurantSummary } from "@/features/menu-mvp/types/menu";

const STORAGE_KEYS = {
  activities: "menu-mvp:activities",
  savedRestaurants: "menu-mvp:saved-restaurants",
} as const;

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return fallback;
    }
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getSavedRestaurants() {
  return readJson<RestaurantSummary[]>(STORAGE_KEYS.savedRestaurants, []);
}

export function isRestaurantSaved(restaurantId: string) {
  return getSavedRestaurants().some((restaurant) => restaurant.id === restaurantId);
}

export function toggleSavedRestaurant(restaurant: RestaurantSummary) {
  const current = getSavedRestaurants();
  const exists = current.some((item) => item.id === restaurant.id);
  const next = exists
    ? current.filter((item) => item.id !== restaurant.id)
    : [restaurant, ...current];

  writeJson(STORAGE_KEYS.savedRestaurants, next);
  return !exists;
}

export function removeSavedRestaurant(restaurantId: string) {
  const current = getSavedRestaurants();
  const next = current.filter((item) => item.id !== restaurantId);
  writeJson(STORAGE_KEYS.savedRestaurants, next);
}

export function addMenuActivity(input: {
  restaurantId: string;
  restaurantName: string;
  type: FeedbackType;
}) {
  const current = readJson<MenuActivity[]>(STORAGE_KEYS.activities, []);
  const nextActivity: MenuActivity = {
    id: `${input.type}_${input.restaurantId}_${Date.now()}`,
    restaurantId: input.restaurantId,
    restaurantName: input.restaurantName,
    type: input.type,
    createdAt: new Date().toISOString(),
  };
  const next = [nextActivity, ...current];
  writeJson(STORAGE_KEYS.activities, next);
  return nextActivity;
}

export function getMenuActivities() {
  return readJson<MenuActivity[]>(STORAGE_KEYS.activities, []);
}
