import { useLocation } from "react-router-dom";
import * as St from "./Schedule.style";
import { useSetRecoilState } from "recoil";
import { bottomState, headerState } from "@/stores/useNavigationStore";
import { useEffect, useState } from "react";
import {
    completeSchedule,
    deleteFinishSchedule,
    deleteSchedule,
    getSchedule,
} from "@/services/scheduleServices";
import Button from "@/components/ui/_button/Button";
import Container from "@/components/ui/_container/Container";
import Close from "@/assets/icons/Icon-close.svg";
import Modal from "@/components/ui/_modal/Modal";

interface Schedule {
    scheduleId: number;
    status: string;
    date: {
        date: string;
        time: string | null;
    };
    pets: [
        {
            petId: number;
            petName: string;
        },
    ];
    scheduleCategory: {
        id: number;
        title: string;
        icon: string;
    };
    description: string;
}

const ScheduleDetail = () => {
    const location = useLocation();
    const { selectedMonth } = location.state;
    const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
    const [
        isDeleteCompleteScheduleModalOpen,
        setIsDeleteCompleteScheduleModalOpen,
    ] = useState(false);
    const [
        isDeleteIncompleteScheduleModalOpen,
        setIsDeleteIncompleteScheduleModalOpen,
    ] = useState(false);

    const setHeaderState = useSetRecoilState(headerState);
    const setBottomState = useSetRecoilState(bottomState);
    const [selectedScheduleId, setSelectedScheduleId] = useState<number | null>(
        null
    );
    const [incompleteScheduleList, setIncompleteScheduleList] = useState([]);
    const [completeScheduleList, setCompleteScheduleList] = useState([]);
    const [isPushed, setIsPushed] = useState(false);

    const fetchSchedule = async () => {
        try {
            const response = await getSchedule(selectedMonth);

            // status 필드를 기준으로 분류
            const activeSchedules = response.filter(
                (schedule: Schedule) => schedule.status === "활성"
            );
            const completedSchedules = response.filter(
                (schedule: Schedule) => schedule.status === "완료"
            );

            setIncompleteScheduleList(activeSchedules);
            setCompleteScheduleList(completedSchedules);
        } catch (error) {
            console.error("Error fetching schedule:", error);
        }
    };

    useEffect(() => {
        setHeaderState({
            left: "backArrow",
            right: "alertActive",
            text: "상세 일정",
            isVisible: true,
            color: "beige",
        });
        setBottomState({
            isVisible: true,
            activePage: "Calendar",
        });
    }, [setHeaderState, setBottomState]);

    useEffect(() => {
        fetchSchedule();
    }, [fetchSchedule]);

    const formattedDate = (date: string) => {
        const dateString = new Date(date);
        const formatter = new Intl.DateTimeFormat("ko-KR", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
        return formatter.format(dateString);
    };

    const selectIcon = (icon: string) => {
        if (icon === "congrats") {
            return "/images/congrats.webp";
        } else if (icon === "medical") {
            return "/images/medical.webp";
        } else if (icon === "play") {
            return "/images/play.webp";
        } else if (icon === "shopping") {
            return "/images/shopping.webp";
        }
    };

    const handleCompleteSchedule = async () => {
        if (selectedScheduleId) {
            try {
                await completeSchedule(selectedScheduleId);
                fetchSchedule();
                setIsCompleteModalOpen(false);
                setSelectedScheduleId(null);
            } catch (error) {
                window.alert("완료 처리에 실패했습니다");
                console.error(error);
                setIsCompleteModalOpen(false);
                setSelectedScheduleId(null);
            }
        }
    };

    const deleteIncompleteSchedule = async () => {
        if (selectedScheduleId) {
            try {
                await deleteSchedule(selectedScheduleId);
                fetchSchedule();
                setIsDeleteIncompleteScheduleModalOpen(false);
                setSelectedScheduleId(null);
            } catch (error) {
                window.alert("삭제하지 못했습니다");
                console.error(error);
                setIsDeleteIncompleteScheduleModalOpen(false);
                setSelectedScheduleId(null);
            }
        }
    };

    const deleteCompleteSchedule = async () => {
        if (selectedScheduleId) {
            try {
                await deleteFinishSchedule(selectedScheduleId);
                fetchSchedule();
                setIsDeleteCompleteScheduleModalOpen(false);
                setSelectedScheduleId(null);
            } catch (error) {
                window.alert("삭제하지 못했습니다");
                console.error(error);
                setSelectedScheduleId(null);
                setIsDeleteCompleteScheduleModalOpen(false);
            }
        }
    };

    return (
        <St.Container>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <div
                    style={{ width: "40%" }}
                    onClick={() => setIsPushed(!isPushed)}
                >
                    <Button
                        size="large"
                        color={isPushed ? "pink" : "white"}
                        text={isPushed ? "미완료 일정 보기" : "완료 일정 보기"}
                        shadow={true}
                    />
                </div>
            </div>
            <St.StyledCalendarContainer>
                {!isPushed ? (
                    <St.IncompleteScheduleContainer>
                        {incompleteScheduleList.length > 0 ? (
                            incompleteScheduleList.map((schedule: Schedule) => (
                                <Container
                                    shadow={true}
                                    color="white"
                                    key={schedule.scheduleId}
                                    style={{
                                        justifyContent: "flex-start",
                                        position: "relative",
                                        cursor: "default",
                                    }}
                                >
                                    <St.ScheduleIcon
                                        src={selectIcon(
                                            schedule.scheduleCategory.icon
                                        )}
                                        alt={schedule.scheduleCategory.icon}
                                    />
                                    <St.SchedultItem>
                                        <St.ScheduleInfo>
                                            <h5
                                                style={{
                                                    color: "var(--color-gray)",
                                                }}
                                            >
                                                {formattedDate(
                                                    schedule.date.date
                                                )}
                                            </h5>
                                            {schedule.pets.map((pet) => (
                                                <h5
                                                    key={pet.petId}
                                                    style={{
                                                        color: "var(--color-gray)",
                                                    }}
                                                >
                                                    {pet.petName}
                                                </h5>
                                            ))}
                                        </St.ScheduleInfo>
                                        <h4>{schedule.description}</h4>
                                    </St.SchedultItem>
                                    <St.ScheduleButtonContainer>
                                        <img
                                            src={Close}
                                            alt="close"
                                            style={{
                                                width: "1rem",
                                                marginBottom: "0.6rem",
                                                cursor: "pointer",
                                            }}
                                            onClick={() => {
                                                setSelectedScheduleId(
                                                    schedule.scheduleId
                                                );
                                                setIsDeleteIncompleteScheduleModalOpen(
                                                    true
                                                );
                                            }}
                                        />
                                        <St.ConfirmButton
                                            onClick={() => {
                                                setSelectedScheduleId(
                                                    schedule.scheduleId
                                                );
                                                setIsCompleteModalOpen(true);
                                            }}
                                        >
                                            완료
                                        </St.ConfirmButton>
                                    </St.ScheduleButtonContainer>
                                </Container>
                            ))
                        ) : (
                            <p>일정이 없습니다</p>
                        )}
                    </St.IncompleteScheduleContainer>
                ) : (
                    <St.CompleteScheduleContainer>
                        {completeScheduleList.length > 0 ? (
                            completeScheduleList.map((schedule: Schedule) => (
                                <Container
                                    shadow={true}
                                    color="lime"
                                    key={schedule.scheduleId}
                                    style={{
                                        justifyContent: "flex-start",
                                        position: "relative",
                                    }}
                                >
                                    <St.ScheduleIcon
                                        src={selectIcon(
                                            schedule.scheduleCategory.icon
                                        )}
                                        alt={schedule.scheduleCategory.icon}
                                    />
                                    <St.SchedultItem>
                                        <St.ScheduleInfo>
                                            <h5
                                                style={{
                                                    color: "var(--color-gray)",
                                                }}
                                            >
                                                {formattedDate(
                                                    schedule.date.date
                                                )}
                                            </h5>
                                            {schedule.pets.map((pet) => (
                                                <h5
                                                    key={pet.petId}
                                                    style={{
                                                        color: "var(--color-gray)",
                                                    }}
                                                >
                                                    {pet.petName}
                                                </h5>
                                            ))}
                                        </St.ScheduleInfo>
                                        <h4>{schedule.description}</h4>
                                    </St.SchedultItem>
                                    <St.ScheduleButtonContainer>
                                        <img
                                            src={Close}
                                            alt="close"
                                            style={{
                                                width: "1rem",
                                                cursor: "pointer",
                                            }}
                                            onClick={() => {
                                                setSelectedScheduleId(
                                                    schedule.scheduleId
                                                );
                                                setIsDeleteCompleteScheduleModalOpen(
                                                    true
                                                );
                                            }}
                                        />
                                    </St.ScheduleButtonContainer>
                                </Container>
                            ))
                        ) : (
                            <p>일정이 없습니다</p>
                        )}
                    </St.CompleteScheduleContainer>
                )}
            </St.StyledCalendarContainer>
            <Modal
                state="CompleteSchedule"
                isOpen={isCompleteModalOpen}
                onClose={() => setIsCompleteModalOpen(false)}
                onButtonClick={handleCompleteSchedule}
            />
            <Modal
                state="DeleteSchedule"
                isOpen={isDeleteCompleteScheduleModalOpen}
                onClose={() => setIsDeleteCompleteScheduleModalOpen(false)}
                onButtonClick={deleteCompleteSchedule}
            />
            <Modal
                state="DeleteSchedule"
                isOpen={isDeleteIncompleteScheduleModalOpen}
                onClose={() => setIsDeleteIncompleteScheduleModalOpen(false)}
                onButtonClick={deleteIncompleteSchedule}
            />
        </St.Container>
    );
};

export default ScheduleDetail;
