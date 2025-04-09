// src/test/hooks/useAreaCodes.test.tsx
import { vi } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAreaCodes } from '@trip-go/hooks/useAreaCodes'
import * as api from '@trip-go/api/fetchAreaCodesData'

// Mock API
vi.mock('@trip-go/api/fetchAreaCodesData')

describe('useAreaCodes', () => {
    const createWrapper = () => {
        const queryClient = new QueryClient()
        return ({ children }: { children: React.ReactNode }) => (
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        )
    }

    it('정상적으로 지역 코드를 가져온다', async () => {
        const mockData = [{ code: 1, name: '서울' }, { code: 2, name: '부산' }]
        vi.spyOn(api, 'fetchAreaCodesData').mockResolvedValueOnce(mockData)

        const { result } = renderHook(() => useAreaCodes(), {
            wrapper: createWrapper(),
        })

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true)
            expect(result.current.data).toEqual(mockData)
        })
    })

})
