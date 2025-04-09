// test/mocks/handlers.ts
import { http } from 'msw'

export const handlers = [
    http.get('https://apis.data.go.kr/B551011/KorService1/areaCode1', ({ request }) => {
        return Response.json({
            response: {
                body: {
                    items: {
                        item: [
                            { code: 1, name: '서울' },
                            { code: 2, name: '인천' },
                        ],
                    },
                },
            },
        })
    }),
]
