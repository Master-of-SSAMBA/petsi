import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { bottomState, headerState } from "@/stores/useNavigationStore";
import * as St from "./Settings.style";
import { AppPaths } from "@/interfaces/AppPaths";
import Input from "@/components/ui/_input/Input";
import Container from "@/components/ui/_container/Container";
import { userInfoState } from "@/stores/useUserStore";
import { userLogIn } from "@/services/authServices";
import { changePassword, fetchUserData } from "@/services/userServices";
import { useNavigate } from "react-router-dom";
import { accessTokenState, refreshTokenState } from "@/stores/useAuthStore";

const ChangePassword = () => {
    const setHeaderState = useSetRecoilState(headerState);
    const setBottomState = useSetRecoilState(bottomState);
    const setAccessTokenState = useSetRecoilState(accessTokenState);
    const setRefreshTokenState = useSetRecoilState(refreshTokenState);
    const [userInfo, setUserInfo] = useRecoilState(userInfoState);

    const [prevPassword, setPrevPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [generalError, setGeneralError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        setHeaderState({
            left: "backArrow",
            right: "",
            text: "비밀번호 변경",
            isVisible: true,
            color: "beige",
            leftPath: AppPaths.MYPAGE,
        });
        setBottomState({
            isVisible: false,
        });
    }, [setHeaderState, setBottomState]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchUserData();

                setUserInfo({
                    userId: response.userId,
                    nickname: response.nickname,
                    email: response.email,
                    profileImage: response.profileImage,
                });
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [setUserInfo]);

    const handlePrevPassword = (val: string) => setPrevPassword(val);

    const handleNewPassword = (val: string) => {
        setNewPassword(val);
        const passwordRegex =
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=]).{8,16}$/;

        // 비밀번호 유효성 검사 결과를 에러 메시지로 설정
        if (!passwordRegex.test(val)) {
            setGeneralError(
                "비밀번호는 8자 이상 16자 이하의 영문으로, 숫자 및 특수문자를 하나 이상 포함해주세요."
            );
        } else {
            setGeneralError(""); // 유효성 검사가 통과되면 에러 메시지 초기화
        }
    };

    const handleChangePassword = async () => {
        // 유효성 검사 통과 여부 확인 및 비밀번호가 동일한지 확인
        if (!prevPassword || !newPassword) {
            setGeneralError("비밀번호를 제대로 입력해주세요.");
            return;
        }

        if (prevPassword === newPassword) {
            setGeneralError("기존 비밀번호와 새로운 비밀번호는 달라야 합니다.");
            return;
        }

        if (generalError) {
            return; // 에러가 있을 경우 비밀번호 변경 로직 실행하지 않음
        }

        try {
            const response = await userLogIn(userInfo.email, prevPassword);

            const { access_token, refresh_token } = response.data;
            setAccessTokenState(access_token);
            setRefreshTokenState(refresh_token);

            if (response.status === 200) {
                const changeResponse = await changePassword(newPassword);

                if (changeResponse) {
                    navigate(AppPaths.LOGIN);
                }
            }
        } catch (error) {
            setGeneralError("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
            console.error("비밀번호 변경 실패: ", error);
        }
    };

    return (
        <St.Layout>
            <St.TitleMsg>
                사용 중이신 비밀번호와
                <br />
                새로운 비밀번호를 입력해주세요.
            </St.TitleMsg>
            <Input
                type="password"
                value={prevPassword}
                onChange={handlePrevPassword}
                placeholder=""
                label="기존 비밀번호"
            />
            <Input
                type="password"
                value={newPassword}
                onChange={handleNewPassword}
                placeholder=""
                label="새로운 비밀번호"
            />
            {/* 에러 메시지 영역을 한 곳으로 통합 */}
            {generalError && (
                <h5 style={{ color: "var(--color-red)", marginTop: "0.5rem" }}>
                    {generalError}
                </h5>
            )}
            <St.BtnSection onClick={handleChangePassword}>
                <Container color="yellow" shadow={true}>
                    비밀번호 변경
                </Container>
            </St.BtnSection>
        </St.Layout>
    );
};

export default ChangePassword;
