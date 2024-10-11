import { useEffect, useState } from "react";
import * as St from "../../pages/calender/schedule/Schedule.style";
import DatePicker from "../ui/_calendar/DatePicker";
import Container from "../ui/_container/Container";
import Dropdown from "../ui/_dropdown/Dropdown";
import Input from "../ui/_input/Input";
import {
    createNewSchedule,
    getScheduleCategoty,
} from "@/services/scheduleServices";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { AppPaths } from "@/interfaces/AppPaths";
import PetNav from "../pet-navigation/PetNav";
import { DateValue } from "../ui/_calendar/CalendarType";

const CYCLE_OPTION = [
    { label: "년", value: "PER_YEAR" },
    { label: "월", value: "PER_MONTH" },
    { label: "주", value: "PER_WEEK" },
    { label: "일", value: "PER_DAY" },
    { label: "특정일", value: "SPEC_DAY" },
];

interface Category {
    id: number;
    title: string;
}

const AddSchedule = () => {
    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const [categoryId, setCategoryId] = useState<number>(0);
    const [selectedPetId, setSelectedPetId] = useState<number[]>([]);
    const [initDate, setInitDate] = useState<string>(
        format(new Date(), "yyyy-MM-dd", { locale: ko })
    );
    const [cycleOption, setCycleOption] = useState<string>(
        CYCLE_OPTION[0].value
    ); // 주기 값으로 설정
    const [cycle, setCycle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [errors, setErrors] = useState<{
        cycle: boolean;
        description: boolean;
    }>({
        cycle: true,
        description: false,
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchScheduleCategory = async () => {
            try {
                const response = await getScheduleCategoty();
                setCategoryList(response);
            } catch (error) {
                console.error("카테고리 가져오기 에러:", error);
            }
        };

        fetchScheduleCategory();
    }, []);

    const handleCategory = (val: string) => {
        const category = categoryList.find((item) => item.title === val);
        if (category) {
            setCategoryId(category.id);
        }
    };

    const handlePetId = (id: number) => {
        setSelectedPetId([id]);
    };

    const handleDescription = (val: string) => {
        const descriptionRegex = /^.{0,200}$/;
        setDescription(val);
        setErrors((prev) => ({
            ...prev,
            description: descriptionRegex.test(val) ? false : true,
        }));
    };

    const handleDate = (date: DateValue | null) => {
        if (date) {
            const formattedDate = format(date as Date, "yyyy-MM-dd", {
                locale: ko,
            });
            setInitDate(formattedDate);
        }
    };

    const handleCycleChange = (val: string) => {
        const cycleRegex = /^[1-9]$|^[1-2][0-9]$|^3[0-1]$/;
        setCycle(val);
        setErrors((prev) => ({
            ...prev,
            cycle: cycleRegex.test(val) ? false : true,
        }));
    };

    const isValid = () => {
        return (
            categoryId !== 0 &&
            selectedPetId.length > 0 &&
            cycleOption !== "" &&
            initDate !== "" &&
            description !== "" &&
            cycle !== "" &&
            !errors.cycle &&
            !errors.description
        );
    };

    const handleSubmit = async () => {
        if (!isValid()) return;

        try {
            const response = await createNewSchedule(
                categoryId,
                selectedPetId,
                description,
                initDate,
                cycleOption, // 선택한 주기 옵션을 그대로 전달
                parseInt(cycle)
            );

            if (response === 201) {
                navigate(AppPaths.SCHEDULE);
            }
        } catch (error) {
            window.alert("일정 등록 실패");
            console.error("새로운 일정 등록 중 에러:", error);
        }
    };

    return (
        <Container
            color="beige"
            shadow={true}
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                height: "100%",
                gap: "1rem",
                cursor: "default",
            }}
        >
            <PetNav selectEvent={handlePetId} selectedPetId={selectedPetId} />
            <St.Item>
                <h5>* 일정 유형을 등록해주세요</h5>
                <Dropdown
                    border={true}
                    optionList={categoryList.map((category) => category.title)}
                    onChange={handleCategory}
                />
            </St.Item>
            <St.Item>
                <h5>* 일정 주기를 등록해주세요</h5>
                {errors.cycle && (
                    <h6 style={{ color: "red" }}>
                        주기는 1~31 사이의 숫자만 입력 가능합니다.
                    </h6>
                )}
                <St.CycleContainer>
                    <Input
                        type="number"
                        value={cycle}
                        onChange={handleCycleChange}
                        style={{ height: 48 }}
                    />
                    <Dropdown
                        border={true}
                        optionList={CYCLE_OPTION.map((option) => option.label)} // 주기 라벨을 보여줌
                        onChange={(val) => {
                            const selectedOption = CYCLE_OPTION.find(
                                (option) => option.label === val
                            );
                            if (selectedOption) {
                                setCycleOption(selectedOption.value); // 주기 값을 설정
                            }
                        }}
                    />
                </St.CycleContainer>
            </St.Item>
            <St.Item>
                <h5>* 시작 일자를 지정해주세요</h5>
                <DatePicker
                    selectedDate={new Date(initDate)}
                    onChange={handleDate}
                />
            </St.Item>
            <St.Item>
                <h5>* 설명을 입력해주세요</h5>
                {errors.description && (
                    <h6 style={{ color: "red" }}>
                        설명은 최대 200자까지 입력 가능합니다.
                    </h6>
                )}
                <Input
                    type="text"
                    value={description}
                    onChange={handleDescription}
                />
            </St.Item>
            <Container color={isValid() ? "yellow" : "lightgray"} shadow={true}>
                <div onClick={handleSubmit}>
                    <h4>완료</h4>
                </div>
            </Container>
        </Container>
    );
};

export default AddSchedule;
