// src/test/api/fetchTourData.test.ts
import { describe, it, expect } from 'vitest'
import { fetchTourData } from '@trip-go/api/fetchTourData'

describe('fetchTourData', () => {
    it('서울 지역의 관광 데이터를 정상적으로 가져온다', async () => {
        const areaCode = '1' // 서울
        const data = await fetchTourData(areaCode)

        expect(Array.isArray(data)).toBe(true)
        expect(data.length).toBeGreaterThan(0)
        expect(data[0]).toHaveProperty('title') // 실제 API 구조에 맞춰 필요한 필드 확인
    })

    it('areaCode 없이 호출하면 에러를 던진다', async () => {
        // @ts-expect-error intentionally testing missing param
        await expect(fetchTourData()).rejects.toThrow()
    })

    // it('areaCode 없이 호출하면 빈 데이터를 반환한다거나 정상 동작한다', async () => {
    //     // @ts-expect-error intentionally missing param
    //     const result = await fetchTourData()
    //     expect(result).toBeDefined()
    // })
})

