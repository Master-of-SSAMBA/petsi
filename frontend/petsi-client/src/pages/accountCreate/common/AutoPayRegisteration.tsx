import { newAccountInfoState } from "@/stores/useCreateAccountStore";
import * as St from "./Common.style";
import Container from "@/components/ui/_container/Container";
import { useEffect, useState } from "react";
import Loading from "@/components/ui/_loading/Loading";
import Dropdown from "@/components/ui/_dropdown/Dropdown";
import { bankList } from "@/shared/constants/bankList";
import Input from "@/components/ui/_input/Input";
import { createAccountWithAutoTransfer } from "@/services/accountServices";
import { useRecoilState } from "recoil";

interface StepProps {
    nextStep: () => void;
    prevStep: () => void;
}

const AutoPayRegisteration = ({ nextStep, prevStep }: StepProps) => {
    const [loading, setLoading] = useState(true);
    const [accountNumber, setAccountNumber] = useState("");
    const [cycleDay, setCycleDay] = useState(10);
    const [amount, setAmount] = useState(100000);
    const [isSent, setisSent] = useState(false);
    const [authName, setAuthName] = useState("");
    const [isBlock, setIsBlock] = useState(true);

    const [newAccountInfo, setNewAccountInfo] =
        useRecoilState(newAccountInfoState);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // 1원 인증 입력 값의 길이가 3이 아니면 isBlock을 true로 설정
        if (authName.length === 3) {
            setIsBlock(false);
        } else {
            setIsBlock(true);
        }
    }, [authName]);

    const handleConfirm = async () => {
        setNewAccountInfo((prev) => ({
            ...prev,
            isAuto: true,
        }));

        const updatedInfo = {
            ...newAccountInfo,
            isAuto: true,
        };

        try {
            await createAccountWithAutoTransfer(updatedInfo);
        } catch (error) {
            console.error(error);
        }

        nextStep();
    };

    const handlePrev = () => {
        prevStep();
    };

    const handleBankSelect = (selectedBank: string) => {
        setNewAccountInfo((prev) => ({
            ...prev,
            bank: selectedBank,
        }));
    };

    const handleAccountNumber = (val: string) => {
        setAccountNumber(val);
        setNewAccountInfo((prev) => ({
            ...prev,
            accountNo: accountNumber,
        }));
    };
    const handleCycleDay = (val: string) => {
        setCycleDay(Number(val));
        setNewAccountInfo((prev) => ({
            ...prev,
            nextTransactionDay: cycleDay,
        }));
    };
    const handleAmount = (val: string) => {
        setAmount(Number(val));
        setNewAccountInfo((prev) => ({
            ...prev,
            amount: amount,
        }));
    };

    // api 연결해야 함
    const handleSend1wonAuth = () => setisSent(true);
    const handleAuthName = (val: string) => setAuthName(val);

    if (loading) {
        return <Loading />;
    }

    return (
        <St.MainContainer>
            <St.InputContainer>
                <St.InputTitle>
                    <span>*</span>
                    <h4>자동이체 설정할 은행을 골라주세요</h4>
                </St.InputTitle>
                <Dropdown
                    border={true}
                    optionList={bankList.map((bank) => {
                        return bank.bankName;
                    })}
                    onChange={handleBankSelect}
                    searchFunc={true}
                />
            </St.InputContainer>
            <St.InputContainer>
                <St.InputTitle>
                    <span>*</span>
                    <h4>계좌번호를 입력해주세요</h4>
                </St.InputTitle>
                <Input
                    type="number"
                    value={accountNumber}
                    onChange={handleAccountNumber}
                />
            </St.InputContainer>
            <St.InputContainer>
                <St.InputTitle>
                    <span>*</span>
                    <h4>자동이체 일자와 금액을 설정해주세요</h4>
                </St.InputTitle>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                    }}
                >
                    <Input
                        type="number"
                        value={cycleDay.toString()}
                        onChange={handleCycleDay}
                        label="자동이체 날짜 (일)"
                    />
                    <Input
                        type="number"
                        value={amount.toString()}
                        onChange={handleAmount}
                        label="자동이체금액 (원)"
                    />
                </div>
            </St.InputContainer>

            <St.ButtonContainer
                onClick={handleSend1wonAuth}
                style={{ display: "flex", justifyContent: "flex-end" }}
            >
                <div
                    onClick={handleSend1wonAuth}
                    style={{ display: "inline-block" }} // 클릭 영역을 버튼 크기로 제한
                >
                    {/* 1원 송금 api 연결 해야함 */}
                    <Container
                        color="beige"
                        shadow={true}
                        style={{ width: 180 }}
                    >
                        1원 송금하기
                    </Container>
                </div>
            </St.ButtonContainer>

            {isSent && (
                <St.InputContainer>
                    <h3 style={{ marginBottom: 10 }}>
                        계좌에 1원을 송금했습니다
                    </h3>
                    <St.InputTitle>
                        <span>*</span>
                        <h4>
                            계좌의 거래 내역에서 <br /> 입금된 1원에 있는 3자리
                            숫자를 확인해주세요
                        </h4>
                    </St.InputTitle>
                    <Input
                        type="text"
                        value={authName}
                        onChange={handleAuthName}
                    />
                </St.InputContainer>
            )}

            <div>
                <St.ButtonContainer
                    onClick={!isBlock ? handleConfirm : undefined}
                >
                    <Container
                        color={isBlock ? "gray" : "yellow"}
                        shadow={true}
                    >
                        자동이체 설정 완료
                    </Container>
                </St.ButtonContainer>
                <St.ButtonContainer onClick={handlePrev}>
                    <Container color="lightgray" shadow={true}>
                        이전으로
                    </Container>
                </St.ButtonContainer>
            </div>
        </St.MainContainer>
    );
};

export default AutoPayRegisteration;
