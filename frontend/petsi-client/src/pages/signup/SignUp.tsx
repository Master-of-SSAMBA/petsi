import { bottomState, headerState } from "@/stores/useNavigationStore";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import axios from "axios";
import * as St from "./SignUp.style";
import Input from "@/components/ui/_input/Input";
import { AppPaths } from "@/interfaces/AppPaths";
import { useNavigate } from "react-router-dom";
import { checkEmail } from "@/services/authServices";
import Modal from "@/components/ui/_modal/Modal";
import Loading from "@/components/ui/_loading/Loading";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const SignUp = () => {
    const navigate = useNavigate();
    const setHeaderState = useSetRecoilState(headerState);
    const setBottomState = useSetRecoilState(bottomState);

    const [loading, setLoading] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPw, setConfirmPw] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [nickname, setNickname] = useState<string>("");
    const [innerBtn, setInnerBtn] = useState<string>("중복확인");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [errors, setErrors] = useState({
        email: "",
        password: "",
        confirmPw: "",
        name: "",
        nickname: "",
    });

    useEffect(() => {
        setHeaderState({
            left: "backArrow",
            right: "empty",
            text: "회원가입",
            isVisible: true,
            color: "beige",
            leftPath: AppPaths.LOGIN,
        });
        setBottomState({
            isVisible: false,
        });
    }, [setHeaderState, setBottomState]);

    const handleEmailChange = (val: string) => {
        setInnerBtn("중복확인");
        setEmail(val);
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,50}$/;
        setErrors((prev) => ({
            ...prev,
            email: emailRegex.test(val)
                ? ""
                : "형식에 맞는 이메일을 입력해주세요.",
        }));
    };

    const handlePwChange = (val: string) => {
        setPassword(val);
        const passwordRegex =
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=]).{8,16}$/;
        setErrors((prev) => ({
            ...prev,
            password: passwordRegex.test(val)
                ? ""
                : "비밀번호는 8자 이상 16자 이하의 영문으로, 숫자 및 특수문자를 하나 이상 포함해주세요.",
        }));
    };

    const handleConfirmPwChange = (val: string) => {
        setConfirmPw(val);
        setErrors((prev) => ({
            ...prev,
            confirmPw: val === password ? "" : "비밀번호가 일치하지 않습니다.",
        }));
    };

    const handleNameChange = (val: string) => {
        setName(val);
        const nameRegex = /^[가-힣]{1,5}$/;
        setErrors((prev) => ({
            ...prev,
            name: nameRegex.test(val)
                ? ""
                : "이름은 1자 이상 5자 이하의 한글로 작성해주세요.",
        }));
    };

    const handleNicknameChange = (val: string) => {
        setNickname(val);
        const nicknameRegex = /^[a-zA-Z가-힣0-9]{1,10}$/;
        setErrors((prev) => ({
            ...prev,
            nickname: nicknameRegex.test(val)
                ? ""
                : "닉네임은 1자 이상 10자 이하의 영어, 한글, 숫자 형식으로 작성해주세요.",
        }));
    };

    const Valid = () => {
        return (
            email !== "" &&
            password !== "" &&
            confirmPw !== "" &&
            name !== "" &&
            nickname !== "" &&
            errors.email === "사용 가능한 이메일입니다." &&
            !errors.password &&
            !errors.confirmPw &&
            !errors.name &&
            !errors.nickname
        );
    };

    const clickSubmit = async () => {
        if (!Valid()) {
            return;
        }

        if (password !== confirmPw) {
            setErrors((prev) => ({
                ...prev,
                confirmPw: "비밀번호가 일치하지 않습니다.",
            }));
            return;
        }

        // 통신 부분
        setLoading(true);
        try {
            const response = await axios.post(
                `${VITE_API_URL}/user/signup`,
                {
                    email: email,
                    password: password,
                    name: name,
                    nickname: nickname,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        accept: "*/*",
                    },
                }
            );
            if (response.status === 201) {
                setIsModalOpen(true);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchEmailCheck = async (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault(); // 폼 제출로 인한 페이지 새로고침 방지

        if (errors.email === "형식에 맞는 이메일을 입력해주세요.") return;

        try {
            const res = await checkEmail(email);
            if (res) {
                setInnerBtn("check");
                setErrors((prev) => ({
                    ...prev,
                    email: "사용 가능한 이메일입니다.",
                }));
            } else {
                setErrors((prev) => ({
                    ...prev,
                    email: "이미 사용하고 있는 이메일입니다.",
                }));
            }
        } catch (error) {
            console.error(error);
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <form>
                <St.Container>
                    <St.Msg>
                        <h3>환영합니다!</h3>
                        <h4>간단한 정보 입력 후 회원가입을 완료해보세요. </h4>
                    </St.Msg>
                    <St.InputBox>
                        <div className="email-input">
                            <Input
                                type="text"
                                value={email}
                                label="이메일"
                                onChange={handleEmailChange}
                                placeholder=""
                                innerBtn={innerBtn}
                                btnOn={email !== "" && !errors.email}
                                btnClick={fetchEmailCheck}
                            ></Input>
                        </div>
                        {errors.email && (
                            <St.ErrorMsg $status={innerBtn}>
                                {errors.email}
                            </St.ErrorMsg>
                        )}
                    </St.InputBox>
                    <St.InputBox>
                        <Input
                            type="password"
                            value={password}
                            label="비밀번호"
                            onChange={handlePwChange}
                            placeholder=""
                        />
                        {errors.password && (
                            <St.ErrorMsg>{errors.password}</St.ErrorMsg>
                        )}
                    </St.InputBox>
                    <St.InputBox>
                        <Input
                            type="password"
                            value={confirmPw}
                            label="비밀번호 확인"
                            onChange={handleConfirmPwChange}
                            placeholder=""
                        />
                        {errors.confirmPw && (
                            <St.ErrorMsg>{errors.confirmPw}</St.ErrorMsg>
                        )}
                    </St.InputBox>
                    <St.InputBox>
                        <Input
                            type="text"
                            value={name}
                            label="이름"
                            onChange={handleNameChange}
                            placeholder=""
                        />
                        {errors.name && (
                            <St.ErrorMsg>{errors.name}</St.ErrorMsg>
                        )}
                    </St.InputBox>
                    <St.InputBox>
                        <Input
                            type="text"
                            value={nickname}
                            label="닉네임"
                            onChange={handleNicknameChange}
                            placeholder=""
                        />
                        {errors.nickname && (
                            <St.ErrorMsg>{errors.nickname}</St.ErrorMsg>
                        )}
                    </St.InputBox>
                </St.Container>
            </form>
            <St.SubmitButton
                onClick={clickSubmit}
                style={{
                    backgroundColor: Valid()
                        ? "var(--color-yellow)"
                        : "var(--color-lightgray)",
                    pointerEvents: Valid() ? "auto" : "none",
                }}
            >
                <span>제출하기</span>
            </St.SubmitButton>
            <Modal
                state={"RegistSuccess"}
                isOpen={isModalOpen}
                onClose={() => {
                    setIsModalOpen(false);
                    navigate(AppPaths.LOGIN);
                }}
            />
        </>
    );
};

export default SignUp;
