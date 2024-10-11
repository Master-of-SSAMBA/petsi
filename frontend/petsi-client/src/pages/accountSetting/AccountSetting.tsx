import { useFormatAccountNo } from "@/hooks/useFormatAccountNo";
import { headerState } from "@/stores/useNavigationStore";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import * as St from "./AccountSetting.style";
import { getAccountDetailInfo } from "@/services/accountServices";

interface AccountDetailInfo {
    accountId: number;
    accountNo: string;
    accountName: string;
    balance: number;
    expireDate: string;
}

const AccountSetting = () => {
    const setHeaderState = useSetRecoilState(headerState);

    const [accountDetailInfo, setAccountDetailInfo] =
        useState<AccountDetailInfo | null>(null);

    // useParams를 사용하여 accountId를 가져옴
    const { accountId } = useParams();

    const { formatAccountNo } = useFormatAccountNo();

    const fetchAccountDetailInfo = useCallback(async () => {
        if (!accountId) return;

        try {
            const data = await getAccountDetailInfo(Number(accountId)); // 분리된 서비스에서 데이터 가져오기
            setAccountDetailInfo(data);
        } catch (error) {
            console.error("계좌 상세 정보를 가져오는 중 오류 발생:", error);
        }
    }, [accountId]);

    // 컴포넌트가 처음 마운트될 때 계좌 정보를 가져오는 비동기 호출
    useEffect(() => {
        fetchAccountDetailInfo();
    }, [fetchAccountDetailInfo]);

    useEffect(() => {
        setHeaderState({
            left: "backArrow",
            right: "null",
            text: "계좌 관리",
            isVisible: true,
            color: "beige",
        });
    }, [accountDetailInfo, setHeaderState]);

    return (
        <St.Container>
            <h1>{accountDetailInfo?.accountName}</h1>
            <St.InnerContainer>
                <St.InfoRow>
                    <h4>계좌번호</h4>
                    {accountDetailInfo
                        ? formatAccountNo(accountDetailInfo?.accountNo)
                        : ""}
                </St.InfoRow>
                <St.InfoRow>
                    <h4>기본 금리</h4>
                    <p>1.0 %</p>
                </St.InfoRow>
                <St.InfoRow>
                    <h4>출금 가능 금액</h4>
                    <p>{accountDetailInfo?.balance.toLocaleString()} 원</p>
                </St.InfoRow>
                <St.InfoRow>
                    <h4>만기 일자</h4>
                    <p>{accountDetailInfo?.expireDate}</p>
                </St.InfoRow>
            </St.InnerContainer>
            <St.InnerContainer>
                <h3>통장사본 발급하기</h3>
                <h3>거래내역 발급하기</h3>
                <h3>가입서류 발급하기</h3>
            </St.InnerContainer>
            <St.InnerContainer>
                <h3>계좌 비밀번호 재설정</h3>
            </St.InnerContainer>
            <St.InnerContainer>
                <h3>계좌 해지하기</h3>
            </St.InnerContainer>
        </St.Container>
    );
};

export default AccountSetting;
