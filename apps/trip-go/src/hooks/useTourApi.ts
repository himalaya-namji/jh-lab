import { useQuery } from '@tanstack/react-query'
import { fetchTourData } from '@trip-go/api/fetchTourData'

export const useTourApi = (areaCode: string) => {
    return useQuery({
        queryKey: ['tour', 'areaBasedList', areaCode],
        queryFn: () => fetchTourData(areaCode),
        enabled: !!areaCode,
    })
}
