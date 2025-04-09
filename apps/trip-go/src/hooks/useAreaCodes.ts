// src/hooks/useAreaCodes.ts
import { useQuery } from '@tanstack/react-query'
import { fetchAreaCodesData } from '@trip-go/api/fetchAreaCodesData'

export const useAreaCodes = () => {
    return useQuery({
        queryKey: ['tour', 'areaCodes'],
        queryFn: () => fetchAreaCodesData(),
    })
}
