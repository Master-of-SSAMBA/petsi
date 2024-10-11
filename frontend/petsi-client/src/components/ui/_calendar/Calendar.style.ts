import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";

export const StyledCalendarContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;

    .react-calendar {
        width: 100%;
        border: 1px solid var(--color-gray);
        border-radius: 5px;
        box-shadow: var(--box-shadow-default);
    }
`;

export const StyledCalendar = styled(Calendar)`
    /* 상단 네비게이션(년-월) */
    .react-calendar__navigation {
        display: flex;
        width: 100%;
        justify-content: space-between;
        background: var(--color-yellow);
        border-bottom: 1px solid var(--color-gray);
        height: 4rem;
        border-radius: 5px 5px 0 0;
        margin: 0;

        span {
            font-size: var(--font-title-h4);
            font-weight: 600;
            color: black;
        }
        .react-calendar__tile:enabled:hover,
        .react-calendar__tile:enabled:focus,
        .react-calendar__tile--active {
            background: var(--color-green);
            border-radius: 5px;
        }

        .react-calendar__navigation__arrow {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
    .react-calendar__navigation button:disabled {
        background-color: var(--color-yellow);
    }
    .react-calendar__navigation button:enabled:hover,
    .react-calendar__navigation button:enabled:focus {
        background-color: var(--color-yellow);
    }
    /* 월 달력 (네비게이션 제외) */
    .react-calendar__month-view {
        padding: 1rem 1.5rem;
        background-color: var(--color-beige);
        border-radius: 5px;
        abbr {
            // 텍스트
            color: black;
            font-size: var(--font-body-h4);
            font-weight: 500;
        }
    }
    /* 요일 */
    .react-calendar__month-view__weekdays {
        abbr {
            // 텍스트 부분
            font-size: var(--font-body-h4);
            font-weight: 900;
            text-decoration: none;
        }
    }
    /* 일 (각각의 타일) */
    .react-calendar__tile {
        display: flex;
        text-align: center;
        height: 3rem;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        padding: 0.5rem;
    }

    /*hover, focus, 선택됐을 시 */
    .react-calendar__tile:enabled:hover,
    .react-calendar__tile:enabled:focus,
    .react-calendar__tile--active {
        background: var(--color-pink);
        border-radius: 5px;
    }
    /* 현재 날짜 */
    .react-calendar__tile--now {
        background: var(--color-gray);
        border-radius: 5px;
        abbr {
            color: white;
        }
    }
    /*hover, focus 시 */
    .react-calendar__tile--now:enabled:hover,
    .react-calendar__tile--now:enabled:focus {
        background: var(--color-pink);
        border-radius: 5px;
    }
`;
