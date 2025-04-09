// src/api/fetchTourData.ts
export const fetchAreaCodesData = async () => {
    const SERVICE_KEY = import.meta.env.VITE_TOUR_API_KEY
    const BASE_URL = 'https://apis.data.go.kr/B551011/KorService1/areaCode1'

    const params = new URLSearchParams({
        serviceKey: SERVICE_KEY,
        MobileOS: 'ETC',
        MobileApp: 'TripGo',
        _type: 'json',
    })

    const res = await fetch(`${BASE_URL}?${params.toString()}`)
    if (!res.ok) throw new Error(`API 요청 실패: ${res.status}`)

    const data = await res.json()
    return data.response.body.items.item
}
