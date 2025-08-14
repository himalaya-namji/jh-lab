import React, { useState } from 'react';
import './MobileIdSelector.css';

interface IdCardOption {
  id: string;
  name: string;
  description?: string;
  icon: string;
  type: 'physical' | 'mobile';
}

interface BankOption {
  id: string;
  name: string;
  icon: string;
  color: string;
}

const MobileIdSelector: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<IdCardOption | null>(null);
  const [selectedBank, setSelectedBank] = useState<BankOption | null>(null);
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  const idCardOptions: IdCardOption[] = [
    {
      id: 'resident',
      name: '주민등록증',
      icon: '🆔',
      type: 'physical'
    },
    {
      id: 'driver',
      name: '운전면허증',
      icon: '🚗',
      type: 'physical'
    },
    {
      id: 'mobile',
      name: '모바일 신분증',
      description: '주민등록증, 운전면허증만 가능',
      icon: '📱',
      type: 'mobile'
    }
  ];

  const bankOptions: BankOption[] = [
    {
      id: 'mobileid',
      name: '모바일 신분증',
      icon: '📱',
      color: '#f3f5f7'
    },
    {
      id: 'kakao',
      name: '카카오뱅크',
      icon: '💛',
      color: '#ffe400'
    },
    {
      id: 'toss',
      name: '토스뱅크',
      icon: '💙',
      color: '#e3f2ff'
    },
    {
      id: 'shinhan',
      name: '신한은행',
      icon: '💚',
      color: '#00c851'
    }
  ];

  const handleCardSelect = (card: IdCardOption) => {
    if (card.type === 'mobile') {
      if (selectedCard?.id === card.id) {
        setIsMobileExpanded(!isMobileExpanded);
      } else {
        setSelectedCard(card);
        setIsMobileExpanded(true);
      }
    } else {
      setSelectedCard(card);
      setIsMobileExpanded(false);
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
    <div className="mobile-id-selector" role="application" aria-label="모바일 신분증 선택">
      {/* Navigation Bar */}
      <nav className="navigation-bar" aria-label="주요 네비게이션">
        <div className="status-bar" aria-hidden="true">
          <div className="time">9:30</div>
          <div className="status-icons">
            <div className="wifi-icon" aria-label="WiFi 연결됨">📶</div>
            <div className="battery-icon" aria-label="배터리 80%">🔋</div>
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
            <div className="title-line">사용자 정보 확인에 사용할</div>
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
            <div key={card.id} className={`card-option-container ${card.type}`}>
              <button
                className={`card-option ${card.type} ${selectedCard?.id === card.id ? 'selected' : ''}`}
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
                    <div className="card-name">{card.name}</div>
                    {card.description && (
                      <div className="card-description" id={`card-description-${card.id}`}>
                        {card.description}
                      </div>
                    )}
                  </div>
                </div>
              </button>

              {/* Mobile Card Expanded Section */}
              {card.type === 'mobile' && selectedCard?.id === card.id && isMobileExpanded && (
                <div className="mobile-expanded">
                  <div className="bank-selection">
                    <div className="bank-label" id="bank-selection-label">
                      아래 앱들 중 한개를 선택해주세요.
                    </div>
                    <div 
                      className="bank-list"
                      role="radiogroup"
                      aria-labelledby="bank-selection-label"
                    >
                      {bankOptions.map((bank) => (
                        <button
                          key={bank.id}
                          className={`bank-option ${selectedBank?.id === bank.id ? 'selected' : ''}`}
                          onClick={() => handleBankSelect(bank)}
                          onKeyDown={(e) => handleKeyDown(e, () => handleBankSelect(bank))}
                          aria-pressed={selectedBank?.id === bank.id}
                          aria-label={`${bank.name} 선택`}
                          type="button"
                          tabIndex={0}
                        >
                          <div 
                            className="bank-icon"
                            style={{ backgroundColor: bank.color }}
                            aria-hidden="true"
                          >
                            <span className="bank-icon-text">{bank.icon}</span>
                          </div>
                          <div className="bank-name">{bank.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};

export default MobileIdSelector; 