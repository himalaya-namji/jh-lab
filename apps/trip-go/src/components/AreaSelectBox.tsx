// src/components/AreaSelectBox.tsx
import { useAreaCodes } from '@trip-go/hooks/useAreaCodes'
import { toast } from 'react-toastify'

type Props = {
    onChange?: (areaCode: string) => void
}

export const AreaSelectBox = ({ onChange }: Props) => {
    const { data: areas, isLoading, isError } = useAreaCodes()
    if (isLoading) return <p>로딩 중...</p>

    if (isError || !areas) {
        toast.error('지역 데이터를 불러오는데 실패했습니다.')
        return <p>지역 데이터를 불러오는데 실패했습니다.</p>
    }
    return (
        <select data-testid="area-select" onChange={(e) => {
            const value = e.target.value
            if (onChange) onChange(value)
        }}>
            <option value="">지역 선택</option>
            {areas.map((area: any) => (
                <option key={area.code} value={area.code}>
                    {area.name}
                </option>
            ))}
        </select>
    )
}
