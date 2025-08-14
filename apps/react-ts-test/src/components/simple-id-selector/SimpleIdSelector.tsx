import React, { useState } from 'react';
import type { IdCardOption, BankOption } from '../../types/idCard';
import './SimpleIdSelector.css';

const SimpleIdSelector: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<IdCardOption | null>(null);
  const [selectedBank, setSelectedBank] = useState<BankOption | null>(null);

  const idCardOptions: IdCardOption[] = [
    {
      id: '1',
      name: '주민등록증',
      icon: '🆔',
      type: 'physical'
    },
    {
      id: '2',
      name: '운전면허증',
      icon: '🚗',
      type: 'physical'
    },
    {
      id: '3',
      name: '모바일 신분증',
      description: '주민등록증, 운전면허증만 가능',
      icon: '📱',
      type: 'mobile'
    }
  ];

  const bankOptions: BankOption[] = [
    {
      id: '1',
      name: '모바일 신분증',
      icon: '📱',
      color: '#f3f5f7'
    },
    {
      id: '2',
      name: '카카오뱅크',
      icon: '🏦',
      color: '#ffe400'
    },
    {
      id: '3',
      name: '토스뱅크',
      icon: '🏦',
      color: '#e3f2ff'
    }
  ];

  const handleCardSelect = (card: IdCardOption) => {
    setSelectedCard(card);
    if (card.type !== 'mobile') {
      setSelectedBank(null);
    }
  };

  const handleBankSelect = (bank: BankOption) => {
    setSelectedBank(bank);
  };

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  const handleBack = () => {
    // 뒤로가기 로직
    console.log('뒤로가기');
  };

  const handleCancel = () => {
    // 취소 로직
    console.log('취소');
  };

  return (
    <div className="id-card-selector-v2" role="application" aria-label="신분증 선택">
      {/* Navigation Bar */}
      <nav className="navigation-bar" aria-label="주요 네비게이션">
        <div className="status-bar" aria-hidden="true">
          <span className="time">9:30</span>
          <div className="status-icons">
            <span className="wifi" aria-label="WiFi 연결됨">📶</span>
            <span className="signal" aria-label="신호 강함">📡</span>
            <span className="battery" aria-label="배터리 80%">🔋</span>
          </div>
        </div>
        <header className="header">
          <button 
            className="back-button"
            type="button"
            aria-label="이전 페이지로 이동"
            onClick={handleBack}
          >
            <span aria-hidden="true">←</span>
          </button>
          <h1 className="title">신분증 확인</h1>
          <button 
            className="cancel-button"
            type="button"
            aria-label="신분증 확인 취소"
            onClick={handleCancel}
          >
            취소
          </button>
        </header>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {/* Title Section */}
        <section className="title-section" aria-labelledby="main-title">
          <div className="title-text">
            <span className="title-line">사용자 정보 확인에 사용할</span>
            <div className="title-highlight">
              <span className="highlight-text">신분증</span>
              <span className="title-line">을</span>
              <span className="highlight-text">선택해 주세요</span>
            </div>
          </div>
        </section>

        {/* Card Selection */}
        <section className="card-selection" aria-labelledby="card-selection-title">
          <h2 id="card-selection-title" className="visually-hidden">신분증 선택</h2>
          {idCardOptions.map((card) => (
            <button
              key={card.id}
              className={`card-option ${selectedCard?.id === card.id ? 'selected' : ''} ${card.type === 'mobile' ? 'mobile-card' : ''}`}
              onClick={() => handleCardSelect(card)}
              onKeyDown={(e) => handleKeyDown(e, () => handleCardSelect(card))}
              aria-pressed={selectedCard?.id === card.id}
              aria-describedby={`card-description-${card.id}`}
              type="button"
              tabIndex={0}
            >
              <div className="card-content">
                <div className="card-icon" aria-hidden="true">
                  <div className="icon-bg">
                    <span className="icon">{card.icon}</span>
                  </div>
                </div>
                <div className="card-info">
                  <h3 className="card-name">{card.name}</h3>
                  {card.description && (
                    <p className="card-description" id={`card-description-${card.id}`}>
                      {card.description}
                    </p>
                  )}
                </div>
              </div>
              
              {/* Bank Selection (only for mobile ID) */}
              {card.type === 'mobile' && selectedCard?.id === card.id && (
                <div className="bank-selection">
                  <div className="bank-list" role="radiogroup" aria-label="은행 선택">
                    <div className="bank-item">
                      <div className="bank-icon" aria-hidden="true">
                        <span className="bank-icon-text">📱</span>
                      </div>
                      <div className="bank-info">
                        <span className="bank-name">모바일 신분증</span>
                        <span className="bank-time" aria-label="처리 시간">00:00:00</span>
                      </div>
                      <div className="bank-arrow" aria-hidden="true">→</div>
                    </div>
                  </div>
                </div>
              )}
            </button>
          ))}
        </section>
      </main>
    </div>
  );
};

export default SimpleIdSelector; 