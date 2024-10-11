import { apiClient } from "./authServices";

const fetchPet = async () => {
    try {
        const response = await apiClient.get(`/pet`);
        return response;
    } catch (error) {
        console.error("펫 정보 불러오기에 실패했습니다:", error);
    }
};

// 단일 조회
const fetchPetData = async (petId: string) => {
    try {
        const response = await apiClient.get(`/pet/${petId}`);
        return response.data;
    } catch (error) {
        console.error("펫 정보 불러오기에 실패했습니다:", error);
    }
};

const registPet = async (formData: FormData) => {
    try {
        const petResponse = await apiClient.post(`/pet`, formData);
        return petResponse.status === 201;
    } catch (error) {
        console.error("반려동물 등록에 실패하였습니다.", error);
    }
};

const modifyPet = async (formData: FormData) => {
    try {
        const petResponse = await apiClient.put(`/pet`, formData);
        return petResponse.status === 200;
    } catch (error) {
        console.error("반려동물 정보 수정에 실패했습니다.", error);
    }
};

const deletePetData = async (id: number) => {
    try {
        const petResponse = await apiClient.delete(`/pet`, {
            data: { petId: id },
        });
        return petResponse.status === 204;
    } catch (error) {
        console.error("펫 삭제에 실패하였습니다.", error);
    }
};

export { fetchPet, fetchPetData, registPet, modifyPet, deletePetData };
