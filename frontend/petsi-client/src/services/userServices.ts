import { apiClient } from "./authServices";

const getExpenseInfo = async () => {
    try {
        const userResponse = await apiClient.get(`/user/expense-info`);
        return userResponse.data;
    } catch (error) {
        console.error("사용자 정보를 불러오는 데 실패했습니다.", error);
    }
};

const fetchUserData = async () => {
    try {
        const userResponse = await apiClient.get(`/user`);
        return userResponse.data;
    } catch (error) {
        console.error("사용자 정보를 불러오는 데 실패했습니다.", error);
    }
};

const changeNickname = async (nickname: string) => {
    try {
        const userResponse = await apiClient.patch(
            `/user/nickname`,
            {
                nickname: nickname,
            },
            {
                headers: {
                    accept: "*/*",
                },
            }
        );
        return userResponse.status === 200;
    } catch (error) {
        console.error(error);
    }
};

const changePassword = async (password: string) => {
    try {
        const userResponse = await apiClient.patch(
            `/user/password`,
            {
                password: password,
            },
            {
                headers: {
                    accept: "*/*",
                },
            }
        );
        return userResponse.status === 200;
    } catch (error) {
        console.error(error);
    }
};

const changeProfileImage = async (formData: FormData) => {
    try {
        const userResponse = await apiClient.patch(`/user/image`, formData);
        return userResponse.status === 200;
    } catch (error) {
        console.error(error);
    }
};

const leaveUser = async () => {
    try {
        const userResponse = await apiClient.delete(`/user`);
        return userResponse.status === 204;
    } catch (error) {
        console.error(error);
    }
};

export {
    getExpenseInfo,
    fetchUserData,
    changeNickname,
    changePassword,
    changeProfileImage,
    leaveUser,
};
