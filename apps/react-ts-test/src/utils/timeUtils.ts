/**
 * 밀리초를 'HH:mm:ss' 형식의 문자열로 변환합니다.
 * @param ms 변환할 밀리초
 * @returns 포맷팅된 시간 문자열 (예: '01:23:45')
 */
export const formatMilliseconds = (ms: number): string => {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
};

/**
 * Date 객체를 'YYYY년 MM월 DD일 HH시 mm분 ss초' 형식의 문자열로 변환합니다.
 * @param date 변환할 Date 객체. 인수가 없으면 현재 시간을 사용합니다.
 * @returns 포맷팅된 날짜 및 시간 문자열 (예: '2023년 10월 27일 14시 05분 01초')
 */
export const formatFullDateTime = (date: Date = new Date()): string => {
  // Intl.DateTimeFormat을 사용하면 수동으로 문자열을 조작하는 것보다
  // 더 안정적이고 국제화에 유리한 코드를 작성할 수 있습니다.
  const formatter = new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const parts = formatter.formatToParts(date).reduce<Record<string, string>>((acc, part) => {
    if (part.type !== 'literal') {
      acc[part.type] = part.value;
    }
    return acc;
  }, {});

  return `${parts.year}년 ${parts.month}월 ${parts.day}일 ${parts.hour}시 ${parts.minute}분 ${parts.second}초`;
};

/**
 * 날짜에 특정 시간 단위를 더하거나 뺀 새로운 Date 객체를 반환합니다.
 * @param date 기준이 되는 Date 객체
 * @param options 더할 시간 단위 객체 (days, hours, minutes, seconds, milliseconds). 음수 값으로 뺄 수도 있습니다.
 * @returns 계산된 새로운 Date 객체
 */
export const addToDate = (
  date: Date,
  options: {
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
    milliseconds?: number;
  },
): Date => {
  const { days = 0, hours = 0, minutes = 0, seconds = 0, milliseconds = 0 } = options;
  const newDate = new Date(date.valueOf()); // 원본 수정을 방지하기 위해 날짜 객체를 복사합니다.

  // setDate/setHours 등은 DST(일광 절약 시간제) 변경 시 예기치 않은 결과를 초래할 수 있습니다.
  // getTime()과 setTime()을 사용하여 밀리초 단위로 직접 계산하는 것이 더 안전하고 정확합니다.
  newDate.setTime(
    newDate.getTime() +
      days * 24 * 60 * 60 * 1000 +
      hours * 60 * 60 * 1000 +
      minutes * 60 * 1000 +
      seconds * 1000 +
      milliseconds,
  );

  return newDate;
};

/**
 * 주어진 날짜에 특정 일수를 더한 새로운 Date 객체를 반환합니다.
 * @param date 기준이 되는 Date 객체
 * @param daysToAdd 더할 일수 (음수일 경우 과거 날짜)
 * @returns 일수가 더해진 새로운 Date 객체
 */
export const addDaysToDate = (date: Date, daysToAdd: number): Date => {
  return addToDate(date, { days: daysToAdd });
};
