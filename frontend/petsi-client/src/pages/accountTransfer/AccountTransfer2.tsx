import { useRecoilState, useSetRecoilState } from "recoil";
import { transferInfoState } from "@/stores/useTransferStore";
import * as St from "./AccountTransfer.style";
import { bottomState, headerState } from "@/stores/useNavigationStore";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
    checkPassword,
    getAccountDetailInfo,
    submitTransfer,
} from "@/services/accountServices";
import Loading from "@/components/ui/_loading/Loading";
import Keypad from "@/components/ui/_keypad/KeyPad";
import Container from "@/components/ui/_container/Container";
import Input from "@/components/ui/_input/Input";
import PasswordKeypad from "@/components/ui/_passwordKeypad/PasswordKeypad";

interface AccountDetailInfo {
    accountId: number;
    accountNo: string;
    accountName: string;
    balance: number;
    createDdays: number;
    expireDdays: number;
    currentMonthlyInterest: number;
    expireDate: string;
}

const AccountTransferStep2 = () => {
    const [transferInfo, setTransferInfo] = useRecoilState(transferInfoState);
    const setHeaderState = useSetRecoilState(headerState);
    const setBottomState = useSetRecoilState(bottomState);

    const [isAmountEntered, setIsAmountEntered] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(true);
    const [inputValue, setInputValue] = useState("");
    const [password, setPassword] = useState("");
    const [isKeypadOpen, setIsKeypadOpen] = useState(false);
    const [isError, setIsError] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    const [accountDetailInfo, setAccountDetailInfo] =
        useState<AccountDetailInfo | null>(null);

    const { accountId } = useParams();
    const accountIdNum = Number(accountId);

    const fetchAccountDetailInfo = useCallback(async () => {
        if (isNaN(accountIdNum)) {
            console.error("잘못된 계좌 ID:", accountId);
            return;
        }

        try {
            const data = await getAccountDetailInfo(accountIdNum);
            setAccountDetailInfo(data);
        } catch (error) {
            console.error("계좌 상세 정보를 가져오는 중 오류 발생:", error);
        }
    }, [accountIdNum, accountId]);

    useEffect(() => {
        fetchAccountDetailInfo();
    }, [fetchAccountDetailInfo]);

    useEffect(() => {
        setHeaderState({
            left: "backArrow",
            right: "",
            text: "이체",
            isVisible: true,
            color: "beige",
        });
        setBottomState({
            isVisible: false,
        });
    }, [accountDetailInfo, setHeaderState, setBottomState, accountId]);

    const handleAmountChange = (val: string) => {
        const formattedVal = val.replace(/[^0-9]/g, "");
        const amount = parseFloat(formattedVal) || 0;
        setInputValue(amount.toLocaleString());
        setTransferInfo((prev) => ({
            ...prev,
            amount,
        }));

        // 금액 입력 및 잔액보다 큰지 확인
        if (
            amount > 0 &&
            accountDetailInfo &&
            amount <= accountDetailInfo.balance
        ) {
            setIsButtonDisabled(false); // 버튼 활성화
        } else {
            setIsButtonDisabled(true); // 버튼 비활성화
        }
    };

    const handleKeypadClick = (val: string) => {
        const newValue = inputValue + val;
        handleAmountChange(newValue);
    };

    const handleKeyPadClear = () => {
        setInputValue("");
        const amount = 0;
        setTransferInfo((prev) => ({
            ...prev,
            amount,
        }));

        setIsButtonDisabled(true); // 버튼 비성화
    };

    const handleNumberClick = (val: string) => {
        if (password.length < 4) {
            const newPassword = password + val;
            setPassword(newPassword);

            // 비밀번호가 4자리일 때 자동으로 확인
            if (newPassword.length === 4) {
                verifyPasswordAndTransfer(newPassword);
            }
        }
    };

    const verifyPasswordAndTransfer = async (inputPassword: string) => {
        try {
            const passwordValid = await checkPassword(
                accountIdNum,
                accountDetailInfo?.accountNo || "",
                inputPassword
            );
            if (passwordValid) {
                await handleTransfer(); // 비밀번호가 맞으면 이체 실행
            } else {
                setIsError(true);
                setPassword(""); // 비밀번호 초기화
            }
        } catch (error) {
            console.error("비밀번호 확인 중 오류 발생:", error);
        }
    };

    const handleClearClick = () => {
        setPassword(""); // 비밀번호 초기화
    };

    const handleTransfer = async () => {
        const amount = parseFloat(inputValue.replace(/[^0-9]/g, "")) || 0;
        setTransferInfo((prev) => ({
            ...prev,
            amount,
        }));

        try {
            await submitTransfer(accountIdNum, { ...transferInfo, amount });
            navigate(`/account/${accountId}/transfer3`, { replace: true });
        } catch (error) {
            console.error("이체 중 오류 발생:", error);
        }
    };

    const handleDestinationDescription = (val: string) => {
        setTransferInfo((prev) => ({
            ...prev,
            destinationDescription: val,
        }));
    };

    const handleDescription = (val: string) => {
        setTransferInfo((prev) => ({
            ...prev,
            description: val,
        }));
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <St.CenteredContainer>
            <St.DestinationContainer>
                <p>{transferInfo.transferBank}</p>
                <p>{transferInfo.destinationAccountNo}</p>
            </St.DestinationContainer>
            <h3 style={{ width: "100%", textAlign: "left" }}>
                얼마를 보낼까요?
            </h3>

            <St.AmountContainer>
                <h1>{inputValue || "보낼 금액"}</h1>
                <h1>{inputValue && "원"}</h1>
            </St.AmountContainer>

            {!isAmountEntered ? (
                <St.InnerContainer>
                    <St.InputContainer>
                        <St.InputTitle style={{ justifyContent: "center" }}>
                            <p>현재 잔액</p>
                            <h4>
                                {accountDetailInfo?.balance.toLocaleString()}
                            </h4>{" "}
                            원
                        </St.InputTitle>
                    </St.InputContainer>

                    <Keypad
                        onNumberClick={handleKeypadClick}
                        onClearClick={handleKeyPadClear}
                    />
                    <St.ButtonContainer>
                        <div
                            onClick={
                                !isButtonDisabled
                                    ? () => setIsAmountEntered(true)
                                    : undefined
                            }
                        >
                            <Container
                                color={isButtonDisabled ? "gray" : "yellow"}
                                shadow={true}
                            >
                                다음
                            </Container>
                        </div>
                        <div onClick={() => navigate(-1)}>
                            <Container color="lightgray" shadow={true}>
                                뒤로가기
                            </Container>
                        </div>
                    </St.ButtonContainer>
                </St.InnerContainer>
            ) : (
                <St.InnerContainer isVisible={isAmountEntered}>
                    <St.InputContainer>
                        <St.InputTitle style={{ justifyContent: "center" }}>
                            <p>현재 잔액</p>
                            <h4>
                                {accountDetailInfo?.balance.toLocaleString()}
                            </h4>{" "}
                            원
                        </St.InputTitle>
                    </St.InputContainer>
                    <Input
                        type="text"
                        value={transferInfo.destinationDescription || ""}
                        onChange={handleDestinationDescription}
                        placeholder={"받는 분 메모"}
                        maxLength={10}
                    />
                    <Input
                        type="text"
                        value={transferInfo.description || ""}
                        onChange={handleDescription}
                        placeholder={"내 통장 메모"}
                        maxLength={10}
                    />
                    <St.ButtonContainer>
                        <div
                            onClick={
                                !isButtonDisabled
                                    ? () => setIsKeypadOpen(true)
                                    : undefined
                            }
                        >
                            <Container
                                color={
                                    isButtonDisabled ? "lightgray" : "yellow"
                                }
                                shadow={true}
                            >
                                이체
                            </Container>
                        </div>
                        <div
                            onClick={() => setIsAmountEntered(!isAmountEntered)}
                        >
                            <Container color="lightgray" shadow={true}>
                                뒤로가기
                            </Container>
                        </div>
                    </St.ButtonContainer>

                    <PasswordKeypad
                        onNumberClick={handleNumberClick}
                        onClearClick={handleClearClick}
                        isOpen={isKeypadOpen}
                        isError={isError}
                        onClose={() => {
                            setIsKeypadOpen(!isKeypadOpen);
                            setIsError(false);
                        }}
                        passwordLength={password.length}
                    />
                </St.InnerContainer>
            )}
        </St.CenteredContainer>
    );
};

export default AccountTransferStep2;
