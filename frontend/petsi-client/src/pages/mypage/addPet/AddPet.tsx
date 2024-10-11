import { useState, useEffect } from "react";
import { headerState, bottomState } from "@/stores/useNavigationStore";
import { useSetRecoilState } from "recoil";
import * as St from "./AddPet.style";
import Input from "@/components/ui/_input/Input";
import { useNavigate } from "react-router-dom";
import { partialPetState } from "@/stores/useAddPetStore";
import { AppPaths } from "@/interfaces/AppPaths";

const AddPet = () => {
    const navigate = useNavigate();
    const setPetInfo = useSetRecoilState(partialPetState);
    const setHeaderState = useSetRecoilState(headerState);
    const setBottomState = useSetRecoilState(bottomState);

    const [selectedSpecies, setSelectedSpecies] = useState("cat");
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        setHeaderState({
            left: "backArrow",
            leftPath: AppPaths.MYPAGE,
            right: "",
            text: "우리아이 정보 수정",
            isVisible: true,
            color: "beige",
        });
        setBottomState({
            isVisible: false,
        });
    }, [setHeaderState, setBottomState]);

    const handleSpeciesChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setSelectedSpecies(event.target.id);
    };

    const handleNameChange = (val: string) => {
        setName(val);
        setError("");
    };

    const handleNext = () => {
        // 한글, 영문, 숫자 혼합 10자 이내 정규표현식
        const nameRegex = /^[a-zA-Z0-9가-힣]{1,10}$/;
        if (!nameRegex.test(name)) {
            setError("한글, 영문, 숫자 혼합 10자 이내로 입력하세요.");
        } else {
            setPetInfo({
                name: name,
                species: selectedSpecies,
            });
            navigate(`/add-pet/step-2`);
        }
    };

    return (
        <>
            <St.Container>
                <h2>
                    어떤 반려동물을
                    <br />
                    키우고 계신가요?
                </h2>
                <St.SelectSpecies>
                    <St.Species>
                        <label>
                            <img src={`/images/cat.webp`} alt="species img" />
                            <div>
                                <St.CustomRadio
                                    type="radio"
                                    id="cat"
                                    name="species"
                                    checked={selectedSpecies === "cat"}
                                    onChange={handleSpeciesChange}
                                />
                                <span>고양이</span>
                            </div>
                        </label>
                    </St.Species>
                    <St.Species>
                        <label>
                            <img src={`/images/dog.webp`} alt="species img" />
                            <div>
                                <St.CustomRadio
                                    type="radio"
                                    id="dog"
                                    name="species"
                                    checked={selectedSpecies === "dog"}
                                    onChange={handleSpeciesChange}
                                />
                                <span>강아지</span>
                            </div>
                        </label>
                    </St.Species>
                </St.SelectSpecies>
                <St.Input>
                    <div>
                        <span>*</span>
                        <h4>이름을 입력해주세요.</h4>
                    </div>
                    <St.FormWrapper>
                        <Input
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            placeholder="10자 이내로 작성가능합니다."
                            maxLength={10}
                        />
                        {error && <St.ErrorMsg>{error}</St.ErrorMsg>}
                    </St.FormWrapper>
                </St.Input>
            </St.Container>
            <St.Button
                onClick={handleNext}
                style={{
                    backgroundColor:
                        name !== "" && !error
                            ? "var(--color-yellow)"
                            : "var(--color-lightgray)",
                }}
            >
                <span>다음으로</span>
            </St.Button>
        </>
    );
};

export default AddPet;
