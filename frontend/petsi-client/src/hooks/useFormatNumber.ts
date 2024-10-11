export const formatNumber = (value: number): string => {
    return new Intl.NumberFormat("ko-KR", {
        style: "decimal",
        minimumFractionDigits: 0, // 소숫점 자릿수 최소 0
        maximumFractionDigits: 0, // 소숫점 자릿수 최대 0
    }).format(value);
};
