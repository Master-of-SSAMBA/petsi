import { newAccountInfoState } from "@/stores/useCreateAccountStore";
import * as St from "./Common.style";
import Container from "@/components/ui/_container/Container";
import { useParams } from "react-router-dom";
import { Docs as FreeSavingDocs } from "../freeSaving/Docs";
import { useEffect, useState } from "react";
import Loading from "@/components/ui/_loading/Loading";
import { AppPaths } from "@/interfaces/AppPaths";
import { useSetRecoilState } from "recoil";

interface StepProps {
    nextStep: () => void;
}

const ReqDocs = ({ nextStep }: StepProps) => {
    const { productId } = useParams();
    const [loading, setLoading] = useState(true);

    const setNewAccountInfo = useSetRecoilState(newAccountInfoState);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const handleAgree = () => {
        setNewAccountInfo((prev) => ({
            ...prev,
            hasReadRequiredDocuments: true,
            accountProductId: Number(productId),
        }));
        nextStep(); // 다음 단계로 이동
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <St.MainContainer>
            {/* url의 productId로 렌더링할 약관 결정 */}
            {productId === "0" ? <FreeSavingDocs /> : null}
            <div>
                <St.ButtonContainer onClick={handleAgree}>
                    <Container color="yellow" shadow={true}>
                        약관 동의하기
                    </Container>
                </St.ButtonContainer>
                <St.ButtonContainer onClick={handleAgree}>
                    <Container
                        color="lightgray"
                        shadow={true}
                        path={AppPaths.ACCOUNT}
                    >
                        홈으로 돌아가기
                    </Container>
                </St.ButtonContainer>
            </div>
        </St.MainContainer>
    );
};

export default ReqDocs;
