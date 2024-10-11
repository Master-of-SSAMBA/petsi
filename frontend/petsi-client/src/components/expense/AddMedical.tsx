import * as St from "@/pages/expense/expenseAdd/ExpenseAdd.style";
import { useState } from "react";
import OptionInput from "../ui/_input/OptionInput";
import { submitMedicalExpenseData } from "@/services/expenseServices";
import { useNavigate } from "react-router-dom";
import { AppPaths } from "@/interfaces/AppPaths";
import PetNav from "../pet-navigation/PetNav";

const AddMedical = () => {
    const navigate = useNavigate();
    const [selectedPetId, setSelectedPetId] = useState<number | null>(null);
    const [disease, setDisease] = useState<string>("");
    const [cost, setCost] = useState<string>("");
    const [hospital, setHospital] = useState<string>("");
    const [visitedAt, setVisitedAt] = useState<string>("");
    const [memo, setMemo] = useState<string>("");
    const [valid, setValid] = useState<boolean>(false);

    const isFormValid = () => {
        return (
            disease !== "" &&
            cost !== "" &&
            visitedAt !== "" &&
            hospital !== "" &&
            selectedPetId !== null
        );
    };

    const clickSubmitButton = async () => {
        if (!isFormValid()) return;

        try {
            const data = {
                petId: selectedPetId,
                diseaseName: disease,
                cost,
                visitedAt,
                hospital,
                ...(memo !== "" && { memo }),
            };

            const res = await submitMedicalExpenseData(data);

            if (res) {
                navigate(AppPaths.EXPENSE);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleSelectedPet = (newPetId: number) => {
        setSelectedPetId((prevSelectedPetId) =>
            prevSelectedPetId === newPetId ? null : newPetId
        );
        setValid(isFormValid());
    };

    return (
        <>
            <St.OutletContainer>
                <span>* 누가 아팠나요?</span>
                <div style={{ margin: "1rem 0" }}>
                    <PetNav
                        selectEvent={handleSelectedPet}
                        selectedPetId={selectedPetId}
                    />
                </div>
                <OptionInput
                    type="string"
                    category="* 병명"
                    onChange={(value) => {
                        setDisease(value as string);
                        setValid(isFormValid());
                    }}
                    placeholder="어디가 아픈가요?"
                ></OptionInput>
                <OptionInput
                    type="number"
                    category="* 병원비"
                    onChange={(value) => {
                        setCost(value as string);
                        setValid(isFormValid());
                    }}
                    placeholder="얼마를 사용하셨나요?"
                ></OptionInput>
                <OptionInput
                    type="string"
                    category="* 병원명"
                    onChange={(value) => {
                        setHospital(value as string);
                        setValid(isFormValid());
                    }}
                    placeholder="병원명을 입력해주세요."
                ></OptionInput>
                <OptionInput
                    type="date"
                    category="* 진료일"
                    onChange={(value) => {
                        setVisitedAt(value as string);
                        setValid(isFormValid());
                    }}
                ></OptionInput>
                <OptionInput
                    type="string"
                    category="메모"
                    onChange={(value) => setMemo(value as string)}
                ></OptionInput>
            </St.OutletContainer>
            <St.SubmitButton onClick={clickSubmitButton} $valid={valid}>
                <span>제출하기</span>
            </St.SubmitButton>
        </>
    );
};

export default AddMedical;
