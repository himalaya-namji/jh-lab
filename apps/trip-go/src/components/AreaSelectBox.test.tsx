// src/test/components/AreaSelectBox.test.tsx
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { describe, it, expect, vi, beforeAll, afterEach, afterAll } from 'vitest'
import { AreaSelectBox } from '@trip-go/components/AreaSelectBox'
import { setupServer } from 'msw/node'
import { http } from 'msw'

const mockResponse = {
    response: {
        body: {
            items: {
                item: [
                    { code: '1', name: '서울' },
                    { code: '2', name: '인천' },
                ],
            },
        },
    },
}

const server = setupServer(
    http.get('https://apis.data.go.kr/B551011/KorService1/areaCode1', (req, res, ctx) => {
        return res(ctx.status(200), ctx.json(mockResponse))
    })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const renderWithProvider = (ui: React.ReactNode) => {
    const queryClient = new QueryClient()
    return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>)
}

describe('AreaSelectBox', () => {


    it('에러 상태일 때 메시지를 보여준다', () => {
        vi.mock('@trip-go/hooks/useAreaCodes', async () => {
            return {
                useAreaCodes: () => ({
                    isLoading: false,
                    isError: true,
                    data: null,
                }),
            }
        })

        renderWithProvider(<AreaSelectBox />)
        // expect(screen.getByText('지역 데이터를 불러올 수 없습니다.')).toBeInTheDocument()
        const toast = screen.queryByText(/지역 데이터를 불러오는데 실패했습니다/i)
        expect(toast).toBeInTheDocument();
    })

    // it('지역 데이터를 불러와서 렌더링한다', async () => {
    //     const onChange = vi.fn()
    //     renderWithProvider(<AreaSelectBox onChange={onChange} />)

    //     await waitFor(() => {
    //         expect(screen.getByRole('option', { name: '인천' })).toBeInTheDocument()
    //     })

    //     const select = screen.getByTestId('area-select')
    //     fireEvent.change(select, { target: { value: '2' } })

    //     expect(onChange).toHaveBeenCalledWith('2')
    // })
})
