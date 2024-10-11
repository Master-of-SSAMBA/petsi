import { apiClient } from "./authServices";

interface MedicalData {
    petId: number | null;
    diseaseName: string;
    cost: string;
    visitedAt: string;
    hospital?: string;
    memo?: string;
}

export const fetchChartExpense = async (
    period?: string,
    startDate?: string,
    endDate?: string
) => {
    try {
        const expenseResponse = await apiClient.get(`/expense/chart`, {
            params: {
                ...(period && { period }),
                ...(startDate && { startDate }),
                ...(endDate && { endDate }),
            },
        });
        return expenseResponse.data;
    } catch (error) {
        console.error("이번 달 소비 내역 조회에 실패하였습니다.", error);
    }
};

export const submitExpenseData = async (formData: FormData) => {
    try {
        const expenseResponse = await apiClient.post(
            `/expense/manual`,
            formData
        );
        return expenseResponse.status === 201;
    } catch (error) {
        console.error("소비 내역 등록에 실패하였습니다.", error);
    }
};

export const submitMedicalExpenseData = async (medicalData: MedicalData) => {
    try {
        const expenseResponse = await apiClient.post(
            `/expense/medical-expense`,
            medicalData
        );
        return expenseResponse.status === 201;
    } catch (error) {
        console.error("의료비 내역 등록에 실패하였습니다.", error);
    }
};

export const crawlingExpenseData = async (
    username: string,
    password: string
) => {
    try {
        const expenseResponse = await apiClient.post(`/expense/ai`, {
            username: username,
            password: password,
        });
        return expenseResponse.status === 201;
    } catch (error) {
        console.error("소비 목록 불러오기에 실패했습니다.", error);
    }
};

export const fetchExpenseData = async (
    page: number,
    period?: string,
    startDate?: string,
    endDate?: string
) => {
    try {
        const expenseResponse = await apiClient.get(`/expense`, {
            params: {
                page,
                ...(period && { period }),
                ...(startDate && { startDate }),
                ...(endDate && { endDate }),
            },
        });
        return expenseResponse.data;
    } catch (error) {
        console.error("이번 달 소비 내역 조회에 실패하였습니다.", error);
    }
};

export const fetchMedicalData = async (id: number) => {
    try {
        const expenseResponse = await apiClient.get(
            `/expense/medical-expense/${id}`
        );
        return expenseResponse.data;
    } catch (error) {
        console.error("의료비 내역 상세 조회 실패", error);
    }
};

export const fetchPurchaseData = async (id: number) => {
    try {
        const expenseResponse = await apiClient.get(`/expense/purchase/${id}`);
        return expenseResponse.data;
    } catch (error) {
        console.error("구매 내역 상세 조회 실패", error);
    }
};

export const deletePurchaseData = async (id: number) => {
    try {
        const expenseResponse = await apiClient.delete(`/expense/purchase`, {
            data: { purchaseId: id },
        });
        return expenseResponse.data === 204;
    } catch (error) {
        console.error("구매 내역 삭제 실패", error);
    }
};

export const deleteMedicalData = async (id: number) => {
    try {
        const expenseResponse = await apiClient.delete(
            `/expense/medical-expense`,
            {
                data: { medicalExpenseId: id },
            }
        );
        return expenseResponse.data === 204;
    } catch (error) {
        console.error("의료비 내역 삭제 실패", error);
    }
};

export const updatePurchaseData = async (data: {
    purchaseId: number;
    title: string;
    img: string | null;
    detail?: string | null;
    purchasedAt: string;
    quantity: string;
    cost: string;
    category: string;
}) => {
    try {
        const expenseResponse = await apiClient.put(`/expense/purchase`, data);
        return expenseResponse.data === 200;
    } catch (error) {
        console.error("구매 내역 업데이트 실패", error);
    }
};

export const updateMedicalData = async (data: {
    petId: number | null;
    medicalExpenseId: number;
    diseaseName: string;
    cost: string;
    hospital: string;
    visitedAt: string;
    memo: string | null;
}) => {
    try {
        const expenseResponse = await apiClient.put(`/expense/medical`, data);
        return expenseResponse.data === 200;
    } catch (error) {
        console.error("의료비 내역 업데이트 실패", error);
    }
};
