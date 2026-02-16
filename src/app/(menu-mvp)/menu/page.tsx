"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import BottomSheetFilter from "@/features/menu-mvp/components/bottom-sheet-filter";
import FilterSummary from "@/features/menu-mvp/components/filter-summary";
import ModeSelectionCard from "@/features/menu-mvp/components/mode-selection-card";
import type { MenuFilter } from "@/features/menu-mvp/types/menu";
import type { RecommendationMode } from "@/features/menu-mvp/types/menu";

const defaultFilter: MenuFilter = {
  distanceMeters: 1000,
  priceLevels: ["MID"],
  onlyOpenNow: true,
  includeCategories: [],
  excludeCategories: ["FASTFOOD"],
};

const RECENT_FILTER_STORAGE_KEY = "menu-mvp:recent-filter";

const modeLabelMap: Record<RecommendationMode, string> = {
  RANDOM_ONE_SHOT: "완전 랜덤 한방",
  CATEGORY_RANDOM: "카테고리 랜덤",
  NEARBY_RECOMMEND: "내 주변 추천",
};

export default function MenuHomePage() {
  const [partySize, setPartySize] = useState("3");
  const [foodType, setFoodType] = useState<"한식" | "일식" | "양식">("한식");
  const [budget, setBudget] = useState<"1만원대" | "2~3만원" | "4만원+">("2~3만원");
  const [filter, setFilter] = useState<MenuFilter>(defaultFilter);
  const [mode, setMode] = useState<RecommendationMode>("RANDOM_ONE_SHOT");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem(RECENT_FILTER_STORAGE_KEY);
    if (!raw) {
      return;
    }

    try {
      const parsed = JSON.parse(raw) as MenuFilter;
      if (
        typeof parsed.distanceMeters === "number" &&
        Array.isArray(parsed.priceLevels) &&
        typeof parsed.onlyOpenNow === "boolean" &&
        Array.isArray(parsed.includeCategories) &&
        Array.isArray(parsed.excludeCategories)
      ) {
        setFilter(parsed);
      }
    } catch {
      window.localStorage.removeItem(RECENT_FILTER_STORAGE_KEY);
    }
  }, []);

  const resultHref = useMemo(() => {
    const params = new URLSearchParams({
      mode,
      partySize,
      foodType,
      budget,
      distanceMeters: String(filter.distanceMeters),
      onlyOpenNow: String(filter.onlyOpenNow),
      priceLevels: filter.priceLevels.join(","),
      includeCategories: filter.includeCategories.join(","),
      excludeCategories: filter.excludeCategories.join(","),
    });

    return `/menu/result?${params.toString()}`;
  }, [budget, filter, foodType, mode, partySize]);

  const applyFilter = (nextFilter: MenuFilter) => {
    setFilter(nextFilter);
    window.localStorage.setItem(RECENT_FILTER_STORAGE_KEY, JSON.stringify(nextFilter));
    setIsFilterOpen(false);
  };

  const resetFilter = () => {
    setFilter(defaultFilter);
    window.localStorage.setItem(RECENT_FILTER_STORAGE_KEY, JSON.stringify(defaultFilter));
  };

  return (
    <>
      <header className="menu-home-header menu-mvp-fade-up">
        <h1 className="menu-home-header-title">🍜 맛집 추천</h1>
        <div className="menu-home-header-avatar" aria-hidden />
      </header>

      <section className="menu-home-main-card menu-mvp-fade-up">
        <div className="menu-home-banner">🍝 음식 대표 이미지 / 광고 배너</div>

        <h2 className="menu-home-section-title">가장 맛있는 집을 찾아드려요</h2>
        <p className="menu-home-section-subtitle">인원과 음식 종류, 예산에 맞는 맞춤 추천</p>

        <div style={{ marginBottom: 14 }}>
          <p className="menu-home-field-label">👥 인원</p>
          <div className="menu-mvp-chip-list">
            {["1", "2", "3", "4+"].map((size) => (
              <button
                key={size}
                type="button"
                className={`menu-mvp-chip menu-mvp-chip-button ${
                  partySize === size ? "active" : ""
                }`}
                onClick={() => setPartySize(size)}
              >
                {size}명
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 14 }}>
          <p className="menu-home-field-label">🍽 음식 종류</p>
          <div className="menu-mvp-chip-list">
            {(["한식", "일식", "양식"] as const).map((type) => (
              <button
                key={type}
                type="button"
                className={`menu-mvp-chip menu-mvp-chip-button ${
                  foodType === type ? "active" : ""
                }`}
                onClick={() => setFoodType(type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="menu-home-field-label">💰 가격대</p>
          <div className="menu-mvp-chip-list">
            {(["1만원대", "2~3만원", "4만원+"] as const).map((budgetOption) => (
              <button
                key={budgetOption}
                type="button"
                className={`menu-mvp-chip menu-mvp-chip-button ${
                  budget === budgetOption ? "active" : ""
                }`}
                onClick={() => setBudget(budgetOption)}
              >
                {budgetOption}
              </button>
            ))}
          </div>
        </div>

        <div className="menu-home-summary-wrap">
          <FilterSummary filter={filter} />
          <div className="menu-mvp-button-row" style={{ marginTop: 10 }}>
            <button
              type="button"
              className="menu-mvp-btn menu-mvp-btn-secondary"
              onClick={() => setIsFilterOpen(true)}
            >
              필터 조정
            </button>
            <span className="menu-home-mode-pill">{modeLabelMap[mode]}</span>
          </div>
        </div>

        <Link href={resultHref} className="menu-mvp-btn menu-mvp-btn-primary menu-home-cta">
          추천하기
        </Link>

        <div className="menu-home-pager" aria-hidden>
          <span className="menu-home-pager-dot" />
          <span className="menu-home-pager-dot active" />
          <span className="menu-home-pager-dot" />
          <span className="menu-home-pager-dot" />
        </div>
      </section>

      <section className="menu-home-secondary menu-mvp-fade-up">
        <h3 className="menu-home-secondary-title">빠른 추천 모드</h3>

        <ModeSelectionCard
          title="완전 랜덤 한방"
          description="조건 최소, 바로 1개 추천"
          selected={mode === "RANDOM_ONE_SHOT"}
          action={
            <button
              type="button"
              className="menu-mvp-btn menu-mvp-btn-primary"
              onClick={() => setMode("RANDOM_ONE_SHOT")}
            >
              이 모드 선택
            </button>
          }
        />
        <ModeSelectionCard
          title="카테고리 랜덤"
          description="한식/중식/일식 등 선택 후 랜덤 추천"
          selected={mode === "CATEGORY_RANDOM"}
          action={
            <button
              type="button"
              className="menu-mvp-btn menu-mvp-btn-secondary"
              onClick={() => setMode("CATEGORY_RANDOM")}
            >
              이 모드 선택
            </button>
          }
        />
        <ModeSelectionCard
          title="내 주변 추천"
          description="위치 + 평점/리뷰 기반 추천"
          selected={mode === "NEARBY_RECOMMEND"}
          action={
            <button
              type="button"
              className="menu-mvp-btn menu-mvp-btn-secondary"
              onClick={() => setMode("NEARBY_RECOMMEND")}
            >
              이 모드 선택
            </button>
          }
        />

        <Link href={resultHref} className="menu-mvp-btn menu-mvp-btn-primary menu-home-secondary-cta">
          {modeLabelMap[mode]}으로 추천 시작
        </Link>
      </section>

      {isFilterOpen && (
        <div className="menu-mvp-sheet-backdrop" onClick={() => setIsFilterOpen(false)}>
          <div className="menu-mvp-sheet" onClick={(event) => event.stopPropagation()}>
            <div className="menu-mvp-sheet-topbar">
              <strong>필터 조정</strong>
              <button
                type="button"
                className="menu-mvp-btn menu-mvp-btn-secondary menu-mvp-sheet-close"
                onClick={() => setIsFilterOpen(false)}
              >
                닫기
              </button>
            </div>
            <BottomSheetFilter filter={filter} onApply={applyFilter} onReset={resetFilter} />
          </div>
        </div>
      )}
    </>
  );
}
