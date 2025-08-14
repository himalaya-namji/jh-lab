import React from 'react';
import HeartButton from './HeartButton';
import './HeartButtonContainer.css';

const HeartButtonContainer: React.FC = () => {
  return (
    <div className="heart-button-container">
      <div className="container-header">
        <h2>하트 버튼 테스트</h2>
        <p>미시 인터랙션 예시: 하트 버튼을 클릭해보세요</p>
      </div>
      <div className="heart-button-wrapper">
        <HeartButton />
      </div>
      <div className="test-description">
        <h3>테스트 내용:</h3>
        <ul>
          <li>하트 버튼 클릭 시 색상 변경</li>
          <li>팝 애니메이션 효과</li>
          <li>접근성 지원 (aria-label)</li>
          <li>키보드 네비게이션</li>
        </ul>
      </div>
    </div>
  );
};

export default HeartButtonContainer; 