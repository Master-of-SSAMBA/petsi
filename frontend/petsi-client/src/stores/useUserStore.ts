import { atom } from "recoil";

export interface UserInfo {
    userId: number;
    nickname: string;
    email: string;
    profileImage: string;
}

export const userInfoState = atom<UserInfo>({
    key: "userInfo",
    default: {
        userId: -1,
        nickname: "",
        email: "",
        profileImage: "",
    },
});
