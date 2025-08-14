import React, { useState } from 'react';
import MobileIdSelectorDialog from './MobileIdSelectorDialog';
import './MobileIdSelectorDialogTest.css';

const MobileIdSelectorDialogTest: React.FC = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [selectedIdType, setSelectedIdType] = useState<string>('');
  const [selectedBank, setSelectedBank] = useState<string>('');

  const handleShowDialog = () => {
    setShowDialog(true);
    setSelectedIdType('');
    setSelectedBank('');
  };

  const handleHideDialog = () => {
    setShowDialog(false);
  };

  const handleSelectIdType = (idType: 'resident' | 'driver' | 'mobile') => {
    setSelectedIdType(idType);
    console.log('선택된 신분증 타입:', idType);
  };

  const handleSelectBank = (bank: 'mobile' | 'kakao' | 'toss') => {
    setSelectedBank(bank);
    console.log('선택된 은행:', bank);
  };

  return (
    <div className="mobile-id-selector-test">
      <div className="test-controls">
        <h2>대화형 모바일 신분증 선택 컴포넌트 테스트</h2>
        
        <div className="test-buttons">
          <button 
            className="test-button primary"
            onClick={handleShowDialog}
          >
            컴포넌트 열기
          </button>
          
          <button 
            className="test-button secondary"
            onClick={handleHideDialog}
            disabled={!showDialog}
          >
            컴포넌트 닫기
          </button>
        </div>

        <div className="test-info">
          <div className="info-item">
            <strong>선택된 신분증:</strong> 
            <span className={selectedIdType ? 'selected' : 'not-selected'}>
              {selectedIdType || '선택되지 않음'}
            </span>
          </div>
          
          <div className="info-item">
            <strong>선택된 은행:</strong> 
            <span className={selectedBank ? 'selected' : 'not-selected'}>
              {selectedBank || '선택되지 않음'}
            </span>
          </div>
        </div>

        <div className="test-description">
          <h3>사용 방법:</h3>
          <ol>
            <li>"컴포넌트 열기" 버튼을 클릭하여 대화형 신분증 선택 컴포넌트를 표시합니다.</li>
            <li>주민등록증, 운전면허증, 또는 모바일 신분증 중 하나를 선택합니다.</li>
            <li>모바일 신분증을 선택하면 은행 선택 옵션이 나타납니다.</li>
            <li>선택한 내용은 아래에 표시되며, 콘솔에도 로그가 출력됩니다.</li>
            <li>"컴포넌트 닫기" 버튼으로 컴포넌트를 숨길 수 있습니다.</li>
          </ol>
        </div>
      </div>

      {showDialog && (
        <div className="dialog-overlay" onClick={handleHideDialog}>
          <div className="dialog-container" onClick={(e) => e.stopPropagation()}>
            <MobileIdSelectorDialog
              onSelectIdType={handleSelectIdType}
              onSelectBank={handleSelectBank}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileIdSelectorDialogTest; 