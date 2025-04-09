// components/TourList.tsx
import { useTourApi } from '../hooks/useTourApi'
import AreaCard from './AreaCard'
import { TourListSkeleton } from './TourListSkeleton'

type Props = {
  areaCode: string
}
export const TourList = ({ areaCode }: Props) => {
  const { data, isLoading, error } = useTourApi(areaCode)

  if (isLoading)
    return <TourListSkeleton />
  if (error) return <p>에러 발생: {(error as Error).message}</p>

  return (
    <div>
      <h2>📍 서울 지역 관광지</h2>
      <ul style={{
        display: 'flex', flexWrap: 'wrap'
      }}>
        {data?.map((item: any) => (
          <AreaCard
            key={item.contentid}
            data={item}
          />
        ))}
      </ul>
    </div>
  )
}
