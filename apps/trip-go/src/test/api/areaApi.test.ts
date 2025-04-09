// src/test/api/fetchTourData.test.ts
import { fetchAreaCodesData } from '@trip-go/api/fetchAreaCodesData';
import { describe, it, expect } from 'vitest'


describe('Tour API', () => {
    it('지역코드 목록을 잘 가져온다', async () => {
        const data = await fetchAreaCodesData();

        expect(Array.isArray(data)).toBe(true)
        expect(data.length).toBeGreaterThan(0)
        expect(data[0].name).toBe('서울') // 실제 API 응답값 기준으로 조정
    })


})