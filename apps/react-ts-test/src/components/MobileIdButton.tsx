import { useState } from 'react';
import reactLogo from '../assets/react.svg';
import useCaAppList from '../hooks/useCaAppList';

interface MobileIdButtonProps {
  width?: string | number;
  height?: string | number;
}

export default function MobileIdButton({ width = '100%', height = 'auto' }: MobileIdButtonProps) {
  const [showIcons, setShowIcons] = useState(false);
  const { caList, loading, error } = useCaAppList();
  const [selectedAppCode, setSelectedAppCode] = useState<string | null>(null);

  const handleIconClick = (icon: any) => {
    setSelectedAppCode(icon.appCode);
    console.log('클릭한 아이콘:', icon.appName, icon.appCode);
    // 여기에 원하는 동작 추가 가능
  };

  return (
    <div
      style={{
        border: '1px solid #ccc',
        borderRadius: 12,
        padding: 20,
        display: 'inline-block',
        minWidth: 220,
        width: width,
        height: height,
        maxWidth: 400,
        boxSizing: 'border-box',
      }}
    >
      <button
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          width: '100%',
          padding: 0,
          flexWrap: 'wrap',
        }}
        onClick={() => setShowIcons((v) => !v)}
      >
        <img src={reactLogo} alt="React" width={48} height={48} style={{ flexShrink: 0 }} />
        <span style={{ fontSize: 20, fontWeight: 500, wordBreak: 'keep-all' }}>모바일 신분증</span>
      </button>
      {showIcons && (
        <div style={{ marginTop: 24 }}>
          <div style={{ borderTop: '1px solid #DEE3E6', marginBottom: 16, marginTop: 0 }} />
          <div style={{ textAlign: 'left', fontSize: 14, color: '#222', marginBottom: 12 }}>
            아래 앱들 중 한개를 선택해주세요.
          </div>
          {loading && <div style={{ fontSize: 13, color: '#888' }}>앱 정보를 불러오는 중...</div>}
          {error && <div style={{ fontSize: 13, color: 'red' }}>앱 정보 로딩 실패: {error}</div>}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: 6,
              flexWrap: 'wrap',
            }}
          >
            {!loading && !error && caList.map((icon) => (
              <button
                key={icon.appCode}
                type="button"
                style={{
                  background: selectedAppCode === icon.appCode ? '#E5F4FF' : '#F3F5F7',
                  borderRadius: 9.95,
                  width: 76,
                  height: 68,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                  marginBottom: 6,
                  flex: '1 1 76px',
                  minWidth: 76,
                  maxWidth: 120,
                  cursor: 'pointer',
                  border: 'none',
                  outline: 'none',
                  transition: 'background 0.2s',
                }}
                onClick={() => handleIconClick(icon)}
                aria-label={icon.appName}
              >
                <img
                  src={icon.appIcon}
                  alt={icon.appName}
                  width={24}
                  height={24}
                  style={{ objectFit: 'contain', marginBottom: 6 }}
                />
                <span style={{ fontSize: 12, color: '#222', wordBreak: 'break-all', textAlign: 'center' }}>
                  {icon.appName}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 