import type { MenuFilter } from "@/features/menu-mvp/types/menu";

interface FilterSummaryProps {
  filter: MenuFilter;
}

const distanceMap: Record<MenuFilter["distanceMeters"], string> = {
  500: "500m",
  1000: "1km",
  3000: "3km",
};

const priceMap = {
  LOW: "저가",
  MID: "중가",
  HIGH: "고가",
} as const;

export default function FilterSummary({ filter }: FilterSummaryProps) {
  return (
    <p className="menu-mvp-summary">
      최근 사용 필터: {distanceMap[filter.distanceMeters]},{" "}
      {filter.priceLevels.map((price) => priceMap[price]).join("/")},{" "}
      {filter.onlyOpenNow ? "영업중" : "전체"}
    </p>
  );
}
