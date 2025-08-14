# React TypeScript Test Workspace

React와 TypeScript를 사용한 컴포넌트 테스트 워크스페이스입니다.

## 🚀 주요 기능

- **라우팅 기반 탭 네비게이션**: 쿼리스트링을 사용한 탭 전환
- **고정 헤더**: 상단에 고정된 헤더와 탭 네비게이션
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 지원
- **접근성 지원**: ARIA 속성 및 키보드 네비게이션
- **TypeScript**: 완전한 타입 안전성

## 📁 프로젝트 구조

```
src/
├── components/           # 테스트 컴포넌트들
│   ├── chat-id-selector/     # 대화형 신분증 선택기
│   ├── mobile-id-selector/   # 모바일 신분증 선택기
│   ├── simple-id-selector/   # 일반형 신분증 선택기
│   ├── mobile-id-selector-dialog/ # 대화형 모바일 신분증
│   ├── HeartButton.tsx       # 하트 버튼 컴포넌트
│   ├── HeartButtonContainer.tsx # 하트 버튼 테스트 컨테이너
│   ├── HashTest.tsx          # 해시 테스트
│   └── MobileIdButton.tsx    # 모바일 신분증 버튼
├── types/               # TypeScript 타입 정의
│   ├── app.ts              # 앱 관련 타입
│   ├── caApp.ts            # CA 앱 타입
│   └── idCard.ts           # 신분증 관련 타입
├── hooks/               # 커스텀 훅
│   └── useCaAppList.ts     # CA 앱 리스트 훅
├── utils/               # 유틸리티 함수
│   └── timeUtils.ts        # 시간 관련 유틸리티
└── assets/              # 정적 자산
    ├── kakaobank.png
    ├── mobileId.png
    └── tossbank.png
```

## 🎯 테스트 컴포넌트

### 1. 대화형신분증선택 (`/tab=idcard`)
- 채팅 형태의 신분증 선택 인터페이스
- 접근성 지원 및 키보드 네비게이션

### 2. 모바일신분증 (`/tab=mobileid`)
- 모바일 신분증 관련 기능 테스트

### 3. 모바일신분증선택 (`/tab=mobileidselector`)
- 모바일 신분증 선택 컴포넌트

### 4. 해시테스트 (`/tab=hash`)
- 해시 관련 기능 테스트

### 5. 일반형신분증선택 (`/tab=idcardv2`)
- 일반적인 신분증 선택 인터페이스

### 6. 대화형모바일신분증 (`/tab=dialog`)
- 대화형 모바일 신분증 다이얼로그

### 7. 하트버튼테스트 (`/tab=heart`)
- 미시 인터랙션 테스트 (Framer Motion 사용)

## 🛠️ 기술 스택

- **React 19.1.0**: 최신 React 버전
- **TypeScript 5.8.3**: 타입 안전성
- **React Router DOM 7.7.1**: 라우팅
- **Framer Motion 12.23.7**: 애니메이션
- **Vite 7.0.4**: 빌드 도구
- **Jest**: 테스트 프레임워크

## 🚀 시작하기

### 개발 서버 실행
```bash
pnpm dev
```

### 빌드
```bash
pnpm build
```

### 테스트 실행
```bash
pnpm test
```

### 린트 검사
```bash
pnpm lint
```

## 🎨 디자인 시스템

### 색상 팔레트
- **Primary**: `#667eea` ~ `#764ba2` (그라데이션)
- **Background**: `#f8fafc`
- **Text**: `#2d3748`, `#4a5568`
- **Success**: `#48bb78`

### 타이포그래피
- **Font Family**: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif
- **Heading**: 1.5rem ~ 2rem
- **Body**: 0.875rem ~ 1.1rem

### 반응형 브레이크포인트
- **Mobile**: < 480px
- **Tablet**: 480px ~ 768px
- **Desktop**: > 768px

## ♿ 접근성

- **ARIA 속성**: `role`, `aria-label`, `aria-selected` 등
- **키보드 네비게이션**: Tab, Enter, Space 키 지원
- **스크린 리더**: 적절한 라벨링 및 상태 안내
- **포커스 관리**: 명확한 포커스 표시

## 📝 개발 가이드라인

### 컴포넌트 작성 시
1. TypeScript 타입 정의 필수
2. 접근성 속성 추가
3. 반응형 디자인 고려
4. 테스트 코드 작성

### 스타일링
1. CSS 모듈 또는 인라인 스타일 사용
2. 반응형 미디어 쿼리 적용
3. 접근성을 위한 충분한 색상 대비

### 상태 관리
1. React Hooks 사용
2. 불필요한 리렌더링 방지
3. 에러 처리 구현

## 🔧 환경 설정

### 개발 환경
- Node.js 18+
- pnpm 8+

### 브라우저 지원
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.
