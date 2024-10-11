import Input from "@/components/ui/_input/Input";
import { AppPaths } from "@/interfaces/AppPaths";
import { bottomState, headerState } from "@/stores/useNavigationStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import Petfriends from "@/assets/icons/Icon-petfriends.svg?react";
import Kakao from "@/assets/icons/Icon-kakao-2.svg?react";
import * as St from "./Petfriends.style";

const KakaoLogin = () => {
    const navigate = useNavigate();
    const setHeaderState = useSetRecoilState(headerState);
    const setBottomState = useSetRecoilState(bottomState);
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");

    useEffect(() => {
        setHeaderState({
            left: "backArrow",
            right: "",
            text: "",
            isVisible: false,
            color: "beige",
        });
        setBottomState({
            isVisible: true,
            activePage: "Expense",
        });
    }, [setHeaderState, setBottomState]);

    return (
        <div>
            <St.FilterHeader>
                <St.Arrow onClick={() => navigate(-1)} />
                <span className="header-text">
                    <Petfriends />
                    구매 목록 가져오기
                </span>
                <span style={{ width: "2rem" }}></span>
            </St.FilterHeader>
            <St.InputContainer>
                <St.IconWrapper>
                    <Kakao />
                </St.IconWrapper>
                <Input
                    type="text"
                    value={id}
                    onChange={setId}
                    placeholder=""
                    label="이메일"
                />
                <Input
                    type="password"
                    value={pw}
                    onChange={setPw}
                    placeholder=""
                    label="비밀번호"
                />
                <St.Button
                    style={{ backgroundColor: "#FDDC3F" }}
                    onClick={() =>
                        navigate(AppPaths.KAKAO_LOGIN_2FA, {
                            state: { id, pw },
                        })
                    }
                >
                    <h4 style={{ color: "black" }}>로그인</h4>
                </St.Button>
            </St.InputContainer>
        </div>
    );
};

export default KakaoLogin;
