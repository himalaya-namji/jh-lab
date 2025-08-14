import React, { useEffect, useRef, useState } from 'react';

interface LinkWindowRotatorProps {
  urls: string[];
  intervalMs?: number; // 기본값: 10000ms
}

const LinkWindowRotator: React.FC<LinkWindowRotatorProps> = ({
  urls,
  intervalMs = 10000,
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const windowRef = useRef<Window | null>(null);
  const intervalRef = useRef<number | null>(null);
  useEffect(() => {
    window.open(urls[0], "", 'width=100,height=100');
  }, [urls]);
  const openNextWindow = () => {
    if (urls.length === 0) return;

    // 이전 창 닫기
    if (windowRef.current && !windowRef.current.closed) {
      windowRef.current.close();
    }

    // 새 창 열기
    const nextUrl = urls[currentIndex];
    const newWindow = window.open(
      nextUrl,
      "",
      'width=100,height=100,left=100,top=100'
    );

    if (newWindow) {
      windowRef.current = newWindow;
    }

    // 인덱스 업데이트
    setCurrentIndex((prev) => (prev + 1) % urls.length);
  };

  const handleStart = () => {
    if (!isRunning && urls.length > 0) {
      openNextWindow(); // 첫 창 열기
      intervalRef.current = window.setInterval(openNextWindow, intervalMs);
      setIsRunning(true);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (windowRef.current && !windowRef.current.closed) {
        windowRef.current.close();
      }
    };
  }, []);

  return (
    <div>
      <button onClick={handleStart} disabled={isRunning}>
        {isRunning ? '브라우저 새 창 순차 열기 중...' : '링크 순차 새창 열기 시작'}
      </button>
      <p style={{ marginTop: '10px', fontSize: '14px', color: '#555' }}>
        현재 순번: {currentIndex + 1} / {urls.length}
      </p>
    </div>
  );
};

export default LinkWindowRotator;
