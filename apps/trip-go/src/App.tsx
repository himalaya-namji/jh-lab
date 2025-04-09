import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TourList } from './components/TourList'
import { AreaSelectBox } from './components/AreaSelectBox'
import { useState } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ToastContainer } from 'react-toastify'

const queryClient = new QueryClient()

function App() {
  const [selectedAreaCode, setSelectedAreaCode] = useState<string>('1') // 기본값: 서울

  return (
    <QueryClientProvider client={queryClient}>
      {/* 기존 Provider들 */}
      <ReactQueryDevtools initialIsOpen={false} />
      <div className="p-4">
        <ToastContainer />
        <h1>🚀 지역 기반 관광지 조회</h1>
        <AreaSelectBox onChange={setSelectedAreaCode} />
        <TourList areaCode={selectedAreaCode || '1'} />
      </div>
    </QueryClientProvider>
  )
}

export default App
