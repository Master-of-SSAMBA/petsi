import { bottomState, headerState } from "@/stores/useNavigationStore";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { useParams } from "react-router-dom";
import { newAccountInfoState } from "@/stores/useCreateAccountStore";

import AutoPayRegisteration from "./common/AutoPayRegisteration";
import ReqDocs from "./common/ReqDocs";
import SetAccountInfo from "./common/SetAccountInfo";
import CreateComplete from "./common/CreateComplete";

const AccountCreate = () => {
    const setHeaderState = useSetRecoilState(headerState);
    const setBottomState = useSetRecoilState(bottomState);

    const setNewAccountInfo = useSetRecoilState(newAccountInfoState);

    const [step, setStep] = useState(1);

    const { productId } = useParams();

    useEffect(() => {
        setHeaderState({
            left: "null",
            right: "null",
            text: "계좌 개설",
            isVisible: true,
            color: "white",
        });
        setBottomState({
            isVisible: false,
        });
        setNewAccountInfo((prev) => ({
            ...prev,
            accountProductId: Number(productId),
        }));
    }, [setHeaderState, setBottomState, setNewAccountInfo, productId]);

    const nextStep = () => {
        setStep((prevStep) => prevStep + 1);
    };

    const skipAutoPayStep = () => {
        setStep((prevStep) => prevStep + 2);
    };

    const prevStep = () => {
        setStep((prevStep) => prevStep - 1);
    };

    return (
        <div>
            {step === 1 && <ReqDocs nextStep={nextStep} />}
            {step === 2 && (
                <SetAccountInfo
                    nextStep={nextStep}
                    skipAutoPayStep={skipAutoPayStep}
                    prevStep={prevStep}
                />
            )}
            {step === 3 && (
                <AutoPayRegisteration nextStep={nextStep} prevStep={prevStep} />
            )}
            {step === 4 && <CreateComplete />}
        </div>
    );
};

export default AccountCreate;
