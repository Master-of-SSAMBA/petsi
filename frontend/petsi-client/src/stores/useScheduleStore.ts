import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { atom } from "recoil";

export interface ScheduleInfo {
    id: number;
    category: string;
    title: string;
    cycleOption: string;
    cycle: string;
    nextScheduleDate: string | null;
}

export const scheduleInfoState = atom<ScheduleInfo>({
    key: "scheduleInfo",
    default: {
        id: -1,
        category: "",
        title: "",
        cycleOption: "일",
        cycle: "",
        nextScheduleDate: format(new Date(), "yyyy-MM-dd", { locale: ko }),
    },
});
