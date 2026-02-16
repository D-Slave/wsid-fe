# Menu MVP Structure

`ui-mvp-wireframe.md` 기준으로 모바일 우선 MVP를 위한 폴더/페이지 구조를 정리했다.

## Route Structure (App Router)

- `/menu` : 홈(추천 모드 선택 + 최근 필터 + 필터 조정 진입)
- `/menu/result` : 추천 결과 카드 + 다시 뽑기 + 피드백 액션
- `/menu/restaurants/[restaurantId]` : 음식점 상세
- `/menu/saved` : 저장 목록(찜)
- `/menu/activity` : 내 활동(좋아요/싫어요/방문 기록)

## Folder Structure

```text
src/
  app/
    (menu-mvp)/
      menu/
        layout.tsx
        page.tsx
        result/page.tsx
        restaurants/[restaurantId]/page.tsx
        saved/page.tsx
        activity/page.tsx
  features/
    menu-mvp/
      components/
        mode-selection-card.tsx
        filter-summary.tsx
        bottom-sheet-filter.tsx
        restaurant-result-card.tsx
        state-feedback.tsx
      data/
        mock-restaurants.ts
      lib/
        menu-mvp-api.ts
      types/
        menu.ts
```

## Data/Domain Boundaries

- `types/menu.ts`: 필터, 추천 결과, 상세, 피드백 등 UI/도메인 공용 타입
- `lib/menu-mvp-api.ts`: 백엔드 API 시그니처 래퍼
- `data/mock-restaurants.ts`: API 연동 전 MVP 데모용 목 데이터
- `components/*`: 화면 공용 UI 블록

## API Mapping

- 추천 요청: `POST /v1/recommendations`
- 피드백: `POST /v1/recommendations/{recommendationId}/feedback`
- 상세: `GET /v1/restaurants/{restaurantId}`
- 선호도: `POST /v1/users/{userId}/preferences`
