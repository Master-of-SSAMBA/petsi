import {
    fetchChartExpense,
    fetchExpenseData,
} from "@/services/expenseServices";
import { bottomState, headerState } from "@/stores/useNavigationStore";
import {
    addMonths,
    endOfMonth,
    format,
    getMonth,
    getYear,
    parseISO,
    startOfMonth,
} from "date-fns";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { useSetRecoilState } from "recoil";
import * as St from "./ExpenseDetail.style";
import { DoughnutChart } from "@/components/expense/DoughnutChart";
import { formatNumber } from "@/hooks/useFormatNumber";
import Left from "@/assets/icons/Icon-left.svg?react";
import Right from "@/assets/icons/Icon-right.svg?react";
import Add from "@/assets/icons/Icon-add.svg?react";
import Remove from "@/assets/icons/Icon-remove.svg?react";
import Medical from "@/assets/icons/Icon-medical.svg?react";
import { useLocation, useNavigate } from "react-router-dom";
import { AppPaths } from "@/interfaces/AppPaths";
import { formatDate } from "@/hooks/useFormattedDate";
import Toy from "@/assets/icons/Icon-toy.svg?react";
import Supplies from "@/assets/icons/Icon-supply.svg?react";
import Snack from "@/assets/icons/Icon-snack.svg?react";
import Feed from "@/assets/icons/Icon-feed.svg?react";
import Loading from "@/components/ui/_loading/Loading";

export interface Supply {
    purchaseId: number;
    title: string;
    img: string | null;
    date?: string;
    quantity: number;
    purchasedAt: string;
    cost: number;
    category: string;
    kind: string;
    option: string;
}

export interface Medical {
    medicalExpenseId: number;
    petId: number;
    diseaseName: string;
    cost: number;
    date?: string;
    hospital: string;
    visitedAt: string;
    memo: string;
    kind: string;
}

interface LabelColorMap {
    [key: string]: string;
}

interface ExpenseResponse {
    [date: string]: (Supply | Medical)[];
}

const ExpenseDetail = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { filterPeriod, filterStartDate, filterEndDate } =
        location.state || {};
    const setHeaderState = useSetRecoilState(headerState);
    const setBottomState = useSetRecoilState(bottomState);

    const [currentDate, setCurrentDate] = useState<Date>(new Date());
    const [period, setPeriod] = useState<string>(
        `${getYear(new Date())}년 ${getMonth(new Date()) + 1}월`
    );
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [userTotal, setUserTotal] = useState<number>(0);
    const [chartLabels, setChartLabels] = useState<string[]>([]);
    const [chartData, setChartData] = useState<number[]>([]);
    const [chartRate, setChartRate] = useState<number[]>([]);

    const [page, setPage] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const [expenseData, setExpenseData] = useState<
        Record<string, (Supply | Medical)[]>
    >({});

    const [labelColorMap, setLabelColorMap] = useState<LabelColorMap>({});

    const observer = useRef<IntersectionObserver | null>(null);

    // 마지막 요소가 감지될 때마다 콜백 함수 실행
    const lastExpenseElementRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prevPage) => prevPage + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );

    const chartColor = [
        "#FF6384",
        "#FF9F40",
        "#FFCD56",
        "#4BC0C0",
        "#36A2EB",
        "#9585F1",
    ];

    const createLabelColorMap = (labels: string[]): LabelColorMap => {
        const chartColor = [
            "#FF6384",
            "#FF9F40",
            "#FFCD56",
            "#4BC0C0",
            "#36A2EB",
            "#9585F1",
        ];

        return labels.reduce<LabelColorMap>((acc, label, index) => {
            if (index < chartColor.length) {
                acc[label] = chartColor[index];
            }
            return acc;
        }, {});
    };

    const getExpenseData = useCallback(async () => {
        if (loading || !hasMore) return;
        setLoading(true);
        try {
            let chartResponse = null;
            let response: ExpenseResponse | null = null;

            if (filterPeriod) {
                if (filterPeriod === "all") {
                    setPeriod("전체");
                    chartResponse = await fetchChartExpense(filterPeriod);
                    response = await fetchExpenseData(page, filterPeriod);
                } else {
                    setPeriod(
                        `${format(parseISO(filterStartDate), "yy.MM.dd")} ~ ${format(parseISO(filterEndDate), "yy.MM.dd")}`
                    );
                    chartResponse = await fetchChartExpense(
                        filterPeriod,
                        filterStartDate,
                        filterEndDate
                    );
                    response = await fetchExpenseData(
                        page,
                        filterPeriod,
                        filterStartDate,
                        filterEndDate
                    );
                }
            } else {
                setPeriod(
                    `${getYear(new Date())}년 ${getMonth(new Date()) + 1}월`
                );
                response = await fetchExpenseData(page);
                chartResponse = await fetchChartExpense();
            }

            if (response) {
                setExpenseData((prevData) => {
                    const newData = { ...prevData };
                    Object.entries(response).forEach(([date, expenses]) => {
                        if (newData[date]) {
                            newData[date] = [...newData[date], ...expenses];
                        } else {
                            newData[date] = expenses;
                        }
                    });
                    return newData;
                });
                setHasMore(Object.keys(response).length > 0);
            }

            if (chartResponse) {
                const { total, costs } = chartResponse;
                setUserTotal(total);
                setChartLabels(costs.labels);
                setChartData(costs.datas);
                setChartRate(costs.rates);
                const newLabelColorMap = createLabelColorMap(costs.labels);
                setLabelColorMap(newLabelColorMap);
            }
        } catch (error) {
            console.error("Error fetching expense data:", error);
        }
        setLoading(false);
    }, [page, filterPeriod, filterStartDate, filterEndDate]);

    const getInfiniteScrollData = useCallback(async () => {
        if (loading || !hasMore) return;
        setLoading(true);
        try {
            let response: ExpenseResponse | null = null;

            if (filterPeriod) {
                if (filterPeriod === "all") {
                    response = await fetchExpenseData(page, filterPeriod);
                } else {
                    response = await fetchExpenseData(
                        page,
                        filterPeriod,
                        filterStartDate,
                        filterEndDate
                    );
                }
            } else {
                response = await fetchExpenseData(page);
            }

            if (response) {
                setExpenseData((prevData) => {
                    const newData = { ...prevData };
                    Object.entries(response).forEach(([date, expenses]) => {
                        if (newData[date]) {
                            newData[date] = [...newData[date], ...expenses];
                        } else {
                            newData[date] = expenses;
                        }
                    });
                    return newData;
                });
                setHasMore(Object.keys(response).length > 0);
            }
        } catch (error) {
            console.error(error);
        }
    }, [page, filterEndDate, filterPeriod, filterStartDate, hasMore, loading]);

    useEffect(() => {
        const totalExpenseItems = Object.values(expenseData).reduce(
            (total, dateExpenses) => total + dateExpenses.length,
            0
        );

        if (totalExpenseItems <= page * 20) {
            getInfiniteScrollData();
        }
    }, [page, expenseData, getInfiniteScrollData]);

    useEffect(() => {
        getExpenseData();
    }, [getExpenseData]);

    useEffect(() => {
        setHeaderState({
            left: "backArrow",
            right: "",
            text: "소비 내역",
            isVisible: true,
            color: "beige",
        });
        setBottomState({
            isVisible: true,
            activePage: "Expense",
        });

        // const getExpenseData = async () => {
        //     let chartResponse = null;
        //     let response = null;

        //     if (filterPeriod) {
        //         if (filterPeriod === "all") {
        //             setPeriod("전체");
        //             chartResponse = await fetchChartExpense(filterPeriod);
        //             response = await fetchExpenseData(page, filterPeriod);
        //         } else {
        //             setPeriod(
        //                 `${format(parseISO(filterStartDate), "yy.MM.dd")} ~ ${format(parseISO(filterEndDate), "yy.MM.dd")}`
        //             );
        //             chartResponse = await fetchChartExpense(
        //                 filterPeriod,
        //                 filterStartDate,
        //                 filterEndDate
        //             );
        //             response = await fetchExpenseData(
        //                 page,
        //                 filterPeriod,
        //                 filterStartDate,
        //                 filterEndDate
        //             );
        //         }
        //     } else {
        //         setPeriod(
        //             `${getYear(new Date())}년 ${getMonth(new Date()) + 1}월`
        //         );
        //         response = await fetchExpenseData(page);
        //         chartResponse = await fetchChartExpense();
        //     }

        //     setExpenseData(response);

        //     const { total, costs } = chartResponse;
        //     setUserTotal(total);
        //     setChartLabels(costs.labels);
        //     setChartData(costs.datas);
        //     setChartRate(costs.rates);
        //     const newLabelColorMap = createLabelColorMap(costs.labels);
        //     setLabelColorMap(newLabelColorMap);
        // };

        // getExpenseData();
    }, [setHeaderState, setBottomState]);

    const handlePrevMonth = async () => {
        const prevDate = addMonths(currentDate, -1);
        setCurrentDate(prevDate);
        setPeriod(`${getYear(prevDate)}년 ${getMonth(prevDate) + 1}월`);
        setPage(0);
        updateDateRange(prevDate);

        const chartData = await fetchChartExpense("custom", startDate, endDate);
        const { total, costs } = chartData;
        setUserTotal(total);
        setChartLabels(costs.labels);
        setChartData(costs.datas);
        setChartRate(costs.rates);

        const expenseData = await fetchExpenseData(
            page,
            "custom",
            startDate,
            endDate
        );
        setExpenseData(expenseData);
    };

    const updateDateRange = (date: Date) => {
        const start = startOfMonth(date); // 달의 첫 날
        const end = endOfMonth(date); // 달의 마지막 날
        setStartDate(format(start, "yyyy-MM-dd"));
        setEndDate(format(end, "yyyy-MM-dd"));
    };

    const handleNextMonth = async () => {
        const nextDate = addMonths(currentDate, 1);
        setCurrentDate(nextDate);
        setPeriod(`${getYear(nextDate)}년 ${getMonth(nextDate) + 1}월`);
        setPage(0);
        updateDateRange(nextDate);

        const chartData = await fetchExpenseData(page, startDate, endDate);
        const { total, costs } = chartData;
        setUserTotal(total);
        setChartLabels(costs.labels);
        setChartData(costs.datas);
        setChartRate(costs.rates);
    };

    function isMedical(item: Medical | Supply): item is Medical {
        return (item as Medical).diseaseName !== undefined;
    }

    return (
        <St.Container>
            <St.ChartSection>
                <St.ChartContainer>
                    <div className="chart-header">
                        <St.SelectMonth>
                            <Left onClick={handlePrevMonth} />
                            <span>{period}</span>
                            <Right onClick={handleNextMonth} />
                        </St.SelectMonth>
                        <span>-{formatNumber(userTotal)}원</span>
                    </div>
                    <div className="chart-body">
                        <St.ChartWrapper>
                            <DoughnutChart
                                period={filterPeriod || null}
                                startDate={startDate}
                                endDate={endDate}
                            />
                        </St.ChartWrapper>
                        <div className="category-wrapper">
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
                                            <h5>
                                                {formatNumber(chartData[index])}
                                                원
                                            </h5>
                                        </div>
                                    </St.Category>
                                ))}
                        </div>
                    </div>
                </St.ChartContainer>
            </St.ChartSection>
            <St.DetailSection>
                <St.DetailHeader>
                    <div
                        className="header-content"
                        onClick={() => navigate(AppPaths.EXPENSE_FILTER)}
                        style={{ cursor: "pointer" }}
                    >
                        <span className="filter-text">전체 내역</span>
                        <St.IconWrapper />
                    </div>
                    <div className="header-content">
                        <Add />
                        <Remove />
                    </div>
                </St.DetailHeader>
                <St.DetailBody>
                    <St.Detail>
                        {expenseData &&
                            Object.keys(expenseData).length > 0 &&
                            Object.entries(expenseData).map(
                                ([key, value], index, array) => (
                                    <React.Fragment key={key}>
                                        <div
                                            className="detail-header"
                                            key={index}
                                        >
                                            <span>
                                                {formatDate(new Date(key))}
                                            </span>
                                            {/* <span className="total">-51,500원</span> */}
                                        </div>
                                        <div className="bar" />
                                        <St.DetailContentWrapper>
                                            {value.map((item, index) => (
                                                <St.DetailContent
                                                    key={index}
                                                    ref={
                                                        index ===
                                                            array.length - 1 &&
                                                        index ===
                                                            value.length - 1
                                                            ? lastExpenseElementRef
                                                            : null
                                                    }
                                                    onClick={() => {
                                                        const state = isMedical(
                                                            item
                                                        )
                                                            ? {
                                                                  medicalExpenseId:
                                                                      item.medicalExpenseId,
                                                              }
                                                            : {
                                                                  purchaseId:
                                                                      item.purchaseId,
                                                              };

                                                        navigate(
                                                            AppPaths.EXPENSE_ITEM,
                                                            {
                                                                state,
                                                            }
                                                        );
                                                    }}
                                                >
                                                    {isMedical(item) ? (
                                                        <>
                                                            <div className="content-left">
                                                                <div className="item-img">
                                                                    <Medical />
                                                                </div>
                                                                <div className="item-detail">
                                                                    <span
                                                                        style={{
                                                                            fontWeight:
                                                                                "400",
                                                                        }}
                                                                    >
                                                                        {
                                                                            item.diseaseName
                                                                        }
                                                                    </span>
                                                                    <span
                                                                        style={{
                                                                            color: "var(--color-gray)",
                                                                        }}
                                                                    >
                                                                        {
                                                                            item.hospital
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="item-content">
                                                                <span className="total">
                                                                    -
                                                                    {formatNumber(
                                                                        item.cost
                                                                    )}
                                                                    원
                                                                </span>
                                                                <div>
                                                                    <div
                                                                        className="circle"
                                                                        style={{
                                                                            backgroundColor:
                                                                                labelColorMap[
                                                                                    item
                                                                                        .kind
                                                                                ] ||
                                                                                "#ffffff",
                                                                        }}
                                                                    />
                                                                    <span>
                                                                        {
                                                                            item.kind
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="content-left">
                                                                <div className="item-img">
                                                                    {item.img ? (
                                                                        <img
                                                                            src={
                                                                                item.img
                                                                            }
                                                                            alt={
                                                                                item.title
                                                                            }
                                                                            style={{
                                                                                width: "2.5rem",
                                                                                height: "2.5rem",
                                                                                borderRadius:
                                                                                    "50%",
                                                                            }}
                                                                        />
                                                                    ) : item.category ===
                                                                      "장난감" ? (
                                                                        <div className="item-img">
                                                                            <Toy />
                                                                        </div>
                                                                    ) : item.category ===
                                                                      "사료" ? (
                                                                        <div className="item-img">
                                                                            <Feed />
                                                                        </div>
                                                                    ) : item.category ===
                                                                      "간식" ? (
                                                                        <div className="item-img">
                                                                            <Snack />
                                                                        </div>
                                                                    ) : (
                                                                        <div className="item-img">
                                                                            <Supplies />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div className="item-detail">
                                                                    <span
                                                                        style={{
                                                                            display:
                                                                                "inline-block",
                                                                            width: "14rem",
                                                                            fontWeight:
                                                                                "400",
                                                                            whiteSpace:
                                                                                "nowrap", // 텍스트가 줄바꿈되지 않도록 설정
                                                                            overflow:
                                                                                "hidden", // 넘치는 텍스트는 보이지 않도록 설정
                                                                            textOverflow:
                                                                                "ellipsis", // 넘치는 텍스트에 말줄임표 추가
                                                                        }}
                                                                    >
                                                                        {
                                                                            item.title
                                                                        }
                                                                    </span>
                                                                    <span
                                                                        style={{
                                                                            display:
                                                                                "flex",
                                                                            gap: "0.3rem",
                                                                        }}
                                                                    >
                                                                        {item.option && (
                                                                            <>
                                                                                <span
                                                                                    style={{
                                                                                        color: "var(--color-gray)",
                                                                                    }}
                                                                                >
                                                                                    옵션:
                                                                                    {
                                                                                        item.option
                                                                                    }
                                                                                </span>
                                                                                <span>
                                                                                    |
                                                                                </span>
                                                                            </>
                                                                        )}
                                                                        <span>
                                                                            {
                                                                                item.quantity
                                                                            }
                                                                            개
                                                                        </span>
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className="item-content">
                                                                <span className="total">
                                                                    -{item.cost}
                                                                    원
                                                                </span>
                                                                <div>
                                                                    <div
                                                                        className="circle"
                                                                        style={{
                                                                            backgroundColor:
                                                                                labelColorMap[
                                                                                    item
                                                                                        .category
                                                                                ] ||
                                                                                "#ffffff",
                                                                        }}
                                                                    />
                                                                    <span>
                                                                        {
                                                                            item.category
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </>
                                                    )}
                                                </St.DetailContent>
                                            ))}
                                        </St.DetailContentWrapper>
                                    </React.Fragment>
                                )
                            )}
                        {loading && <Loading />}
                    </St.Detail>
                </St.DetailBody>
            </St.DetailSection>
        </St.Container>
    );
};

export default ExpenseDetail;
