# wsid-fe 프로젝트 구조/설계/기능 정리

## 1. 프로젝트 개요
- 프로젝트명: `wsid-fe`
- 프레임워크: `Next.js 15 (App Router)` + `React 19` + `TypeScript`
- UI: `Ant Design(antd)`
- 인증: `next-auth v5(beta)` + 커스텀 백엔드 JWT 연동
- 실행 스크립트
  - `npm run dev` (`next dev --turbopack`)
  - `npm run build`
  - `npm run start`
  - `npm run lint`

## 2. 최상위 구조

```text
wsid-fe/
├─ src/
│  ├─ app/                    # App Router 라우트, 레이아웃, API Route
│  │  ├─ api/auth/            # 인증 관련 서버 라우트
│  │  ├─ login/               # 로그인 화면
│  │  ├─ signup/              # 회원가입 화면
│  │  ├─ main/                # 메인 진입 화면
│  │  ├─ hashtag/             # 해시태그 화면
│  │  └─ recommend/           # 추천 화면(영화/맛집)
│  ├─ components/
│  │  ├─ login/               # 로그인 UI 조합
│  │  ├─ main/                # 메인 화면 UI/카테고리
│  │  ├─ movie/               # 영화 추천 상세 UI
│  │  ├─ food/                # 맛집 추천 필터 UI
│  │  ├─ hashtag/             # 해시태그 UI
│  │  ├─ recommend/           # 추천 공통 헤더
│  │  └─ providers/           # 전역 Provider 래퍼
│  ├─ context/                # 전역 상태(Context)
│  ├─ hooks/                  # 커스텀 훅(소셜 인증 후처리)
│  ├─ lib/                    # API 클라이언트/인증/토큰 유틸
│  ├─ constant/               # 도메인 옵션 상수
│  └─ types/                  # next-auth 타입 확장
├─ public/                    # 정적 파일
├─ next.config.ts             # 리다이렉트(/ -> /main)
├─ package.json
└─ tsconfig.json
```

## 3. 라우팅 구조 (App Router)

### 페이지 라우트
- `/` -> `next.config.ts`에서 영구 리다이렉트로 `/main`
- `/main`
- `/login`
- `/signup`
- `/hashtag`
- `/recommend/movie`
- `/recommend/food`

### API 라우트
- `/api/auth/[...nextauth]`
  - NextAuth 핸들러(`GET`, `POST`) 연결
- `/api/auth/email-login`
  - 이메일 로그인 요청을 백엔드 로그인 API로 프록시
- `/api/auth/social-callback`
  - NextAuth 세션 기반으로 백엔드 소셜 로그인 API 호출 후 JWT 반환

## 4. 설계 관점 정리

### 4-1. 전역 Provider 설계
`src/app/layout.tsx` 기준 Provider 계층:
1. `SessionProvider` (next-auth 세션)
2. `SocialAuthProvider` (소셜 로그인 후처리 훅 실행)
3. `RecommendationProvider` (추천 탭 상태 Context)
4. `AntdRegistry` (antd 스타일 SSR 지원)

즉, 인증/후처리/도메인상태/UI레지스트리를 루트에서 공통 적용하는 구조입니다.

### 4-2. 인증/인가 설계
- 소셜 로그인
  - 클라이언트 `signIn(provider)` -> NextAuth OAuth
  - 세션 확장 타입(`src/types/next-auth.d.ts`)에 provider/accessToken 등 포함
  - `useSocialAuth`에서 `/api/auth/social-callback` 호출
  - 백엔드 JWT를 로컬스토리지에 저장 후 신규 유저 여부(`newFlag`)에 따라 이동
- 이메일 로그인
  - 현재 로그인 페이지에서 백엔드 직접 호출(`http://localhost:8080/api/v1/user/login`)
  - 별도로 `/api/auth/email-login` API 라우트도 존재

### 4-3. 데이터 액세스 설계
- 공통 API 유틸: `src/lib/api-client.ts`
  - `apiRequest / apiGet / apiPost` 제공
  - JSON 헤더 병합 및 응답 파싱 처리
  - 토큰 주입 옵션(`skipAuth`) 기반 동작
- 인증 API 유틸: `src/lib/backend-auth.ts`
  - `emailLogin`, `socialLogin`을 백엔드 엔드포인트로 전달

### 4-4. 화면 구성 설계
- 라우트별 `layout.tsx`에서 상단/하단 레이아웃을 공통화
- `components/main/constants/CategoriesData.tsx`에서 카테고리 메타(키, 아이콘, path, 색상) 중심 네비게이션 구성
- 추천 상세(영화/맛집)는 현재 정적/데모 UI 비중이 높고 API 연계는 제한적

## 5. 기능별 목록

### A. 인증/회원
- 이메일 로그인 폼 입력/검증 및 토큰 저장
- 소셜 로그인 버튼(google/kakao/naver) 제공
- NextAuth OAuth 세션 생성 및 세션 정보 확장
- 소셜 로그인 후 백엔드 JWT 교환
- 회원가입 폼(이름, 이메일, 비밀번호, 나이, 성별, 해시태그, 약관동의) 검증 및 제출

### B. 메인/탐색
- 메인 카드(서비스 타이틀)
- 카테고리 아이콘 목록(영화/맛집/카페/음악)
- 랜덤 추천 버튼: 카테고리 중 랜덤 이동
- 공통 헤더/푸터

### C. 추천 기능
- 영화 추천 페이지
  - 영화 정보 카드
  - 등장 배우 목록
  - 유사 영화 목록
- 맛집 추천 페이지
  - 인원/음식종류/가격대 필터 선택
  - 추천하기 버튼(onSubmit 콜백)
- 카페/음악 추천용 UI 컴포넌트는 존재하나, 페이지 라우트는 현재 미구현

### D. 해시태그
- 해시태그 페이지 및 태그 UI(현재 정적 표시 중심)
- 회원가입 폼 내 관심 해시태그 선택/검증

## 6. 현재 구현 상태 요약 (중요)
- 구현됨
  - 기본 라우팅/레이아웃 구조
  - 인증 골격(next-auth + 백엔드 JWT 교환)
  - 메인/로그인/회원가입/영화·맛집 추천 UI
- 부분 구현/미완
  - `/recommend/cafe`, `/recommend/music`는 링크는 있으나 실제 page 라우트 파일 없음
  - 추천 도메인 다수 화면이 정적 목업 데이터 중심
  - 로그인 경로가 혼재(직접 백엔드 호출 vs 내부 API 라우트)
  - `api-client`의 `skipAuth` 명칭/동작이 일반 의미와 반대로 사용되는 부분 존재
  - 환경변수 키 오탈자(`NEXT_PUBLICK_BACKEND_API_URL`) 사용

## 7. 주요 파일 인덱스
- 루트 레이아웃/Provider: `src/app/layout.tsx`
- 메인 화면: `src/app/main/page.tsx`
- 로그인/회원가입: `src/app/login/page.tsx`, `src/app/signup/page.tsx`
- 추천 화면: `src/app/recommend/movie/page.tsx`, `src/app/recommend/food/page.tsx`
- 인증 API: `src/app/api/auth/[...nextauth]/route.ts`, `src/app/api/auth/social-callback/route.ts`, `src/app/api/auth/email-login/route.ts`
- 인증 설정: `src/lib/auth-config.ts`, `src/types/next-auth.d.ts`
- API/토큰 유틸: `src/lib/api-client.ts`, `src/lib/backend-auth.ts`, `src/lib/token-storage.ts`
- 카테고리 메타: `src/components/main/constants/CategoriesData.tsx`

