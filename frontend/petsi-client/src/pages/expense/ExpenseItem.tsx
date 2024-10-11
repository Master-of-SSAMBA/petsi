import {
    deleteMedicalData,
    deletePurchaseData,
    fetchMedicalData,
    fetchPurchaseData,
    updateMedicalData,
    updatePurchaseData,
} from "@/services/expenseServices";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as St from "@/pages/expense/expenseAdd/ExpenseAdd.style";
import OptionInput from "@/components/ui/_input/OptionInput";
import OptionDropdown from "@/components/ui/_dropdown/OptionDropdown";
import Container from "@/components/ui/_container/Container";
import Delete from "@/assets/icons/Icon-delete-2.svg?react";
import { AppPaths } from "@/interfaces/AppPaths";
import PetNav from "@/components/pet-navigation/PetNav";

const ExpenseItem = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { medicalExpenseId, purchaseId } = location.state || {};

    const [title, setTitle] = useState<string>("");
    const [cost, setCost] = useState<string>("");
    const [option, setOption] = useState<string>("");
    const [quantity, setQuantity] = useState<string>("");
    const [purchasedAt, setPurchasedAt] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [image, setImage] = useState<string | undefined>(undefined);

    const [selectedPetId, setSelectedPetId] = useState<number | null>(null);
    const [disease, setDisease] = useState<string>("");
    const [hospital, setHospital] = useState<string>("");
    const [visitedAt, setVisitedAt] = useState<string>("");
    const [memo, setMemo] = useState<string | null>(null);

    const [valid, setValid] = useState<boolean>(false);

    useEffect(() => {
        const getItemData = async () => {
            if (medicalExpenseId) {
                const response = await fetchMedicalData(medicalExpenseId);
                setTitle(response.category);
                setCost(response.cost);
                setOption(response.option);
                setQuantity(response.quantity);
                setPurchasedAt(response.purchasedAt);
                setCategory(response.category);
                setImage(response.img);
            } else if (purchaseId) {
                const response = await fetchPurchaseData(purchaseId);
                setSelectedPetId(response.selectedPetId);
                setDisease(response.disease);
                setCost(response.cost);
                setHospital(response.hospital);
                setVisitedAt(response.visitedAt);
                setMemo(response.memo);
            }
        };
        getItemData();
    }, [medicalExpenseId, purchaseId]);

    const isSupplyFormValid = () => {
        return (
            title !== "" &&
            cost !== "" &&
            quantity !== "" &&
            purchasedAt !== "" &&
            category !== ""
        );
    };

    const isMedicalFormValid = () => {
        return (
            disease !== "" &&
            cost !== "" &&
            hospital !== "" &&
            visitedAt !== "" &&
            selectedPetId !== null
        );
    };

    const deleteMedicalItem = async () => {
        const response = await deleteMedicalData(medicalExpenseId);
        if (response) {
            navigate(AppPaths.EXPENSE_DETAIL);
        }
    };

    const deleteSupplyItem = async () => {
        const response = await deletePurchaseData(purchaseId);
        if (response) {
            navigate(AppPaths.EXPENSE_DETAIL);
        }
    };

    const updateMedicalItem = async () => {
        if (!selectedPetId) return;

        const data = {
            petId: selectedPetId,
            medicalExpenseId: medicalExpenseId,
            diseaseName: disease,
            cost: cost,
            hospital: hospital,
            visitedAt: visitedAt,
            memo: memo || null,
        };
        const response = await updateMedicalData(data);
        if (response) {
            navigate(AppPaths.EXPENSE_DETAIL);
        }
    };

    const updateSupplyItem = async () => {
        const data = {
            purchaseId: purchaseId,
            title: title,
            img: image || null,
            detail: option || null,
            purchasedAt: purchasedAt,
            quantity: quantity,
            cost: cost,
            category: category,
        };
        const response = await updatePurchaseData(data);
        if (response) {
            navigate(AppPaths.EXPENSE_DETAIL);
        }
    };

    const handleSelectedPet = (newPetId: number) => {
        setSelectedPetId((prevSelectedPetId) =>
            prevSelectedPetId === newPetId ? null : newPetId
        );
        setValid(isMedicalFormValid());
    };

    return (
        <div>
            {medicalExpenseId ? (
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
                            value={disease}
                            category="* 병명"
                            onChange={(value) => {
                                setDisease(value as string);
                                setValid(isMedicalFormValid());
                            }}
                            placeholder="어디가 아픈가요?"
                        ></OptionInput>
                        <OptionInput
                            type="number"
                            value={cost}
                            category="* 병원비"
                            onChange={(value) => {
                                setCost(value as string);
                                setValid(isMedicalFormValid());
                            }}
                            placeholder="얼마를 사용하셨나요?"
                        ></OptionInput>
                        <OptionInput
                            type="string"
                            value={hospital}
                            category="* 병원명"
                            onChange={(value) => {
                                setHospital(value as string);
                                setValid(isMedicalFormValid());
                            }}
                            placeholder="병원명을 입력해주세요."
                        ></OptionInput>
                        <OptionInput
                            type="date"
                            value={visitedAt}
                            category="* 진료일"
                            onChange={(value) => {
                                setVisitedAt(value as string);
                                setValid(isMedicalFormValid());
                            }}
                        ></OptionInput>
                        <OptionInput
                            type="string"
                            category="메모"
                            value={memo || ""}
                            onChange={(value) => setMemo(value as string)}
                        ></OptionInput>
                        <div
                            style={{
                                display: "flex",
                                gap: "1.5rem",
                                marginTop: "1rem",
                            }}
                        >
                            <Container
                                color="lightgray"
                                shadow={true}
                                style={{ width: "40%" }}
                                onClick={deleteMedicalItem}
                            >
                                <Delete />
                            </Container>
                            <Container
                                color={valid ? "pink" : "lightgray"}
                                shadow={true}
                                style={{ width: "60%" }}
                                onClick={updateMedicalItem}
                            >
                                <h4>수정하기</h4>
                            </Container>
                        </div>
                    </St.OutletContainer>
                </>
            ) : (
                <>
                    <St.OutletContainer style={{ padding: "1.5rem" }}>
                        <OptionInput
                            type="string"
                            value={title}
                            category="* 품목명"
                            onChange={(value) => {
                                setTitle(value as string);
                                setValid(isSupplyFormValid());
                            }}
                            placeholder="무엇을 구매하셨나요?"
                        ></OptionInput>
                        <OptionInput
                            type="number"
                            value={cost}
                            category="* 가격"
                            onChange={(value) => {
                                setCost(value as string);
                                setValid(isSupplyFormValid());
                            }}
                            placeholder="얼마를 사용하셨나요?"
                        ></OptionInput>
                        <OptionInput
                            type="string"
                            value={option}
                            category="옵션"
                            onChange={(value) => setOption(value as string)}
                            placeholder="옵션을 입력해주세요."
                        ></OptionInput>
                        <OptionInput
                            type="number"
                            value={quantity}
                            category="* 수량"
                            onChange={(value) => {
                                setQuantity(value as string);
                                setValid(isSupplyFormValid());
                            }}
                            placeholder="몇 개를 구매하셨나요?"
                        ></OptionInput>
                        <OptionInput
                            type="date"
                            value={purchasedAt}
                            category="* 구매 일자"
                            onChange={(value) => {
                                setPurchasedAt(value as string);
                                setValid(isSupplyFormValid());
                            }}
                        ></OptionInput>
                        <OptionDropdown
                            itemList={["사료", "간식", "용품", "장난감"]}
                            category="* 카테고리"
                            onChange={(value) => {
                                setCategory(value);
                                setValid(isSupplyFormValid());
                            }}
                        ></OptionDropdown>
                        <div
                            style={{
                                display: "flex",
                                gap: "1.5rem",
                                marginTop: "1rem",
                            }}
                        >
                            <Container
                                color="lightgray"
                                shadow={true}
                                style={{ width: "40%" }}
                                onClick={deleteSupplyItem}
                            >
                                <Delete />
                            </Container>
                            <Container
                                color={valid ? "pink" : "lightgray"}
                                shadow={true}
                                style={{ width: "60%" }}
                                onClick={updateSupplyItem}
                            >
                                <h4>수정하기</h4>
                            </Container>
                        </div>
                    </St.OutletContainer>
                </>
            )}
        </div>
    );
};

export default ExpenseItem;
