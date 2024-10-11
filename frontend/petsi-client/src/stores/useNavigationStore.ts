import { atom } from "recoil";

export interface HeaderState {
    left: string;
    right: string;
    text: string;
    isVisible: boolean;
    color: string;
    leftPath?: string;
    rightPath?: string;
}

export interface BottomState {
    isVisible: boolean;
    activePage?: string;
}

export const headerState = atom<HeaderState>({
    key: "headerState", // Recoil 상태의 고유 key
    default: {
        left: "",
        right: "",
        text: "",
        isVisible: false,
        color: "beige",
        leftPath: "",
        rightPath: "",
    },
});

export const bottomState = atom<BottomState>({
    key: "bottomState",
    default: {
        isVisible: false,
        activePage: "Home",
    },
});
