import { fetchPetData, modifyPet } from "@/services/petServices";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as St from "@/pages/mypage/addPet/AddPet.style";
import Input from "@/components/ui/_input/Input";
import { AppPaths } from "@/interfaces/AppPaths";
import { useSetRecoilState } from "recoil";
import { bottomState, headerState } from "@/stores/useNavigationStore";

interface Age {
    year: number;
    month: number;
}

interface Pet {
    petId: number;
    name: string;
    birthDate: string; // "YYYY-MM-DD" 형식의 문자열
    age: Age;
    species: string;
    breed: string;
    gender: "MALE" | "FEMALE"; // "MALE"과 "FEMALE" 중 하나
    image: string; // 이미지 URL
    weight: number; // 소수점이 포함된 숫자 (체중)
}

const EditPet = () => {
    const setHeaderState = useSetRecoilState(headerState);
    const setBottomState = useSetRecoilState(bottomState);
    const location = useLocation();
    const navigate = useNavigate();
    const { petId } = location.state || {};
    const [pet, setPet] = useState<Pet>();
    const [name, setName] = useState("");
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [gender, setGender] = useState<"MALE" | "FEMALE" | null>(null);
    const [weight, setWeight] = useState<number>(0);

    useEffect(() => {
        setHeaderState({
            left: "backArrow",
            right: "",
            text: "반려동물 정보 수정",
            isVisible: true,
            color: "beige",
        });
        setBottomState({
            isVisible: false,
        });
    }, [setHeaderState, setBottomState]);

    useEffect(() => {
        if (!petId) return;

        const getPetData = async () => {
            try {
                const response = await fetchPetData(petId);
                setPet(response);
                setName(response.name);
                setImageUrl(response.image);
                setImageFile(response.image);
                setGender(response.gender);
                setWeight(response.weight);
            } catch (error) {
                console.error("반려동물 상세 조회 에러", error);
            }
        };

        getPetData();
    }, [petId]);

    const handleNameChange = (val: string) => {
        setName(val);
    };

    const triggerFileInput = () => {
        document.getElementById("fileInput")?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageUrl(reader.result as string);
                setImageFile(file);
            };
            reader.readAsDataURL(file);
        } else {
            alert("이미지 파일만 선택할 수 있습니다.");
        }
    };

    const handleGenderClick = (gender: "MALE" | "FEMALE") => {
        setGender(gender);
    };

    const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value);

        if (isNaN(value) || value <= 0 || value >= 100) {
            setWeight(0);
            return;
        }

        // 소수점 둘째 자리까지만 허용
        if (event.target.value.includes(".")) {
            const [integer, decimal] = event.target.value.split(".");
            if (decimal.length > 2) {
                event.target.value = `${integer}.${decimal.slice(0, 2)}`;
            }
        }

        setWeight(value);
    };

    const editPet = async () => {
        if (gender === null) {
            confirm("성별을 선택해주세요.");
            return;
        } else if (name === "") {
            confirm("이름을 입력해주세요.");
            return;
        } else if (weight === 0) {
            confirm("몸무게를 입력해주세요.");
            return;
        }

        try {
            const formData = new FormData();
            if (imageFile) {
                formData.append("image", imageFile);
            }
            const reqDto = {
                petId: pet?.petId,
                name: name,
                birthDate: pet?.birthDate,
                species: pet?.species,
                breed: pet?.breed,
                gender: gender,
                weight: weight.toString(),
            };

            formData.append("reqDto", JSON.stringify(reqDto));
            const response = await modifyPet(formData);
            if (response) {
                navigate(AppPaths.MYPAGE);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <St.Container>
                <St.Image>
                    <div className="pet-image" onClick={triggerFileInput}>
                        <input
                            id="fileInput"
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={handleFileChange}
                        />
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt="Pet"
                                style={{ width: "100%", height: "100%" }}
                            />
                        ) : (
                            <St.CameraIcon />
                        )}
                        <div className="icon-wrapper">
                            <St.UploadIcon />
                        </div>
                    </div>
                </St.Image>
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
                    </St.FormWrapper>
                </St.Input>
                <St.Input>
                    <div>
                        <span>*</span>
                        <h4>성별을 선택해주세요.</h4>
                    </div>
                    <St.FormWrapper>
                        <St.GenderWrap>
                            <St.Gender
                                onClick={() => handleGenderClick("MALE")}
                                $selected={gender === "MALE" ? "MALE" : null}
                            >
                                <h4>남아</h4>
                            </St.Gender>
                            <St.Gender
                                onClick={() => handleGenderClick("FEMALE")}
                                $selected={
                                    gender === "FEMALE" ? "FEMALE" : null
                                }
                            >
                                <h4>여아</h4>
                            </St.Gender>
                        </St.GenderWrap>
                    </St.FormWrapper>
                </St.Input>
                <St.Input>
                    <div>
                        <span>*</span>
                        <h4>몸무게(kg)를 입력해주세요.</h4>
                    </div>
                </St.Input>
                <St.FormWrapper>
                    <St.Wrapper>
                        <St.WeightInput
                            type="number"
                            pattern="[0-9]*"
                            inputMode="decimal" // 모바일 키패드에 온점 포함
                            step="0.01"
                            max="100"
                            min="0"
                            placeholder="소수점 둘째 자리까지 입력 가능합니다."
                            onInput={handleWeightChange}
                            value={weight}
                        />
                    </St.Wrapper>
                </St.FormWrapper>
            </St.Container>
            <St.Button
                onClick={editPet}
                style={{
                    backgroundColor: "var(--color-yellow)",
                }}
            >
                <span>등록하기</span>
            </St.Button>
        </>
    );
};

export default EditPet;
