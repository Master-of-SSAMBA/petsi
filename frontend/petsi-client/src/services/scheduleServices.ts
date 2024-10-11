import { apiClient } from "./authServices";

const getSchedule = async (
    formattedMonth: string,
    petId?: number,
    status?: string
) => {
    try {
        // URLSearchParams를 사용하여 동적으로 쿼리 스트링을 생성
        const params = new URLSearchParams({ date: formattedMonth });

        if (petId !== undefined) {
            params.append("petId", petId.toString());
        }

        if (status !== undefined) {
            params.append("status", status);
        }

        const response = await apiClient.get(
            `/schedule/detail?${params.toString()}`
        );

        return response.data;
    } catch (error) {
        console.error("일정 불러오기 중 에러:", error);
    }
};

const getScheduleCategoty = async () => {
    try {
        const response = await apiClient.get(`/schedule/category`);
        return response.data;
    } catch (error) {
        console.error("일정 카테고리 정보를 불러오는데 실패했습니다:", error);
    }
};

const createNewCategory = async (title: string, icon: string) => {
    try {
        const response = await apiClient.post(
            `/schedule/category`,
            {
                title: title,
                icon: icon,
            },
            {
                headers: {
                    accept: "*/*",
                },
            }
        );
        return response.status;
    } catch (error) {
        console.error(error);
    }
};

const deleteScheduleCategory = async (id: number) => {
    try {
        await apiClient.delete(`/schedule/category`, {
            data: {
                id: id,
            },
        });
    } catch (error) {
        console.error("일정 카테고리 삭제에 실패했습니다.", error);
    }
};

// 보류 : /schedule/{scheduleId}
// const getScehduleDetail = async (id: number) => {

// };

const deleteSchedule = async (id: number) => {
    try {
        await apiClient.delete(`/schedule`, {
            data: {
                id: id,
            },
        });
    } catch (error) {
        console.error("일정 삭제에 실패했습니다", error);
    }
};

const createNewSchedule = async (
    scheduleCategoryId: number,
    petId: number[],
    description: string,
    startDate: string,
    intervalType: string,
    intervalDay: number
) => {
    try {
        const response = await apiClient.post(
            `/schedule`,
            {
                scheduleCategoryId: scheduleCategoryId,
                petId: petId,
                description: description,
                startDate: startDate,
                intervalType: intervalType,
                intervalDay: intervalDay,
            },
            {
                headers: {
                    accept: "*/*",
                },
            }
        );
        return response.status;
    } catch (error) {
        console.error("일정 등록에 실패했습니다.", error);
    }
};

const modifySchedule = async (
    scheduleId: number,
    scheduleCategoryId: number,
    description: string,
    intervalType: string,
    intervalDay: number,
    nextScheduleDate: string,
    pets: number[]
) => {
    try {
        await apiClient.put(
            `/schedule`,
            {
                scheduleId: scheduleId,
                scheduleCategoryId: scheduleCategoryId,
                description: description,
                intervalType: intervalType,
                intervalDay: intervalDay,
                nextScheduleDate: nextScheduleDate,
                pets: pets,
            },
            {
                headers: {
                    accept: "*/*",
                },
            }
        );
    } catch (error) {
        console.error("일정 수정에 실패했습니다", error);
    }
};

const completeSchedule = async (scheduleId: number) => {
    try {
        await apiClient.patch(
            `/schedule`,
            {
                scheduleId: scheduleId,
            },
            {
                headers: {
                    accept: "*/*",
                },
            }
        );
    } catch (error) {
        console.error("일정 완료에 실패했습니다", error);
    }
};

const deleteFinishSchedule = async (endedScheduleId: number) => {
    try {
        await apiClient.delete(`/schedule/ended`, {
            data: {
                endedScheduleId: endedScheduleId,
            },
        });
    } catch (error) {
        console.error("완료 일정 삭제에 실패했습니다", error);
    }
};

export {
    getSchedule,
    getScheduleCategoty,
    createNewCategory,
    deleteScheduleCategory,
    deleteSchedule,
    createNewSchedule,
    modifySchedule,
    completeSchedule,
    deleteFinishSchedule,
};
