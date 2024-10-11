import { atom } from "recoil";

export interface NewAccountInfo {
    hasReadRequiredDocuments: boolean;
    accountProductId: number;
    nextTransactionDay: number;
    amount: number;
    pets: string[];
    name: string;
    password: string;
    accountNo: string;
    bankName: string;
    isAuto: boolean;
}

export const newAccountInfoState = atom<NewAccountInfo>({
    key: "newAccountInfo",
    default: {
        hasReadRequiredDocuments: false,
        accountProductId: -1,
        name: "",
        password: "",
        pets: [],

        // 자동이체 정보
        isAuto: false,
        nextTransactionDay: 10,
        amount: 0,
        accountNo: "",
        bankName: "싸피은행",
    },
});
