import React, { useState } from 'react';
import './MobileIdSelectorDialog.css';

interface MobileIdSelectorDialogProps {
  onSelectIdType?: (idType: 'resident' | 'driver' | 'mobile') => void;
  onSelectBank?: (bank: 'mobile' | 'kakao' | 'toss') => void;
}

const MobileIdSelectorDialog: React.FC<MobileIdSelectorDialogProps> = ({
  onSelectIdType,
  onSelectBank
}) => {
  const [selectedIdType, setSelectedIdType] = useState<'resident' | 'driver' | 'mobile' | null>(null);
  const [selectedBank, setSelectedBank] = useState<'mobile' | 'kakao' | 'toss' | null>(null);

  const handleIdTypeSelect = (idType: 'resident' | 'driver' | 'mobile') => {
    setSelectedIdType(idType);
    onSelectIdType?.(idType);
  };

  const handleBankSelect = (bank: 'mobile' | 'kakao' | 'toss') => {
    setSelectedBank(bank);
    onSelectBank?.(bank);
  };

  return (
    <div className="mobile-id-selector-dialog">
      {/* Progress Bar */}
      <div className="progress-bar">
        <div className="progress-fill"></div>
      </div>

      {/* Navigation Bar */}
      <div className="navigation-bar">
        <div className="status-bar">
          <div className="time">9:30</div>
          <div className="status-icons">
            <div className="wifi-icon"></div>
            <div className="signal-icon"></div>
            <div className="battery-icon"></div>
          </div>
        </div>
        <div className="header">
          <button className="back-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="#212528" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h1 className="title">대화형 가입 신청</h1>
          <div className="header-right"></div>
        </div>
      </div>

      {/* Chat Body */}
      <div className="chat-body">
        {/* Question Frame */}
        <div className="question-frame">
          <div className="question-content">
            <div className="question-header">
              <div className="user-avatar">
                <div className="avatar-bg">
                  <div className="avatar-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path d="M10 10C12.7614 10 15 7.76142 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10Z" fill="#6C757D"/>
                      <path d="M10 12C6.68629 12 4 14.6863 4 18V20H16V18C16 14.6863 13.3137 12 10 12Z" fill="#6C757D"/>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="question-text">
                <p>사용자 정보 확인에 사용할 신분증을 선택해주세요.</p>
              </div>
            </div>
            
            <p className="sub-text">아래 신분증 중 하나를 선택해서 진행해 주세요.</p>

            {/* ID Type Options */}
            <div className="id-options">
              {/* 주민등록증 */}
              <div 
                className={`id-option ${selectedIdType === 'resident' ? 'selected' : ''}`}
                onClick={() => handleIdTypeSelect('resident')}
              >
                <div className="id-icon">
                  <div className="id-card-preview">
                    <div className="card-content">
                      <div className="card-header">주민등록증</div>
                      <div className="card-info">
                        <div className="name">김우리</div>
                        <div className="number">123456-7891012</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="id-label">주민등록증</div>
              </div>

              {/* 운전면허증 */}
              <div 
                className={`id-option ${selectedIdType === 'driver' ? 'selected' : ''}`}
                onClick={() => handleIdTypeSelect('driver')}
              >
                <div className="id-icon">
                  <div className="id-card-preview">
                    <div className="card-content">
                      <div className="card-header">운전면허증</div>
                      <div className="card-info">
                        <div className="name">김우리</div>
                        <div className="number">12-34-567890-01</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="id-label">운전면허증</div>
              </div>

              {/* 모바일 신분증 */}
              <div 
                className={`id-option mobile-option ${selectedIdType === 'mobile' ? 'selected' : ''}`}
                onClick={() => handleIdTypeSelect('mobile')}
              >
                <div className="mobile-id-header">
                  <div className="id-icon">
                    <div className="id-card-preview">
                      <div className="card-content">
                        <div className="card-header">모바일 신분증</div>
                        <div className="card-info">
                          <div className="name">김우리</div>
                          <div className="number">12-34-567890-01</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="id-label">
                    <div>모바일 신분증</div>
                    <div className="sub-label">주민등록증, 운전면허증만 가능</div>
                  </div>
                </div>

                {/* Bank Selection */}
                {selectedIdType === 'mobile' && (
                  <div className="bank-selection">
                    <div className="bank-label">아래 앱들 중 한개를 선택해주세요.</div>
                    <div className="bank-options">
                      <div 
                        className={`bank-option ${selectedBank === 'mobile' ? 'selected' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBankSelect('mobile');
                        }}
                      >
                        <div className="bank-icon mobile-icon">
                          <div className="mobile-bg"></div>
                        </div>
                        <div className="bank-name">모바일 신분증</div>
                      </div>
                      
                      <div 
                        className={`bank-option ${selectedBank === 'kakao' ? 'selected' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBankSelect('kakao');
                        }}
                      >
                        <div className="bank-icon kakao-icon">
                          <div className="kakao-bg"></div>
                        </div>
                        <div className="bank-name">카카오뱅크</div>
                      </div>
                      
                      <div 
                        className={`bank-option ${selectedBank === 'toss' ? 'selected' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBankSelect('toss');
                        }}
                      >
                        <div className="bank-icon toss-icon">
                          <div className="toss-bg"></div>
                        </div>
                        <div className="bank-name">토스뱅크</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Answer Frame */}
        {selectedIdType && (
          <div className="answer-frame">
            <div className="answer-content">
              <div className="answer-text">
                {selectedIdType === 'resident' && '주민등록증'}
                {selectedIdType === 'driver' && '운전면허증'}
                {selectedIdType === 'mobile' && '모바일 신분증'}
              </div>
              <div className="edit-icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2L14 8L8 14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MobileIdSelectorDialog; 