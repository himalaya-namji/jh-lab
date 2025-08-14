// CA 앱 정보 타입
/**
 * CA 앱 정보
 * - appCode: CA 앱 코드 (예: '205')
 * - appName: CA 앱 이름 (예: 'kakao뱅킹')
 * - appIcon: 아이콘 데이터 (data:image/png;base64,...)
 * - appLinkAos: 안드로이드 앱 링크 (예: 'mobileid')
 * - appLinkIos: iOS 앱 링크 (예: 'mobileid-xxxx'), 없으면 iOS 앱 아님
 * - caDid: CA DID (예: 'did:kr:mobileid:laksjd')
 */
export interface CaAppInfo {
  appCode: string;
  appName: string;
  appIcon: string;
  appLinkAos: string;
  appLinkIos?: string;
  caDid: string;
}

/**
 * /mip/spinfo API 응답 타입
 * - result: 요청 성공 여부
 * - data: base64 인코딩된 JSON 데이터 (caList 등 포함)
 */
export interface CaApiResponse {
  result: boolean;
  data: string;
} 