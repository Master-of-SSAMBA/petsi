import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { bottomState, headerState } from "@/stores/useNavigationStore";
import { partialPetState } from "@/stores/useAddPetStore";
import Dropdown from "@/components/ui/_dropdown/Dropdown";
import * as St from "./AddPet.style";
import { catBreed, dogBreed } from "./BreedData";

import { DateValue } from "@/components/ui/_calendar/CalendarType";
import DatePicker from "@/components/ui/_calendar/DatePicker";
import { registPet } from "@/services/petServices";
import Modal from "@/components/ui/_modal/Modal";
import { AppPaths } from "@/interfaces/AppPaths";

const AddPetStep2 = () => {
    const navigate = useNavigate();
    const setHeaderState = useSetRecoilState(headerState);
    const setBottomState = useSetRecoilState(bottomState);

    const petInfo = useRecoilValue(partialPetState);

    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [breed, setBreed] = useState(
        petInfo.species === "cat" ? catBreed[0] : dogBreed[0]
    );
    const [birthdate, setBirthdate] = useState<DateValue>(new Date());
    const [gender, setGender] = useState<"MALE" | "FEMALE" | null>(null);
    const [weight, setWeight] = useState<number>(0);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const [errors, setErrors] = useState({
        imageFile: "",
        gender: "",
        weight: "",
    });

    useEffect(() => {
        setHeaderState({
            left: "backArrow",
            right: "",
            text: "반려동물 등록",
            isVisible: true,
            color: "beige",
        });
        setBottomState({
            isVisible: false,
        });

        // 새로고침 시 페이지 강제 이동
        const isReloaded = sessionStorage.getItem("isReloaded");
        if (isReloaded) {
            sessionStorage.removeItem("isReloaded");
            navigate("/add-pet");
        }
        const handleBeforeUnload = () => {
            sessionStorage.setItem("isReloaded", "true");
        };
        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [navigate, setHeaderState, setBottomState]);

    const handleGenderClick = (gender: "MALE" | "FEMALE") => {
        setGender(gender);
        setErrors((prev) => ({
            ...prev,
            gender: "",
        }));
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

    const triggerFileInput = () => {
        document.getElementById("fileInput")?.click();
    };

    const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(event.target.value);

        if (isNaN(value) || value <= 0 || value >= 100) {
            setWeight(0);
            setErrors((prev) => ({
                ...prev,
                weight: "몸무게는 0보다 크고 100 미만이어야 합니다.",
            }));
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
        setErrors((prev) => ({
            ...prev,
            weight: "",
        }));
    };

    const formatBirthdate = (birthdate: DateValue): string | null => {
        if (birthdate instanceof Date) {
            return format(birthdate, "yyyy-MM-dd");
        }
        return null;
    };

    const addPet = async () => {
        if (gender === null || weight === 0 || imageFile === null) {
            if (gender === null) {
                setErrors((prev) => ({
                    ...prev,
                    gender: "성별을 선택해주세요.",
                }));
            }
            if (weight === 0) {
                setErrors((prev) => ({
                    ...prev,
                    weight: "몸무게를 입력해주세요.",
                }));
            }
            if (imageFile === null) {
                setErrors((prev) => ({
                    ...prev,
                    imageFile: "사진을 첨부해주세요.",
                }));
            }
            return;
        }

        try {
            const formData = new FormData();

            if (imageFile) {
                formData.append("image", imageFile);
            }

            const formattedDate = formatBirthdate(birthdate);

            const reqDto = {
                name: petInfo.name,
                birthDate: formattedDate,
                species: petInfo.species,
                breed: breed,
                gender: gender,
                weight: weight.toString(),
            };

            formData.append("reqDto", JSON.stringify(reqDto));
            const response = await registPet(formData);

            if (!response) {
                setModalOpen(true);
            } else {
                navigate(AppPaths.MYPAGE);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const isFormValid = () => {
        return (
            gender !== null &&
            weight !== 0 &&
            imageFile !== null &&
            !errors.gender &&
            !errors.weight &&
            !errors.imageFile
        );
    };
    return (
        <>
            <St.Container>
                <h2>
                    {petInfo.name}는(은)
                    <br />
                    어떤 아이인가요?
                </h2>
                <St.FormWrapper>
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
                    {errors.imageFile && (
                        <St.ErrorMsg>{errors.imageFile}</St.ErrorMsg>
                    )}
                </St.FormWrapper>
                <St.Input>
                    <div>
                        <span>*</span>
                        <h4>종을 선택해주세요.</h4>
                    </div>
                </St.Input>
                <Dropdown
                    optionList={petInfo.species === "cat" ? catBreed : dogBreed}
                    onChange={(val: string) => setBreed(val)}
                    searchFunc={true}
                />
                <St.Input>
                    <div>
                        <span>*</span>
                        <h4>생일을 입력해주세요.</h4>
                    </div>
                </St.Input>
                <St.Wrapper>
                    <DatePicker onChange={setBirthdate} maxDate={new Date()} />
                </St.Wrapper>
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
                        {errors.gender && (
                            <St.ErrorMsg>{errors.gender}</St.ErrorMsg>
                        )}
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
                        />
                    </St.Wrapper>
                    {errors.weight && (
                        <St.ErrorMsg>{errors.weight}</St.ErrorMsg>
                    )}
                </St.FormWrapper>
            </St.Container>
            <St.Button
                onClick={addPet}
                style={{
                    backgroundColor: isFormValid()
                        ? "var(--color-yellow)"
                        : "var(--color-lightgray)",
                }}
            >
                <span>등록하기</span>
            </St.Button>
            <Modal
                state="RegistFail"
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
            />
        </>
    );
};

export default AddPetStep2;
