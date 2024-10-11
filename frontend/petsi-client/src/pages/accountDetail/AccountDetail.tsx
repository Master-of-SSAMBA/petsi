import { useParams, useLocation, useNavigate } from "react-router-dom";
import * as St from "./AccountDetail.style";
import { useEffect, useState, useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { bottomState, headerState } from "@/stores/useNavigationStore";
import Container from "@/components/ui/_container/Container";
import { useFormatAccountNo } from "@/hooks/useFormatAccountNo";
import AccountHistory from "./AccountHistory";
import { getAccountDetailInfo } from "@/services/accountServices";
import Loading from "@/components/ui/_loading/Loading";

interface Pet {
    petId: number;
    petName: string;
    petImg: string;
}

interface AccountDetailInfo {
    accountId: number;
    accountNo: string;
    accountName: string;
    balance: number;
    createDdays: number;
    expireDdays: number;
    currentMonthlyInterest: number;
    expireDate: string;
    petList: Pet[];
}

const AccountDetail = () => {
    const setHeaderState = useSetRecoilState(headerState);
    const setBottomState = useSetRecoilState(bottomState);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    const location = useLocation();
    const { backgroundColor } = location.state;

    const [accountDetailInfo, setAccountDetailInfo] =
        useState<AccountDetailInfo | null>(null);

    // sortOption 기본 값은 1개월
    const [sortOption, setSortOption] = useState<number | null>(7);

    const { formatAccountNo } = useFormatAccountNo();

    // useParams를 사용하여 accountId를 가져옴
    const { accountId } = useParams();

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
            right: "setting",
            text: accountDetailInfo?.accountName || "",
            isVisible: true,
            color: backgroundColor,
            rightPath: `/account/${accountId}/setting`,
        });
        setBottomState({
            isVisible: true,
            activePage: "Account",
        });
    }, [
        accountDetailInfo,
        setHeaderState,
        setBottomState,
        backgroundColor,
        accountId,
    ]);

    // 드롭다운 옵션 선택 시 호출되는 함수
    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (value === "1") {
            setSortOption(1); // 하루
        } else if (value === "7") {
            setSortOption(7); // 최근 일주일
        } else if (value === "30") {
            setSortOption(30); // 최근 한달
        } else if (value === "0") {
            setSortOption(0); // 전체
        }
    };

    const navigate = useNavigate();

    const handleClick = (path: string) => {
        if (path) {
            navigate(path);
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <St.Container color={backgroundColor}>
            <St.AccountHeader>
                <St.AccountNum>
                    {accountDetailInfo
                        ? formatAccountNo(accountDetailInfo?.accountNo)
                        : ""}
                </St.AccountNum>
                <h1>{accountDetailInfo?.balance.toLocaleString()}원</h1>
            </St.AccountHeader>
            <Container color="white" shadow={true} style={{ margin: "2rem 0" }}>
                <St.InnerContiner>
                    <p>
                        {accountDetailInfo?.petList.map((pet, index) => (
                            <span key={pet.petId}>
                                {pet.petName}
                                {index < accountDetailInfo.petList.length - 1 &&
                                    ", "}
                            </span>
                        ))}
                        와 함께 모은지 {accountDetailInfo?.createDdays}일이
                        되었어요
                        <br />
                        목표를 이루기까지 {accountDetailInfo?.expireDdays}
                        일이 남았어요
                    </p>
                    <St.SubDescription>
                        <St.SubDescriptionItem>
                            <h5>이번달 적용 금리</h5>
                            <h4>
                                {1 +
                                    (accountDetailInfo?.currentMonthlyInterest ??
                                        0) *
                                        0.1}
                                %
                            </h4>
                        </St.SubDescriptionItem>
                        <St.SubDescriptionItem>
                            <h5>만기일</h5>
                            <h4>{accountDetailInfo?.expireDate}</h4>
                        </St.SubDescriptionItem>
                    </St.SubDescription>
                    <St.ButtonContainer>
                        <St.BankingButton
                            color={backgroundColor}
                            onClick={() =>
                                handleClick(`/account/${accountId}/transfer1`)
                            }
                        >
                            <h5>이체하기</h5>
                        </St.BankingButton>
                    </St.ButtonContainer>
                </St.InnerContiner>
            </Container>

            {/*거래 내역 기간 필터*/}
            <St.FilterContainer>
                <St.Select onChange={handleFilterChange} defaultValue="7">
                    <St.Option value="1">하루</St.Option>
                    <St.Option value="7">최근 1주일</St.Option>
                    <St.Option value="30">최근 1개월</St.Option>
                    <St.Option value="0">전체 내역</St.Option>
                </St.Select>
            </St.FilterContainer>

            {/* 거래 내역 불러오기 - sortOption에 따라 달라짐 */}
            <AccountHistory
                accountId={Number(accountId)}
                sortOption={Number(sortOption)}
            />
        </St.Container>
    );
};

export default AccountDetail;
