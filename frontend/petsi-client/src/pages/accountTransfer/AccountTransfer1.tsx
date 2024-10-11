import Loading from "@/components/ui/_loading/Loading";
import { bottomState, headerState } from "@/stores/useNavigationStore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import * as St from "./AccountTransfer.style";
import Dropdown from "@/components/ui/_dropdown/Dropdown";
import { bankList } from "@/shared/constants/bankList";
import Input from "@/components/ui/_input/Input";
import Container from "@/components/ui/_container/Container";
import { transferInfoState } from "@/stores/useTransferStore";
import { checkAccountHolder } from "@/services/accountServices";

const AccountTransfer = () => {
    const setHeaderState = useSetRecoilState(headerState);
    const setBottomState = useSetRecoilState(bottomState);

    const [destinationAccount, setDestinationAccount] = useState("");

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    const { accountId } = useParams();

    const setTransferInfo = useSetRecoilState(transferInfoState);
    const resetTransferInfo = useResetRecoilState(transferInfoState);

    // 렌더링 될 때마다 받는 이체 정보 초기화
    useEffect(() => {
        resetTransferInfo();
    }, [resetTransferInfo]);

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
    }, [setHeaderState, setBottomState, resetTransferInfo, accountId]);

    const handleBankSelect = (val: string) => {
        setTransferInfo((prev) => ({
            ...prev,
            transferBank: val,
        }));
    };

    const handleAccountNumber = (val: string) => {
        setDestinationAccount(val);
    };

    const handleNext = async () => {
        try {
            const response = await checkAccountHolder("9991988005402710"); // 테스트용 수신계좌 하드코딩

            if (response?.status === 200) {
                setTransferInfo((prev) => ({
                    ...prev,
                    transferBank: response.data.bankName,
                    destinationAccountNo: response.data.accountNo,
                    destinationAccountHolder: response.data.name,
                }));
            }

            navigate(`/account/${accountId}/transfer2`);
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <St.Container>
            <St.InputContainer>
                <St.InputTitle>
                    <span>*</span>
                    <h4>이체할 은행을 골라주세요</h4>
                </St.InputTitle>
                <Dropdown
                    border={true}
                    optionList={bankList.map((bank) => bank.bankName)}
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
                    value={destinationAccount}
                    onChange={handleAccountNumber}
                />
            </St.InputContainer>
            <div onClick={handleNext}>
                <Container color="yellow" shadow={true}>
                    다음
                </Container>
            </div>
        </St.Container>
    );
};

export default AccountTransfer;
