 "use client";

import { useEffect, useState } from "react";
import type { MenuFilter } from "@/features/menu-mvp/types/menu";

interface BottomSheetFilterProps {
  filter: MenuFilter;
  onApply: (nextFilter: MenuFilter) => void;
  onReset: () => void;
}

const distanceOptions: MenuFilter["distanceMeters"][] = [500, 1000, 3000];

const categoryOptions = [
  { key: "KOREAN", label: "한식" },
  { key: "CHINESE", label: "중식" },
  { key: "JAPANESE", label: "일식" },
  { key: "WESTERN", label: "양식" },
  { key: "SNACK", label: "분식" },
] as const;

const priceLabelMap = {
  LOW: "저가",
  MID: "중가",
  HIGH: "고가",
} as const;

const defaultFilter: MenuFilter = {
  distanceMeters: 1000,
  priceLevels: ["MID"],
  onlyOpenNow: true,
  includeCategories: [],
  excludeCategories: ["FASTFOOD"],
};

export default function BottomSheetFilter({
  filter,
  onApply,
  onReset,
}: BottomSheetFilterProps) {
  const [draft, setDraft] = useState<MenuFilter>(filter);

  useEffect(() => {
    setDraft(filter);
  }, [filter]);

  const sortedPriceLevels = [...draft.priceLevels].sort((a, b) => {
    const order = { LOW: 0, MID: 1, HIGH: 2 } as const;
    return order[a] - order[b];
  });

  const togglePrice = (target: "LOW" | "MID" | "HIGH") => {
    setDraft((prev) => {
      const exists = prev.priceLevels.includes(target);
      const nextLevels = exists
        ? prev.priceLevels.filter((level) => level !== target)
        : [...prev.priceLevels, target];

      return {
        ...prev,
        priceLevels: nextLevels.length === 0 ? ["MID"] : nextLevels,
      };
    });
  };

  const toggleIncludeCategory = (target: MenuFilter["includeCategories"][number]) => {
    setDraft((prev) => {
      const exists = prev.includeCategories.includes(target);
      return {
        ...prev,
        includeCategories: exists
          ? prev.includeCategories.filter((category) => category !== target)
          : [...prev.includeCategories, target],
      };
    });
  };

  const toggleExcludeFastFood = () => {
    setDraft((prev) => {
      const hasFastFood = prev.excludeCategories.includes("FASTFOOD");
      return {
        ...prev,
        excludeCategories: hasFastFood ? [] : ["FASTFOOD"],
      };
    });
  };

  const handleReset = () => {
    setDraft(defaultFilter);
    onReset();
  };

  return (
    <section className="menu-mvp-card menu-mvp-filter-sheet menu-mvp-fade-up">
      <h2 className="menu-mvp-card-title">필터 조정</h2>
      <div className="menu-mvp-filter-grid">
        <div>
          <p className="menu-mvp-filter-item-label">거리</p>
          <div className="menu-mvp-chip-list">
            {distanceOptions.map((distance) => (
              <button
                key={distance}
                type="button"
                className={`menu-mvp-chip menu-mvp-chip-button ${
                  draft.distanceMeters === distance ? "active" : ""
                }`}
                onClick={() => {
                  setDraft((prev) => ({
                    ...prev,
                    distanceMeters: distance,
                  }));
                }}
              >
                {distance === 1000 ? "1km" : `${distance}m`}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="menu-mvp-filter-item-label">가격</p>
          <div className="menu-mvp-chip-list">
            {(Object.keys(priceLabelMap) as ("LOW" | "MID" | "HIGH")[]).map((price) => (
              <button
                key={price}
                type="button"
                className={`menu-mvp-chip menu-mvp-chip-button ${
                  sortedPriceLevels.includes(price) ? "active" : ""
                }`}
                onClick={() => togglePrice(price)}
              >
                {priceLabelMap[price]}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="menu-mvp-filter-item-label">영업중만 보기</p>
          <div className="menu-mvp-chip-list">
            <button
              type="button"
              className={`menu-mvp-chip menu-mvp-chip-button ${
                draft.onlyOpenNow ? "active" : ""
              }`}
              onClick={() => {
                setDraft((prev) => ({
                  ...prev,
                  onlyOpenNow: !prev.onlyOpenNow,
                }));
              }}
            >
              {draft.onlyOpenNow ? "ON" : "OFF"}
            </button>
          </div>
        </div>
        <div>
          <p className="menu-mvp-filter-item-label">카테고리</p>
          <div className="menu-mvp-chip-list">
            {categoryOptions.map((category) => (
              <button
                key={category.key}
                type="button"
                className={`menu-mvp-chip menu-mvp-chip-button ${
                  draft.includeCategories.includes(category.key) ? "active" : ""
                }`}
                onClick={() => toggleIncludeCategory(category.key)}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="menu-mvp-filter-item-label">제외 카테고리</p>
          <div className="menu-mvp-chip-list">
            <button
              type="button"
              className={`menu-mvp-chip menu-mvp-chip-button ${
                draft.excludeCategories.includes("FASTFOOD") ? "active" : ""
              }`}
              onClick={toggleExcludeFastFood}
            >
              패스트푸드 제외
            </button>
          </div>
        </div>
      </div>
      <div className="menu-mvp-button-row" style={{ marginTop: 12 }}>
        <button
          type="button"
          className="menu-mvp-btn menu-mvp-btn-secondary"
          onClick={handleReset}
        >
          초기화
        </button>
        <button
          type="button"
          className="menu-mvp-btn menu-mvp-btn-primary"
          onClick={() => onApply(draft)}
        >
          적용
        </button>
      </div>
    </section>
  );
}
