import { atom } from "recoil";

export interface TransferInfo {
    transferBank: string;
    destinationAccountHolder: string;
    destinationAccountNo: string;
    amount: number | null;
    description: string;
    destinationDescription: string;
}

export const transferInfoState = atom<TransferInfo>({
    key: "transferInfo",
    default: {
        transferBank: "한국은행",
        destinationAccountHolder: "",
        destinationAccountNo: "",
        amount: null,
        description: "",
        destinationDescription: "",
    },
});
