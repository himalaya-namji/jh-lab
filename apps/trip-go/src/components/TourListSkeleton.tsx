// src/components/TourListSkeleton.tsx

export const TourListSkeleton = () => {
    return (
        <div className="flex items-center justify-center h-[60vh]">
            <div className="relative w-16 h-16">
                {/* 회전하는 gradient ring */}
                <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-r-transparent border-b-blue-500 border-l-blue-500 animate-spin"></div>

                {/* 중앙 원 */}
                <div className="absolute inset-2 rounded-full bg-white"></div>
            </div>
        </div>
    )
}
