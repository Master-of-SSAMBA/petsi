import { useCallback, useEffect, useState } from "react";
import * as St from "./AccountHistory.style";
import Container from "@/components/ui/_container/Container";
import { getAccountHistory } from "@/services/accountServices";

interface TransactionHistory {
    transactionUniqueNo: number;
    transactionDate: {
        date: string;
        time: string;
    };
    title: string;
    transactionType: string;
    transactionAmount: number;
    transactionAfterBalance: number;
    transactionSummary: string;
}

interface AccountProps {
    accountId: number;
    sortOption: number;
    page?: number;
}

const AccountHistory = (props: AccountProps) => {
    const { accountId, sortOption, page = 0 } = props;
    const [transactionHistory, setTransactionHistory] = useState<
        TransactionHistory[] | null
    >(null);

    const fetchAccountHistory = useCallback(async () => {
        if (!accountId) return;

        try {
            const data = await getAccountHistory(
                Number(accountId),
                Number(sortOption),
                Number(page)
            );
            setTransactionHistory(data);
        } catch (error) {
            console.error("거래 내역을 가져오는 중 오류 발생:", error);
        }
    }, [accountId, sortOption, page]);

    useEffect(() => {
        fetchAccountHistory(); // 계좌 거래 내역을 불러오는 비동기 함수 호출
    }, [fetchAccountHistory]);

    return (
        <St.HistoryContainer>
            {transactionHistory?.length ? (
                transactionHistory.map((transaction: TransactionHistory) => (
                    <Container
                        color="white"
                        shadow={false}
                        key={transaction.transactionUniqueNo}
                        style={{ padding: "1rem" }}
                    >
                        <St.HistoryItem>
                            <div className="date">
                                <p>{transaction.transactionDate.date}</p>
                                <p>{transaction.transactionDate.time}</p>
                            </div>
                            <div className="historyData">
                                <h4>{transaction.transactionType}</h4>
                                <h5>{transaction.transactionSummary}</h5>
                            </div>
                            <div className="moneydata">
                                <h4>
                                    {transaction.transactionAmount.toLocaleString()}
                                    원
                                </h4>
                                <h5 className="balance">
                                    잔액:{" "}
                                    {transaction.transactionAfterBalance.toLocaleString()}
                                    원
                                </h5>
                            </div>
                        </St.HistoryItem>
                    </Container>
                ))
            ) : (
                <p>거래 내역이 없습니다.</p>
            )}
        </St.HistoryContainer>
    );
};

export default AccountHistory;
