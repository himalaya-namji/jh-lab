// components/LinkRotator.tsx

import React, { useEffect, useRef, useState } from 'react';

interface LinkRotatorProps {
  urls: string[];
  intervalMs?: number; // 기본값: 10000ms
}

const LinkRotator: React.FC<LinkRotatorProps> = ({ urls, intervalMs = 10000 }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const intervalRef = useRef<number | null>(null);

  // 링크 로딩 함수
  const loadNextUrl = () => {
    if (iframeRef.current && urls.length > 0) {
      iframeRef.current.src = urls[currentIndex];
      setCurrentIndex((prev) => (prev + 1) % urls.length);
    }
  };

  // 시작 버튼 클릭 핸들러
  const handleStart = () => {
    if (!isRunning) {
      loadNextUrl(); // 첫 링크 로딩
      intervalRef.current = window.setInterval(loadNextUrl, intervalMs);
      setIsRunning(true);
    }
  };

  // 컴포넌트 언마운트 시 interval 정리
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div>
      <button onClick={handleStart} disabled={isRunning}>
        {isRunning ? '링크 순차 로딩 중...' : '링크 순차 로딩 시작'}
      </button>
      <div style={{ marginTop: '10px' }}>
        <iframe
        src='https://blog.naver.com/91namji/223942341914'
          ref={iframeRef}
          title="link-viewer"
          width="100%"
          height="600px"
          style={{ border: '1px solid #ccc' }}
        />
      </div>
    </div>
  );
};

export default LinkRotator;
