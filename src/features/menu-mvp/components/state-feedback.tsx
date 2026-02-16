interface StateFeedbackProps {
  type: "location_denied" | "no_candidates" | "network_error";
}

const contentMap = {
  location_denied: {
    message: "주변 추천을 위해 위치 권한이 필요해요",
    primaryAction: "주소/지하철역으로 검색",
  },
  no_candidates: {
    message: "조건에 맞는 식당이 없어요",
    primaryAction: "반경 넓히기",
  },
  network_error: {
    message: "잠시 후 다시 시도해주세요",
    primaryAction: "재시도",
  },
} as const;

export default function StateFeedback({ type }: StateFeedbackProps) {
  const content = contentMap[type];

  return (
    <section className={`menu-mvp-feedback ${type} menu-mvp-fade-up`}>
      <p className="menu-mvp-card-desc" style={{ margin: "0 0 10px" }}>
        {content.message}
      </p>
      <button type="button" className="menu-mvp-btn menu-mvp-btn-secondary">
        {content.primaryAction}
      </button>
    </section>
  );
}
