import { atom } from "recoil";

export interface notification {
    notificationId: number;
    category: string;
    content: string;
    date: {
        date: string;
        time: string;
    };
    link: number;
    read: boolean;
}

export const notificationState = atom<notification[]>({
    key: "notificationState",
    default: [],
});
