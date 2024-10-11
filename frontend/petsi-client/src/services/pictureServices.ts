import { apiClient } from "./authServices";

interface Picture {
    pictureId: number;
    img: string;
}

export const fetchPictureCount = async () => {
    try {
        const pictureResponse = await apiClient.get(`/picture/count`);
        return pictureResponse.data;
    } catch (error) {
        console.error("인증 횟수를 불러오는 데 실패했습니다.", error);
    }
};

export const fetchPictures = async (page: number) => {
    try {
        const pictureResponse = await apiClient.get<Picture[]>(`/picture`, {
            params: {
                page,
            },
        });
        return pictureResponse.data;
    } catch (error) {
        console.error("인증 횟수를 불러오는 데 실패했습니다.", error);
    }
};

export const uploadPicture = async (formData: FormData) => {
    try {
        const pictureResponse = await apiClient.post(`/picture`, formData);
        return pictureResponse.status === 201;
    } catch (error) {
        console.error("이미지를 업로드하는 데 실패했습니다.", error);
    }
};

export const fetchPictureData = async (id: string | undefined) => {
    try {
        const pictureResponse = await apiClient.get(`/picture/${id}`);
        const { data } = pictureResponse;
        return data;
    } catch (error) {
        console.error("인증 횟수를 불러오는 데 실패했습니다.", error);
    }
};

// export const fetchPictures = async () => {
//     try {
//         const pictureResponse = await apiClient.get(`/picture/count`);
//         return pictureResponse.data.pictureCnt;
//     } catch (error) {
//         console.error("인증 횟수를 불러오는 데 실패했습니다.", error);
//     }
// };
