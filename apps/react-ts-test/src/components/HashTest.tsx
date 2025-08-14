import { useState } from 'react';

// 표준 UUID (RFC 4122) 생성
function randomId() {
  return crypto.randomUUID();
}

// SHA-256 해시 생성 (복호화 불가)
async function hashStringSHA256(str: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export default function HashTest() {
  const [id, setId] = useState('');
  const [hash, setHash] = useState('');
  const [loading, setLoading] = useState(false);

  const handleHash = async () => {
    if (!id) return;
    setLoading(true);
    const hashValue = await hashStringSHA256(id);
    setHash(hashValue);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: 24, border: '1px solid #ccc', borderRadius: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <input
          type="text"
          value={id}
          readOnly
          placeholder="난수 id"
          style={{ flex: 1, padding: 8, fontSize: 16, borderRadius: 6, border: '1px solid #ddd' }}
        />
        <button onClick={() => { setId(randomId()); setHash(''); }}>
          생성
        </button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={handleHash} disabled={!id || loading}>
          {loading ? '생성중...' : '해시값 생성'}
        </button>
        <input
          type="text"
          value={hash}
          readOnly
          placeholder="해시값"
          style={{ flex: 1, padding: 8, fontSize: 16, borderRadius: 6, border: '1px solid #ddd' }}
        />
      </div>
    </div>
  );
} 