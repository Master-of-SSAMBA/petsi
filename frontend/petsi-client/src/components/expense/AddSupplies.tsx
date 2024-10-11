import * as St from "@/pages/expense/expenseAdd/ExpenseAdd.style";
import { useState } from "react";
import OptionInput from "../ui/_input/OptionInput";
import OptionDropdown from "../ui/_dropdown/OptionDropdown";
import { submitExpenseData } from "@/services/expenseServices";
import { useNavigate } from "react-router-dom";
import { AppPaths } from "@/interfaces/AppPaths";

const AddSupplies = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState<string>("");
    const [cost, setCost] = useState<string>("");
    const [option, setOption] = useState<string>("");
    const [quantity, setQuantity] = useState<string>("");
    const [purchasedAt, setPurchasedAt] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [image, setImage] = useState<File | undefined>(undefined);
    const [valid, setValid] = useState<boolean>(false);

    const isFormValid = () => {
        return (
            title !== "" &&
            cost !== "" &&
            quantity !== "" &&
            purchasedAt !== "" &&
            category !== ""
        );
    };

    const clickSubmitButton = async () => {
        if (!isFormValid()) return;

        try {
            const formData = new FormData();

            if (image) {
                formData.append("image", image);
            }

            const reqDto = {
                title: title,
                purchasedAt: purchasedAt,
                quantity: quantity,
                cost: cost,
                category: category,
                detail: option || null,
            };

            formData.append("reqDto", JSON.stringify(reqDto));
            const res = await submitExpenseData(formData);

            if (res) {
                navigate(AppPaths.EXPENSE);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <St.OutletContainer>
                <OptionInput
                    type="string"
                    category="* 품목명"
                    onChange={(value) => {
                        setTitle(value as string);
                        setValid(isFormValid());
                    }}
                    placeholder="무엇을 구매하셨나요?"
                ></OptionInput>
                <OptionInput
                    type="number"
                    category="* 가격"
                    onChange={(value) => {
                        setCost(value as string);
                        setValid(isFormValid());
                    }}
                    placeholder="얼마를 사용하셨나요?"
                ></OptionInput>
                <OptionInput
                    type="string"
                    category="옵션"
                    onChange={(value) => setOption(value as string)}
                    placeholder="옵션을 입력해주세요."
                ></OptionInput>
                <OptionInput
                    type="number"
                    category="* 수량"
                    onChange={(value) => {
                        setQuantity(value as string);
                        setValid(isFormValid());
                    }}
                    placeholder="몇 개를 구매하셨나요?"
                ></OptionInput>
                <OptionInput
                    type="date"
                    category="* 구매 일자"
                    onChange={(value) => {
                        setPurchasedAt(value as string);
                        setValid(isFormValid());
                    }}
                ></OptionInput>
                <OptionDropdown
                    itemList={["사료", "간식", "용품", "장난감"]}
                    category="* 카테고리"
                    onChange={(value) => {
                        setCategory(value);
                        setValid(isFormValid());
                    }}
                ></OptionDropdown>
                <OptionInput
                    type="file"
                    category="사진"
                    onChange={(value) => setImage(value as File | undefined)}
                    accept="image/*"
                ></OptionInput>
            </St.OutletContainer>
            <St.SubmitButton onClick={clickSubmitButton} $valid={valid}>
                <span>제출하기</span>
            </St.SubmitButton>
        </>
    );
};

export default AddSupplies;
