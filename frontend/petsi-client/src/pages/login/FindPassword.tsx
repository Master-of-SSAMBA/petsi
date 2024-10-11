import { useState, useEffect } from "react";
import { bottomState, headerState } from "@/stores/useNavigationStore";
import { useSetRecoilState } from "recoil";
import Input from "@/components/ui/_input/Input";
import Button from "@/components/ui/_button/Button";
import { AppPaths } from "@/interfaces/AppPaths";
import * as St from "./Login.style";
import axios from "axios";

const FindPassword = () => {
    const [email, setEmail] = useState("");
    const setHeaderState = useSetRecoilState(headerState);
    const setBottomState = useSetRecoilState(bottomState);
    const keycloakConfig = {
        url: "https://j11a403.p.ssafy.io/auth",
        realm: "petsi",
        clientId: "petsi-front",
    };

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
    const handleResetPassword = async (email: string) => {
        try {
            await axios.post(
                `${keycloakConfig.url}/realms/${keycloakConfig.realm}/login-actions/reset-credentials`,
                new URLSearchParams({
                    client_id: keycloakConfig.clientId,
                    username: email,
                }),
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );
            // 팝업 띄우기
            // setResetPasswordMessage("비밀번호 재설정 이메일이 전송되었습니다. 이메일을 확인해주세요.");
        } catch (error) {
            console.error("Password reset request failed", error);
            // setResetPasswordMessage("비밀번호 재설정 요청에 실패했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <St.Layout>
            <St.TitleMsg>
                가입하신 이메일을 <br />
                입력해주세요
            </St.TitleMsg>
            <St.InputSection>
                <Input
                    type="text"
                    value={email}
                    onChange={handleEmailChange}
                    label="이메일"
                    placeholder=""
                />
            </St.InputSection>
            <St.BtnSection>
                <Button
                    color="yellow"
                    size="large"
                    text="이메일 전송"
                    shadow={true}
                    onButtonClick={() => handleResetPassword(email)}
                />
                <Button
                    color="lightgray"
                    size="large"
                    text="로그인하러 가기"
                    to={AppPaths.LOGIN}
                    shadow={true}
                />
            </St.BtnSection>
        </St.Layout>
    );
};

export default FindPassword;
