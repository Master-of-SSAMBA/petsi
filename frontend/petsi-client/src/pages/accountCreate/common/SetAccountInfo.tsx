import { newAccountInfoState } from "@/stores/useCreateAccountStore";
import * as St from "./Common.style";
import Container from "@/components/ui/_container/Container";
import { useEffect, useState } from "react";
import Input from "@/components/ui/_input/Input";
import Loading from "@/components/ui/_loading/Loading";
import { petListState } from "@/stores/usePetStore";
import { useRecoilState } from "recoil";
import { createAccountWithoutAutoTransfer } from "@/services/accountServices";
import { fetchPet } from "@/services/petServices";
import PasswordKeypad from "@/components/ui/_passwordKeypad/PasswordKeypad";

interface StepProps {
    nextStep: () => void;
    skipAutoPayStep: () => void;
    prevStep: () => void;
}

const SetAccountInfo = ({ nextStep, skipAutoPayStep, prevStep }: StepProps) => {
    const [accountAlias, setAccountAlias] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [checkPassword, setCheckPassword] = useState<string>("");
    const [pets, setPets] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [isFirstKeypadOpen, setIsFirstKeypadOpen] = useState(false);
    const [isSecondKeypadOpen, setIsSecondKeypadOpen] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const [userPetList, setUserPetList] = useRecoilState(petListState);

    const [newAccountInfo, setNewAccountInfo] =
        useRecoilState(newAccountInfoState);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const response = await fetchPet();
                if (isMounted) {
                    if (response && response.status) {
                        setUserPetList(response.data);
                    }
                    setLoading(false);
                }
            } catch (error) {
                console.error(error);
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    });

    const validateFields = () => {
        // 모든 필드가 입력되었는지 확인
        return (
            accountAlias.trim() !== "" &&
            password.trim() !== "" &&
            pets.length > 0 &&
            isChecked
        );
    };

    const handleAgree = async () => {
        if (!validateFields()) {
            // 필드가 채워지지 않았을 경우 경고
            alert("입력되지 않은 곳이 있습니다.");
            return;
        }
        setNewAccountInfo((prev) => ({
            ...prev,
            name: accountAlias,
            password: checkPassword,
            pets: pets,
        }));

        nextStep();
        // 다음 단계로 이동
    };

    const handleSkip = async () => {
        if (!validateFields()) {
            // 필드가 채워지지 않았을 경우 경고
            alert("입력되지 않은 곳이 있습니다.");
            return;
        }
        setNewAccountInfo((prev) => ({
            ...prev,
            name: accountAlias,
            password: checkPassword,
            pets: pets,
        }));

        const updatedInfo = {
            ...newAccountInfo,
            name: accountAlias,
            password: checkPassword,
            pets: pets,
        };

        try {
            await createAccountWithoutAutoTransfer(updatedInfo);
        } catch (error) {
            console.error(error);
        }

        skipAutoPayStep();
    };

    const handlePrev = () => {
        prevStep();
    };

    const handleAliasChange = (val: string) => setAccountAlias(val);

    const handlePetClick = (petId: string) => {
        // pets 배열에 petId가 없으면 추가하고, 있으면 제거
        setPets((prev) =>
            prev.includes(petId)
                ? prev.filter((id) => id !== petId)
                : [...prev, petId]
        );
    };

    const defaultPetImage = (imageSrc: string) => {
        if (imageSrc !== null) {
            return imageSrc;
        } else {
            return "/images/petsi.webp";
        }
    };

    const handleNumberClick1 = (val: string) => {
        if (password.length < 4) {
            const newPassword = password + val;
            setPassword(newPassword);
            isSamePassword(newPassword, checkPassword);

            if (newPassword.length === 4) {
                setIsFirstKeypadOpen(false);
            }
        }
    };

    const handleClearClick1 = () => {
        setPassword(""); // 비밀번호 초기화
        setIsChecked(false);
    };

    const handleNumberClick2 = (val: string) => {
        if (checkPassword.length < 4) {
            const newCheckPassword = checkPassword + val;
            setCheckPassword(newCheckPassword);
            isSamePassword(password, newCheckPassword);

            if (newCheckPassword.length === 4) {
                setIsSecondKeypadOpen(false);
            }
        }
    };

    const handleClearClick2 = () => {
        setCheckPassword(""); // 비밀번호 초기화
        setIsChecked(false);
    };

    const isSamePassword = (password: string, checkPassword: string) => {
        return setIsChecked(password === checkPassword);
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <St.MainContainer>
            <St.InputContainer>
                <St.InputTitle>
                    <span>*</span>
                    <h4>계좌의 별명을 정해주세요</h4>
                </St.InputTitle>
                <Input
                    type="text"
                    value={accountAlias}
                    onChange={handleAliasChange}
                    maxLength={20}
                />
            </St.InputContainer>
            <St.InputContainer>
                <St.InputTitle>
                    <span>*</span>
                    <h4>비밀번호를 설정하고 확인해주세요</h4>
                </St.InputTitle>

                <div
                    onClick={() => {
                        setIsFirstKeypadOpen(true);
                        handleClearClick1();
                    }}
                    style={{ marginBottom: "0.5rem" }}
                >
                    <Container color="beige" shadow={false}>
                        비밀번호 입력
                    </Container>
                </div>
                <div
                    onClick={() => {
                        setIsSecondKeypadOpen(true);
                        handleClearClick2();
                    }}
                >
                    <Container
                        color={isChecked ? "green" : "red"}
                        shadow={false}
                    >
                        {isChecked ? "비밀번호 일치" : "비밀번호 확인해주세요"}
                    </Container>
                </div>
            </St.InputContainer>
            <St.InputContainer>
                <St.InputTitle>
                    <span>*</span>
                    <h4>함께하는 반려동물을 지정해주세요</h4>
                </St.InputTitle>

                <St.MyPetContainer>
                    {userPetList.map((pet) => (
                        <St.MyPet
                            key={pet.petId}
                            onClick={() => handlePetClick(pet.petId.toString())}
                            isSelected={pets.includes(pet.petId.toString())}
                        >
                            <img
                                className={"petImage"}
                                src={defaultPetImage(pet.image)}
                                alt={pet.name}
                            />
                            <span className={"petName"}>{pet.name}</span>
                        </St.MyPet>
                    ))}
                </St.MyPetContainer>
            </St.InputContainer>

            <St.ButtonContainer onClick={handleAgree}>
                <Container color="lime" shadow={true}>
                    자동 이체 설정하기
                </Container>
            </St.ButtonContainer>
            <div>
                <St.ButtonContainer onClick={handleSkip}>
                    <Container color="yellow" shadow={true}>
                        계좌 개설 완료하기
                    </Container>
                </St.ButtonContainer>
                <St.ButtonContainer onClick={handlePrev}>
                    <Container color="lightgray" shadow={true}>
                        뒤로가기
                    </Container>
                </St.ButtonContainer>
            </div>
            <PasswordKeypad
                onNumberClick={handleNumberClick1}
                onClearClick={handleClearClick1}
                isOpen={isFirstKeypadOpen}
                onClose={() => {
                    setIsFirstKeypadOpen(!isFirstKeypadOpen);
                }}
                passwordLength={password.length}
            />
            <PasswordKeypad
                onNumberClick={handleNumberClick2}
                onClearClick={handleClearClick2}
                isOpen={isSecondKeypadOpen}
                onClose={() => {
                    setIsSecondKeypadOpen(!isSecondKeypadOpen);
                }}
                passwordLength={checkPassword.length}
            />
        </St.MainContainer>
    );
};

export default SetAccountInfo;
