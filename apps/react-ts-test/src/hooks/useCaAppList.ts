import { useEffect, useState } from 'react';
import type { CaAppInfo } from '../types/caApp';
// 로컬 PNG 파일 import
import kakaobank from '../assets/kakaobank.png';
import mobileId from '../assets/mobileId.png';
import tossbank from '../assets/tossbank.png';

// 개발환경에서 사용할 하드코딩된 CA 앱 리스트 예시
const DEV_CA_LIST: CaAppInfo[] = [
  {
    appCode: '205',
    appName: '카카오뱅킹',
    appIcon: kakaobank,
    appLinkAos: 'mobileid',
    appLinkIos: 'mobileid-ios',
    caDid: 'did:kr:mobileid:kakao',
  },
  {
    appCode: '206',
    appName: '모바일 신분증',
    appIcon: mobileId,
    appLinkAos: 'mobileid',
    caDid: 'did:kr:mobileid:mobileid',
  },
  {
    appCode: '207',
    appName: '토스뱅크',
    appIcon: tossbank,
    appLinkAos: 'mobileid',
    appLinkIos: 'mobileid-toss',
    caDid: 'did:kr:mobileid:toss',
  },
];

/**
 * /mip/spinfo API에서 CA 앱 리스트를 받아오는 커스텀 훅
 * - 개발환경: 하드코딩된 리스트 사용
 * - 테스트/운영: API 호출 및 base64 디코딩, JSON 파싱
 * - iOS 앱만 필터링하려면 isIosOnly 옵션 사용
 */
export default function useCaAppList(isIosOnly = false) {
  const [caList, setCaList] = useState<CaAppInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCaList() {
      setLoading(true);
      setError(null);
      try {
        if (import.meta.env.MODE === 'development') {
          // 개발환경: 하드코딩된 리스트 사용
          let list = DEV_CA_LIST;
          if (isIosOnly) {
            list = list.filter((item) => !!item.appLinkIos);
          }
          setCaList(list);
        } else {
          // 테스트/운영: API 호출
          const res = await fetch('/mip/spinfo', { method: 'POST' });
          if (!res.ok) throw new Error('API 요청 실패');
          const apiData = await res.json();
          if (!apiData.result) throw new Error('API result false');
          // base64 디코딩
          const decoded = atob(apiData.data);
          const parsed = JSON.parse(decoded);
          let list: CaAppInfo[] = parsed.caList || [];
          if (isIosOnly) {
            list = list.filter((item) => !!item.appLinkIos);
          }
          setCaList(list);
        }
      } catch (e: any) {
        setError(e.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    }
    fetchCaList();
  }, [isIosOnly]);

  return { caList, loading, error };
} 