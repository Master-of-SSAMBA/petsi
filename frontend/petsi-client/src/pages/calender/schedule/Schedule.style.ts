import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 1.5rem;
`;

const BottomButton = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 1rem;
`;

const Item = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    gap: 0.4rem;
`;

const StyledCalendarContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;

    .react-calendar {
        width: 100%;
        border: 1px solid var(--color-gray);
        border-radius: 5px;
        box-shadow: var(--box-shadow-default);
    }
`;

const StyledCalendar = styled(Calendar)`
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

        .react-calendar__navigation__label,
        .react-calendar__navigation__arrow,
        .react-calendar__navigation__arrow:hover {
            background: var(--color-yellow);
            border-radius: 5px;
        }

        .react-calendar__navigation__arrow {
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .react-calendar__navigation__label {
            text-align: center;

            .react-calendar__navigation__label__labelText {
                font-weight: 500;
            }
        }
    }

    /* 월 달력 (네비게이션 제외) */
    .react-calendar__month-view {
        padding: 1rem 1.5rem;
        background-color: var(--color-white);
        border-radius: 5px;
        margin-bottom: 3rem;
        abbr {
            font-size: var(--font-body-h4);
            font-weight: 500;
        }
    }

    /* 요일 */
    .react-calendar__month-view__weekdays {
        abbr {
            font-weight: 500;
            text-decoration: none;
        }
    }

    // 날짜
    .react-calendar__month-view__weekdays__weekday--weekend,
    .react-calendar__month-view__days__day--weekend {
        abbr {
            text-decoration: none;
            color: var(--color-red);
        }
    }

    /* 일 (각각의 타일) */
    .react-calendar__tile {
        height: 3rem;
        padding: 2rem 0.5rem;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        abbr {
            font-size: var(--font-body-h5);
            font-weight: 500;
        }
    }

    /* 오늘 날짜 스타일 */
    .react-calendar__tile--now {
        background: transparent;

        abbr {
            color: var(--color-white);
            background: var(--color-black);
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 1.5rem;
            height: 1.5rem;
        }
    }

    /* 날짜 선택 기능 비활성화 */
    .react-calendar__tile:enabled:hover,
    .react-calendar__tile:enabled:focus,
    .react-calendar__tile--active {
        background: transparent;
        color: inherit;
    }
`;

const MonthDetailButton = styled.div`
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    border: 1px solid var(--color-black);
    border-radius: 5px;
    background-color: var(--color-white);
    box-shadow: var(--box-shadow-default);
    padding: 0.6rem 1rem;
    cursor: pointer;
`;

const CycleContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    width: 16rem;
    gap: 1rem;
`;

const IncompleteScheduleContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const CompleteScheduleContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const SchedultItem = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
`;

const ScheduleIcon = styled.img`
    width: 3rem;
    margin-right: 2rem;
`;

const ScheduleInfo = styled.div`
    display: flex;
    gap: 0.4rem;
`;

const ScheduleButtonContainer = styled.div`
    position: absolute;
    text-align: right;
    top: 0.5rem;
    right: 0.5rem;
`;

const categoryIcon = styled.img`
    width: 4rem;
`;

const CategoryIconContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
`;

const ConfirmButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    border: 1px solid var(--color-black);
    border-radius: 5px;
    background-color: var(--color-white);
    box-shadow: var(--box-shadow-default);
    padding: 0.4rem 0.6rem;
    cursor: pointer;
`;

export {
    Container,
    BottomButton,
    Item,
    StyledCalendarContainer,
    StyledCalendar,
    MonthDetailButton,
    CycleContainer,
    IncompleteScheduleContainer,
    CompleteScheduleContainer,
    SchedultItem,
    ScheduleIcon,
    ScheduleInfo,
    ScheduleButtonContainer,
    categoryIcon,
    CategoryIconContainer,
    ConfirmButton,
};
