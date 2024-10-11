import { bottomState, headerState } from "@/stores/useNavigationStore";
import { useCallback, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import * as St from "./Schedule.style";
import Container from "@/components/ui/_container/Container";
import Plus from "@/assets/icons/Icon-plus.svg";
import { format } from "date-fns";
import { AppPaths } from "@/interfaces/AppPaths";
import { getSchedule } from "@/services/scheduleServices";
import { useNavigate } from "react-router-dom";
import PetNav from "@/components/pet-navigation/PetNav";

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
    };
    description: string;
}

const Schedule = () => {
    const [userSchedule, setUserSchedule] = useState<Schedule[]>([]);
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedPetId, setSelectedPetId] = useState<number | null>(null);
    const [isMonthSelectionMode, setIsMonthSelectionMode] = useState(false);
    const setHeaderState = useSetRecoilState(headerState);
    const setBottomState = useSetRecoilState(bottomState);

    const navigate = useNavigate();

    // 주어진 Date 객체를 YYYY-MM 형식으로 변환하여 스케줄을 가져오는 함수
    const fetchSchedule = useCallback(async (date: Date, petId?: number) => {
        const formattedMonth = format(date, "yyyy-MM");
        setSelectedMonth(formattedMonth);
        try {
            const response = await getSchedule(formattedMonth, petId);
            setUserSchedule(response);
        } catch (error) {
            console.error("Error fetching schedule:", error);
        }
    }, []);

    useEffect(() => {
        const currentDate = new Date();
        fetchSchedule(currentDate, selectedPetId || undefined); // selectedPetId가 null이면 undefined로 전달
    }, [selectedPetId, fetchSchedule]);

    // 초기화면에서 현재 월의 스케줄을 가져옴
    useEffect(() => {
        const currentDate = new Date();
        fetchSchedule(currentDate);
    }, [fetchSchedule]);

    useEffect(() => {
        setHeaderState({
            left: "",
            right: "alertActive",
            text: "캘린더",
            isVisible: true,
            color: "beige",
        });
        setBottomState({
            isVisible: true,
            activePage: "Calendar",
        });
    }, [setHeaderState, setBottomState]);

    const handleSelectedPet = (newPetId: number) => {
        setSelectedPetId((prevSelectedPetId) =>
            prevSelectedPetId === newPetId ? null : newPetId
        );
    };

    // 월이 변경될 때마다 호출되는 함수
    const handleMonthChange = (event: any) => {
        const newMonthDate = event.activeStartDate;
        fetchSchedule(newMonthDate); // 새로운 월로 스케줄 데이터를 요청
    };

    const checkIfScheduled = (date: Date) => {
        const formattedDate = format(date, "yyyy-MM-dd");
        // 스케줄 배열 안에 formattedDate가 있는지 확인
        return userSchedule.some(
            (schedule) => schedule.date.date === formattedDate
        );
    };

    const formattedDay = (locale: string | undefined, date: Date) => {
        if (locale === "error") {
            console.error("can't find locale");
        }
        return format(date, "dd");
    };

    return (
        <St.Container>
            <PetNav
                selectEvent={handleSelectedPet}
                selectedPetId={selectedPetId}
            />
            <St.StyledCalendarContainer>
                <St.StyledCalendar
                    calendarType="gregory" // 일요일부터 시작
                    showNeighboringMonth={false} // 전달, 다음달 날짜 숨기기
                    next2Label={null} // 연 단위 이동 버튼 삭제
                    prev2Label={null} // 연 단위 이동 버튼 삭제
                    minDetail="year" // 10년 단위 년도 숨기기
                    formatDay={formattedDay} // 함수를 그대로 전달
                    // tileContent를 사용해 일정이 있는 날짜에 동그라미 추가
                    tileContent={({ date, view }) => {
                        // view가 "month"인 경우에만 표시
                        if (view === "month" && checkIfScheduled(date)) {
                            return (
                                <span
                                    style={{
                                        display: "block",
                                        color: "var(--color-gray)",
                                        fontSize: "2rem",
                                        position: "absolute",
                                        bottom: "0.1rem",
                                    }}
                                >
                                    •
                                </span>
                            );
                        }
                        return null;
                    }}
                    // 월이 변경될 때 호출되는 이벤트
                    onActiveStartDateChange={handleMonthChange}
                    onDrillDown={() => setIsMonthSelectionMode(false)}
                    onDrillUp={() => setIsMonthSelectionMode(true)}
                />
                {!isMonthSelectionMode && (
                    <St.MonthDetailButton
                        onClick={() =>
                            navigate(`${AppPaths.SCHEDULE}/detail`, {
                                state: { selectedMonth },
                            })
                        }
                    >
                        <h4>상세 일정 보기</h4>
                    </St.MonthDetailButton>
                )}
            </St.StyledCalendarContainer>
            <St.BottomButton>
                <Container
                    color="white"
                    shadow={true}
                    style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                    }}
                    path={AppPaths.PICTURE}
                >
                    <img src="/images/prize.webp" alt="prize" />
                    <h5>인증하고 우대금리 받기</h5>
                </Container>
                <Container
                    color="beige"
                    shadow={true}
                    style={{
                        width: "10rem",
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.4rem",
                    }}
                    path={`${AppPaths.SCHEDULE}/create`}
                >
                    <img src={Plus} alt="plus button" style={{ width: 32 }} />
                    <h5>일정 추가</h5>
                </Container>
            </St.BottomButton>
        </St.Container>
    );
};

export default Schedule;
