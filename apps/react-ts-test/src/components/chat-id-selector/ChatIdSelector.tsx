import React, { useState, useEffect, useRef } from 'react';
import type { IdCardOption, BankOption } from '../../types/idCard';
import './ChatIdSelector.css';

const ChatIdSelector: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<IdCardOption | null>(null);
  const [selectedBank, setSelectedBank] = useState<BankOption | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showExpanded, setShowExpanded] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  
  const cardOptionsRef = useRef<HTMLDivElement>(null);

  // 애니메이션 상태 관리
  useEffect(() => {
    if (isExpanded) {
      setShowExpanded(true);
    } else {
      const timer = setTimeout(() => {
        setShowExpanded(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isExpanded]);

  // 스크린 리더를 위한 상태 안내
  useEffect(() => {
    if (selectedCard) {
      const message = selectedCard.type === 'mobile' && selectedBank 
        ? `${selectedBank.name}이 선택되었습니다.`
        : `${selectedCard.name}이 선택되었습니다.`;
      setAnnouncement(message);
    }
  }, [selectedCard, selectedBank]);

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
    if (card.type === 'mobile') {
      if (selectedCard?.id === card.id) {
        setIsExpanded(false);
        setTimeout(() => {
          setSelectedCard(null);
          setSelectedBank(null);
        }, 300);
      } else {
        setSelectedCard(card);
        setIsExpanded(true);
      }
    } else {
      setSelectedCard(card);
      setIsExpanded(false);
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

  const handleEdit = () => {
    // 수정 로직
    console.log('수정');
  };

  return (
    <div className="id-card-selector" role="application" aria-label="신분증 선택">
      {/* 스크린 리더를 위한 상태 안내 */}
      <div aria-live="polite" aria-atomic="true" className="visually-hidden">
        {announcement}
      </div>

      {/* Progress Bar */}
      <div className="progress-bar" role="progressbar" aria-valuenow={33} aria-valuemin={0} aria-valuemax={100}>
        <div className="progress-fill"></div>
      </div>

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
          <h1 className="title">대화형 가입 신청</h1>
          <div className="header-right" aria-hidden="true"></div>
        </header>
      </nav>

      {/* Chat Body */}
      <main className="chat-body">
        {/* Question */}
        <section className="chat-question" aria-labelledby="chat-question-title">
          <div className="question-bubble">
            <div className="question-header">
              <div className="user-avatar" aria-hidden="true">
                <div className="avatar-bg">
                  <span className="avatar-icon">👤</span>
                </div>
              </div>
              <div className="question-text" id="chat-question-title">
                사용자 정보 확인에 사용할 신분증을 선택해주세요.
              </div>
            </div>
            <p className="question-description">
              아래 신분증 중 하나를 선택해서 진행해 주세요.
            </p>

            {/* ID Card Options */}
            <div 
              className="id-card-options" 
              ref={cardOptionsRef}
              role="radiogroup" 
              aria-label="신분증 선택 옵션"
            >
              {idCardOptions.map((card) => (
                <div key={card.id} className={`id-card-option-container ${card.type === 'mobile' ? 'mobile-card' : ''}`}>
                  <button
                    className={`id-card-option ${selectedCard?.id === card.id ? 'selected' : ''}`}
                    onClick={() => handleCardSelect(card)}
                    onKeyDown={(e) => handleKeyDown(e, () => handleCardSelect(card))}
                    aria-checked={selectedCard?.id === card.id}
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
                  </button>
                  
                  {/* Bank Selection (only for mobile ID) */}
                  {card.type === 'mobile' && selectedCard?.id === card.id && showExpanded && (
                    <div className={`mobile-card-expanded ${isExpanded ? 'expanded' : 'collapsed'}`}>
                      <div className="divider" aria-hidden="true"></div>
                      <div className="bank-selection">
                        <div className="bank-label" id={`bank-selection-label-${card.id}`}>
                          아래 앱들 중 한개를 선택해주세요.
                        </div>
                        <div 
                          className="bank-options"
                          role="radiogroup"
                          aria-labelledby={`bank-selection-label-${card.id}`}
                        >
                          {bankOptions.map((bank) => (
                            <button
                              key={bank.id}
                              className={`bank-option ${selectedBank?.id === bank.id ? 'selected' : ''}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleBankSelect(bank);
                              }}
                              onKeyDown={(e) => {
                                e.stopPropagation();
                                handleKeyDown(e, () => handleBankSelect(bank));
                              }}
                              style={{ backgroundColor: bank.color }}
                              aria-checked={selectedBank?.id === bank.id}
                              aria-label={`${bank.name} 선택`}
                              type="button"
                              tabIndex={0}
                            >
                              <div className="bank-icon" aria-hidden="true">
                                <span className="bank-icon-text">{bank.icon}</span>
                              </div>
                              <span className="bank-name">{bank.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Answer */}
        {selectedCard && (
          <section className="chat-answer" aria-labelledby="chat-answer-title">
            <div className="answer-bubble">
              <div className="answer-content">
                <span className="answer-text" id="chat-answer-title">
                  {selectedCard.type === 'mobile' && selectedBank 
                    ? `${selectedBank.name}`
                    : selectedCard.name
                  }
                </span>
                <button 
                  className="edit-button"
                  type="button"
                  aria-label="선택한 신분증 수정"
                  onClick={handleEdit}
                >
                  <span aria-hidden="true">✏️</span>
                </button>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default ChatIdSelector; 