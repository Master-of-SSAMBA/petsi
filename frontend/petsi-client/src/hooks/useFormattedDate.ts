import { useState, useEffect } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { DateValue } from "@/components/ui/_calendar/CalendarType";

export const formatDate = (date: Date | null): string => {
    if (!date) return "";
    return format(date, "yyyy.MM.dd(EEE)", { locale: ko });
};

export const useFormattedDate = (dateValue: DateValue) => {
    const [formattedDate, setFormattedDate] = useState("");

    useEffect(() => {
        if (dateValue instanceof Date) {
            setFormattedDate(formatDate(dateValue));
        } else {
            setFormattedDate("");
        }
    }, [dateValue]);

    return formattedDate;
};
