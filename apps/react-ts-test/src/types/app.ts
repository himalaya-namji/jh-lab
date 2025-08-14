// 테스트 컴포넌트 타입 정의
export interface TestComponent {
  name: string;
  component: React.ReactNode;
}

export interface TestComponents {
  [key: string]: TestComponent;
}

// 탭 네비게이션 타입
export type TabKey = 'idcard' | 'mobileid' | 'mobileidselector' | 'hash' | 'idcardv2' | 'dialog' | 'heart';

// URL 쿼리 파라미터 타입
export interface AppQueryParams {
  tab?: TabKey;
}

// 헤더 컴포넌트 Props
export interface HeaderProps {
  currentTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

// 메인 콘텐츠 컴포넌트 Props
export interface MainContentProps {
  currentTab: TabKey;
} 