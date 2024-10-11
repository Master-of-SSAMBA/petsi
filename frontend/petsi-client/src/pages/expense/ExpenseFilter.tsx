import { bottomState, headerState } from "@/stores/useNavigationStore";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import * as St from "./ExpenseFilter.style";
import Toggle from "@/components/ui/_toggle/Toggle";
import OptionInput from "@/components/ui/_input/OptionInput";
import BackArrow from "@/assets/icons/Icon-backarrow.svg?react";
import { useNavigate } from "react-router-dom";
import { AppPaths } from "@/interfaces/AppPaths";

const ExpenseFilter = () => {
    const navigate = useNavigate();
    const setHeaderState = useSetRecoilState(headerState);
    const setBottomState = useSetRecoilState(bottomState);
    const [period, setPeriod] = useState<number>(0);
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    // const [category, setCategory] = useState<string>("");

    useEffect(() => {
        setHeaderState({
            left: "",
            right: "",
            text: "",
            isVisible: false,
            color: "beige",
        });
        setBottomState({
            isVisible: true,
            activePage: "Expense",
        });
    }, [setHeaderState, setBottomState]);

    const clickToggle = (index: number) => {
        setPeriod(index);
    };

    const clickApply = () => {
        let periodValue = "";
        let startDateValue = "";
        let endDateValue = "";

        // "전체"를 선택한 경우 period를 "all"로 설정
        if (period === 1) {
            periodValue = "all";
        }

        // "1개월"을 선택한 경우
        else if (period === 0) {
            periodValue = "custom";

            // 현재 날짜 기준으로 한 달 전 날짜와 오늘 날짜로 설정
            const today = new Date();
            const lastMonth = new Date(today);
            lastMonth.setMonth(today.getMonth() - 1);

            startDateValue = lastMonth.toISOString().split("T")[0]; // "yyyy-MM-dd" 형식
            endDateValue = today.toISOString().split("T")[0]; // "yyyy-MM-dd" 형식
        }
        // "직접입력"을 선택한 경우
        else if (period === 2) {
            periodValue = "custom";
            startDateValue = startDate;
            endDateValue = endDate;
        }

        navigate(AppPaths.EXPENSE_DETAIL, {
            state: {
                filterPeriod: periodValue,
                filterStartDate: startDateValue,
                filterEndDate: endDateValue,
            },
        });
    };

    return (
        <>
            <St.FilterHeader>
                <BackArrow onClick={() => navigate(-1)} />
                <span>필터</span>
                <span onClick={clickApply}>적용</span>
            </St.FilterHeader>
            <St.Container>
                <div className="toggle">
                    <div className="toggle-title">
                        <span>* 기간선택</span>
                    </div>
                    <Toggle
                        items={["1개월", "전체", "직접입력"]}
                        routes={[]}
                        onClick={clickToggle}
                    />
                    {period === 2 && (
                        <div className="select-period">
                            <OptionInput
                                type="date"
                                onChange={(value) =>
                                    setStartDate(value as string)
                                }
                            ></OptionInput>
                            ~
                            <OptionInput
                                type="date"
                                onChange={(value) =>
                                    setEndDate(value as string)
                                }
                            ></OptionInput>
                        </div>
                    )}
                </div>

                {/* <div className="select-category">
                    <span>카테고리</span>
                    <St.Dropdown>
                        <Dropdown
                            optionList={[
                                "사료",
                                "간식",
                                "용품",
                                "장난감",
                                "병원비",
                            ]}
                            onChange={setCategory}
                        />
                    </St.Dropdown>
                </div> */}
            </St.Container>
        </>
    );
};

export default ExpenseFilter;
