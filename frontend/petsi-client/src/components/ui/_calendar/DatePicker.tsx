import { useState, useEffect } from "react";
import { DateValue } from "./CalendarType";
import * as St from "./DatePicker.style";
import Calendar, { DatePickerProps } from "./Calendar";
import { useFormattedDate } from "@/hooks/useFormattedDate";

interface ExtendedDatePickerProps extends DatePickerProps {
    selectedDate?: DateValue;
    maxDate?: Date;
}

const DatePicker = (props: ExtendedDatePickerProps) => {
    const { onChange, selectedDate: initialSelectedDate, maxDate } = props;
    const [selectedDate, setSelectedDate] = useState<DateValue>(
        initialSelectedDate || new Date()
    );
    const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

    useEffect(() => {
        if (initialSelectedDate) {
            setSelectedDate(initialSelectedDate);
        }
    }, [initialSelectedDate]);

    const handleDateChange = (newDate: DateValue) => {
        setSelectedDate(newDate);
        onChange(newDate);
        setIsCalendarOpen(false);
    };

    const toggleCalendar = () => {
        setIsCalendarOpen((prev) => !prev);
    };

    return (
        <St.Container>
            <St.DateViewer>
                <h4>{useFormattedDate(selectedDate)}</h4>
                <St.CalendarIcon onClick={toggleCalendar} />
            </St.DateViewer>
            {isCalendarOpen && (
                <Calendar onChange={handleDateChange} maxDate={maxDate} />
            )}
        </St.Container>
    );
};

export default DatePicker;
