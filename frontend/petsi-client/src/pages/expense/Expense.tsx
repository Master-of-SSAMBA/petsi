import { useNavigate } from "react-router-dom";
import { bottomState, headerState } from "@/stores/useNavigationStore";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import * as St from "./Expense.style";
import Open from "@/assets/icons/Icon-plus-2.svg?react";
import PetFriends from "@/assets/icons/Icon-petfriends.svg?react";
import { AppPaths } from "@/interfaces/AppPaths";
import { DoughnutChart } from "@/components/expense/DoughnutChart";
import { fetchChartExpense } from "@/services/expenseServices";
import { getMonth } from "date-fns";
import { formatNumber } from "@/hooks/useFormatNumber";
import EmptyState from "@/components/ui/_emptyState/EmptyState";
import { fetchPet } from "@/services/petServices";

const Expense = () => {
    const navigate = useNavigate();
    const setHeaderState = useSetRecoilState(headerState);
    const setBottomState = useSetRecoilState(bottomState);
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

    const [userNickname, setUserNickname] = useState<string>("");
    const [userTotal, setUserTotal] = useState<number>(0);
    const [userImg, setUserImg] = useState<string>("");
    const [chartLabels, setChartLabels] = useState<string[]>([]);
    const [chartData, setChartData] = useState<number[]>([]);
    const [chartRate, setChartRate] = useState<number[]>([]);

    const chartColor = [
        "#FF6384",
        "#FF9F40",
        "#FFCD56",
        "#4BC0C0",
        "#36A2EB",
        "#9585F1",
    ];

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

        const fetchMonthlyData = async () => {
            const res = await fetchChartExpense();
            const { nickname, img, total, costs } = res;

            setUserNickname(nickname);
            setUserTotal(total);
            setUserImg(img);
            setChartLabels(costs.labels);
            setChartData(costs.datas);
            setChartRate(costs.rates);
        };
        fetchMonthlyData();
    }, [setHeaderState, setBottomState]);

    const clickAddButton = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const clickManualAddButton = async () => {
        try {
            const response = await fetchPet();
            if (response && response.data) {
                if (response.data.length === 0) {
                    alert("펫 등록이 필요합니다. 펫 등록 페이지로 이동합니다.");
                    navigate(AppPaths.ADD_PET);
                } else {
                    navigate(AppPaths.EXPENSE_ADD);
                }
            }
        } catch (error) {
            console.error("펫 정보 가져오기 오류:", error);
        }
    };

    return (
        <St.Container>
            <St.AnalysisWrapper>
                {chartLabels.length === 0 ? (
                    <EmptyState state="expense" />
                ) : (
                    <>
                        <St.UserData>
                            <img
                                src={userImg || "/images/user.webp"}
                                alt="user img"
                            />
                            <div>
                                <span>
                                    <span className="strong-text">
                                        {userNickname}
                                    </span>
                                    님의 {getMonth(new Date()) + 1}월 소비
                                    금액은 <br />
                                </span>
                                <span className="total-cost">
                                    {formatNumber(userTotal)}원
                                </span>
                                입니다.
                            </div>
                        </St.UserData>
                        <DoughnutChart />
                        <St.ChartAnalysis>
                            {chartLabels.length > 0 &&
                                chartLabels.map((label, index) => (
                                    <St.Category key={index}>
                                        <div className="category-left">
                                            <div
                                                className="circle"
                                                style={{
                                                    backgroundColor: `${chartColor[index]}`,
                                                }}
                                            />
                                            <div
                                                style={{
                                                    display: "flex",
                                                    gap: "0.2rem",
                                                }}
                                            >
                                                <h5>{label}</h5>
                                                <span className="rate">
                                                    {chartRate[index]}%
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            <h5>{chartData[index]}원</h5>
                                        </div>
                                    </St.Category>
                                ))}
                        </St.ChartAnalysis>
                        <St.Button
                            onClick={() => navigate(AppPaths.EXPENSE_DETAIL)}
                        >
                            <h5>전체보기</h5>
                        </St.Button>
                    </>
                )}
            </St.AnalysisWrapper>
            <St.AddButton onClick={clickAddButton}>
                <St.IconBox>
                    <St.IconWrapper $isOpen={isDropdownOpen}>
                        <Open />
                    </St.IconWrapper>
                </St.IconBox>
                <St.Dropdown $isOpen={isDropdownOpen}>
                    {isDropdownOpen && (
                        <>
                            <St.DropdownItem
                                $isOpen={isDropdownOpen}
                                style={{ backgroundColor: "#FF5690" }}
                                onClick={() => {
                                    navigate(AppPaths.PETFRIENDS_LOGIN);
                                }}
                            >
                                <PetFriends />{" "}
                                <span style={{ color: "white" }}>
                                    구매 목록 가져오기
                                </span>
                            </St.DropdownItem>
                            <St.DropdownItem
                                $isOpen={isDropdownOpen}
                                onClick={clickManualAddButton}
                            >
                                <span>직접 소비 내역 등록하기</span>
                            </St.DropdownItem>
                        </>
                    )}
                </St.Dropdown>
            </St.AddButton>
        </St.Container>
    );
};

export default Expense;
