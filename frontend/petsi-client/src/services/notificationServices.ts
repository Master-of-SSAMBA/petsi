import { apiClient } from "./authServices";

//토큰 저장하기
export const saveToken = async (token: string) => {
    try {
        await apiClient.post(`/notification/fcm`, {
            token: token,
        });
    } catch (error) {
        console.error(error);
    }
};

// //토큰 전체 삭제
// const deleteAllTokens = async() => {
//     try {
//         const notificationResponse = await apiClient.delete(`/notification/fcm`);
//         return notificationResponse.status == 200
//     } catch (error) {
//         console.error(error)
//     }
// }

// //단일 토큰 삭제
// const deleteToken = async(token: string) => {
//     try {
//         const notificationResponse = await apiClient.delete(`/notification/fcm-one`, {
//             data: {
//                 token: token
//             }
//         });
//         return notificationResponse.status === 200
//     } catch (error) {
//         console.error(error)
//     }
// }

//알림 전체 불러오기
export const getAllNotification = async () => {
    try {
        const notificationResponse = await apiClient.get(`/notification`);
        return notificationResponse.data;
    } catch (error) {
        console.error(error);
    }
};

//알림 전체 삭제(읽은 알림만 삭제-option:true / 전체 삭제-option:false)
export const deleteAllNotification = async (option: boolean) => {
    try {
        const notificationResponse = await apiClient.delete(`/notification`, {
            data: {
                option: option,
            },
        });
        return notificationResponse.status === 200;
    } catch (error) {
        console.error(error);
    }
};

//특정 알림 삭제
export const deleteNotification = async (notificationIds: number) => {
    try {
        const notificationResponse = await apiClient.delete(
            `/notification/delete`,
            {
                data: {
                    notificationIds: notificationIds,
                },
            }
        );
        return notificationResponse.status === 200;
    } catch (error) {
        console.error(error);
    }
};

//알림 읽음 처리
export const readNotification = async (notificationId: number) => {
    try {
        const notificationResponse = await apiClient.patch(
            `/notification/` + notificationId
        );
        return notificationResponse.status === 200;
    } catch (error) {
        console.error(error);
    }
};
