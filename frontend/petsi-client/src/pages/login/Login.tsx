import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { bottomState, headerState } from "@/stores/useNavigationStore";
import { useSetRecoilState } from "recoil";
import Input from "@/components/ui/_input/Input";
import Button from "@/components/ui/_button/Button";
import { AppPaths } from "@/interfaces/AppPaths";
import * as St from "./Login.style";
import { userLogIn } from "@/services/authServices";
import { accessTokenState, refreshTokenState } from "@/stores/useAuthStore";

const Login = () => {
    const navigate = useNavigate();
    const setHeaderState = useSetRecoilState(headerState);
    const setBottomState = useSetRecoilState(bottomState);
    const setAccessTokenState = useSetRecoilState(accessTokenState);
    const setRefreshTokenState = useSetRecoilState(refreshTokenState);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        setHeaderState({
            left: "backArrow",
            right: "empty",
            text: "비밀번호 찾기",
            isVisible: false,
            color: "beige",
        });
        setBottomState({
            isVisible: false,
        });
    }, [setHeaderState, setBottomState]);

    const handleEmailChange = (val: string) => setEmail(val);
    const handlePwChange = (val: string) => setPassword(val);

    const handleLogin = async () => {
        try {
            const response = await userLogIn(email, password);

            const { access_token, refresh_token } = response.data;
            setAccessTokenState(access_token);
            setRefreshTokenState(refresh_token);

            navigate(AppPaths.HOME);
        } catch (error) {
            console.error("Login failed:", error);
            setErrorMessage(
                "로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요."
            );
        }
    };

    return (
        <St.Layout>
            <div className="welcome-msg">
                <img
                    src={`/images/petsi.webp`}
                    alt="petsi logo img"
                    style={{ height: "4rem", width: "4rem" }}
                    className="logo-img"
                />
                <img
                    src={`/images/logo.png`}
                    alt="petsi logo img"
                    style={{ height: "4rem" }}
                    className="logo-img"
                />
            </div>
            <St.InputSection>
                <form action="">
                    <div>
                        <Input
                            type="text"
                            value={email}
                            onChange={handleEmailChange}
                            label="이메일"
                            placeholder=""
                        />
                        <Input
                            type="password"
                            value={password}
                            onChange={handlePwChange}
                            label="비밀번호"
                            placeholder=""
                        />
                    </div>
                </form>
                <St.FindPassword>
                    <span
                        onClick={() => {
                            navigate(AppPaths.FIND_PASSWORD);
                        }}
                    >
                        비밀번호를 잊으셨나요?
                    </span>
                </St.FindPassword>
            </St.InputSection>

            {/* 에러 메시지 표시 */}
            {errorMessage && <St.ErrorMessage>{errorMessage}</St.ErrorMessage>}

            <St.BtnSection>
                <Button
                    color="yellow"
                    size="large"
                    text="로그인"
                    shadow={true}
                    onButtonClick={handleLogin}
                />
                <Button
                    color="lightgray"
                    size="large"
                    text="회원가입"
                    to={AppPaths.SIGNUP}
                    shadow={true}
                />
            </St.BtnSection>
        </St.Layout>
    );
};

export default Login;
