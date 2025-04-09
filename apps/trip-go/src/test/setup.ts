// test/setup.ts
import '@testing-library/jest-dom'           // ✅ jest-dom: 커스텀 matcher
import { server } from './mocks/server'      // ✅ msw: API mocking

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
