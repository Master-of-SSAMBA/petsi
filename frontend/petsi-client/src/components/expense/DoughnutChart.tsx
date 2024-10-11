import { fetchChartExpense } from "@/services/expenseServices";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

interface ChartProps {
    period?: string;
    startDate?: string;
    endDate?: string;
}

export const DoughnutChart = ({ period, startDate, endDate }: ChartProps) => {
    const [chartLabels, setChartLabels] = useState<string[]>([]);
    const [chartData, setChartData] = useState<number[]>([]);

    useEffect(() => {
        const fetchChartData = async () => {
            const res = await fetchChartExpense(period, startDate, endDate);
            const { labels, datas } = res.costs;
            if (labels && datas) {
                setChartLabels(labels);
                setChartData(datas);
            }
        };
        fetchChartData();
    }, [endDate, period, startDate]);

    const data = {
        labels: chartLabels,
        datasets: [
            {
                label: "이번 달 소비 항목",
                data: chartData,
                backgroundColor: [
                    "#FF6384",
                    "#FF9F40",
                    "#FFCD56",
                    "#4BC0C0",
                    "#36A2EB",
                    "#9585F1",
                ],
                borderColor: ["white", "white"],
                borderWidth: 0.5,
            },
        ],
    };

    return <Doughnut data={data} />;
};
