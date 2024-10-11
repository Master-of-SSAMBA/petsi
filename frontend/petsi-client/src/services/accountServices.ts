import { TransferInfo } from "@/stores/useTransferStore";
import { apiClient } from "./authServices";
import { NewAccountInfo } from "@/stores/useCreateAccountStore";

const getAccountInfo = async () => {
    try {
        const accountResponse = await apiClient.get(`/account`);
        return accountResponse.data;
    } catch (error) {
        console.error("계좌 정보를 불러오는 데 실패했습니다.", error);
    }
};

const getAccountDetailInfo = async (accountId: number) => {
    try {
        const accountResponse = await apiClient.post(
            `/account/detail`,
            {
                accountId: accountId,
            },
            {
                headers: {
                    accept: "*/*",
                },
            }
        );
        return accountResponse.data;
    } catch (error) {
        console.error(error);
    }
};

const getAccountHistory = async (
    accountId: number,
    sortOption: number,
    page: number
) => {
    try {
        const accountResponse = await apiClient.post(
            `/account/history?page=${page}&sortOption=${sortOption}`,
            {
                accountId: accountId,
            },
            {
                headers: {
                    accept: "*/*",
                },
            }
        );

        return accountResponse.data;
    } catch (error) {
        console.error(error);
    }
};

const getAccountProductInfo = async () => {
    try {
        const productInfoResponse = await apiClient.get(`/account/product`);

        return productInfoResponse.data;
    } catch (error) {
        console.error(error);
    }
};

const submitTransfer = async (
    accountId: number,
    transferInfo: TransferInfo
) => {
    try {
        await apiClient.post(
            `/account/transfer`,
            {
                accountId: accountId,
                destinationAccountNo: "9991988005402710",
                amount: transferInfo.amount,
                description:
                    transferInfo.description === ""
                        ? transferInfo.destinationAccountHolder
                        : transferInfo.description,
                destinationDescription: transferInfo.destinationDescription,
            },
            {
                headers: {
                    accept: "*/*",
                },
            }
        );
    } catch (error) {
        console.error(error);
    }
};

const checkPassword = async (
    accountId: number,
    accountNo: string,
    password: string
) => {
    try {
        const response = await apiClient.post(
            `/account/check-account-password`,
            {
                accountId: accountId,
                accountNo: accountNo,
                password: password,
            },
            {
                headers: {
                    accept: "*/*",
                },
            }
        );

        return response.status === 200;
    } catch (error) {
        console.error(error);
    }
};

const checkAccountHolder = async (accountNo: String) => {
    try {
        const response = await apiClient.post(
            `/account/account-holder-name`,
            {
                accountNo: accountNo,
            },
            {
                headers: {
                    accept: "*/*",
                },
            }
        );

        return response;
    } catch (error) {
        console.error(error);
    }
};

// 자동이체 없는 계좌 생성
const createAccountWithoutAutoTransfer = async (createInfo: NewAccountInfo) => {
    try {
        const response = await apiClient.post(`/account`, {
            // 필수 파라미터
            accountProductId: createInfo.accountProductId,
            name: createInfo.name,
            password: createInfo.password,
            pets: createInfo.pets,

            // 자동이체 관련 파라미터는 필요 없음
            isAuto: false, // 자동이체가 아니므로 false로 설정
        });

        return response;
    } catch (error) {
        console.error(error);
    }
};

// 자동이체 있는 계좌 생성
const createAccountWithAutoTransfer = async (createInfo: NewAccountInfo) => {
    try {
        const response = await apiClient.post(`/account`, {
            // 필수 파라미터
            accountProductId: createInfo.accountProductId,
            name: createInfo.name,
            password: createInfo.password,
            pets: createInfo.pets,

            // 옵셔널 파라미터
            isAuto: createInfo.isAuto,
            // isAuto가 ture면 아래 파라미터가 있어야 함
            accountNo: createInfo.accountNo,
            nextTransactionDay: createInfo.nextTransactionDay,
            amount: createInfo.amount,
        });

        return response;
    } catch (error) {
        console.error(error);
    }
};

export {
    getAccountInfo,
    getAccountDetailInfo,
    getAccountHistory,
    getAccountProductInfo,
    submitTransfer,
    checkPassword,
    checkAccountHolder,
    createAccountWithoutAutoTransfer,
    createAccountWithAutoTransfer,
};
