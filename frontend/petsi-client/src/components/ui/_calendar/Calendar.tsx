import { useState } from "react";
import * as St from "./Calendar.style";
import { DateValue } from "./CalendarType";
import { format } from "date-fns";

export interface DatePickerProps {
    onChange: (date: DateValue) => void;
    maxDate?: Date;
}

const Calendar = (props: DatePickerProps) => {
    const { onChange, maxDate } = props;
    const [date, setDate] = useState<DateValue>(new Date());

    const handleDateChange = (newDate: DateValue) => {
        setDate(newDate);
        onChange(newDate);
    };

    // formatDay는 locale과 date를 받는 함수로 구현
    const formattedDay = (locale: string | undefined, date: Date) => {
        if (locale === "error") {
            console.error("can't find locale");
        }
        return format(date, "dd");
    };

    return (
        <St.StyledCalendarContainer>
            <St.StyledCalendar
                value={date}
                onChange={handleDateChange}
                calendarType="gregory" // 일요일부터 시작
                showNeighboringMonth={false} // 전달, 다음달 날짜 숨기기
                next2Label={null} // 연 단위 이동 버튼 삭제
                prev2Label={null} // 연 단위 이동 버튼 삭제
                minDetail="year" // 10년 단위 년도 숨기기
                formatDay={formattedDay} // 함수를 그대로 전달
                maxDate={maxDate}
            />
        </St.StyledCalendarContainer>
    );
};

export default Calendar;
