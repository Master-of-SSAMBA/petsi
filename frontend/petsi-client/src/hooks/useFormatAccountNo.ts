import { useCallback } from "react";

// Custom hook to format a 16-character account number as 4-7-5
export const useFormatAccountNo = () => {
    const formatAccountNo = useCallback((accountNo: string): string => {
        if (accountNo.length !== 16) {
            return accountNo; // 16자리가 아니면 그대로 반환
        }

        const part1 = accountNo.slice(0, 4);
        const part2 = accountNo.slice(4, 10);
        const part3 = accountNo.slice(10);
        return `${part1}-${part2}-${part3}`;
    }, []);

    return { formatAccountNo };
};
