import { AreaData } from '../types/tour';
import './AreaCard.css';

interface AreaCardProps {
    data: AreaData;
}

const AreaCard: React.FC<AreaCardProps> = ({ data }) => {
    return (
        <div className="area-card">
            <img className="area-card__image" src={data.firstimage} alt={data.title} />
            <div className="area-card__content">
                <h3 className="area-card__title">{data.title}</h3>
                <p className="area-card__address">{data.addr1}</p>
                {data.addr2 && <p className="area-card__address">{data.addr2}</p>}
                <div className="area-card__info">
                    <p>전화: {data.tel || '정보 없음'}</p>
                    <p>우편번호: {data.zipcode}</p>
                </div>
                <div>
                    <a
                        href={`https://map.kakao.com/link/to/${data.title},${data.mapy},${data.mapx}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="area-card__link"
                    >
                        상세 위치 보기
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AreaCard;
