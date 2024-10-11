import Loading from "@/components/ui/_loading/Loading";
import { AppPaths } from "@/interfaces/AppPaths";
import { crawlingExpenseData } from "@/services/expenseServices";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as St from "./Petfriends.style";
import Petfriends from "@/assets/icons/Icon-petfriends.svg?react";
import Kakao from "@/assets/icons/Icon-kakao-2.svg?react";
import Kakao2FA from "@/assets/icons/Icon-kakao-2fa.svg?react";

const KakaoLogin2FA = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { id, pw } = location.state || {};
    const [loading, setLoading] = useState<boolean>(false);

    const clickCrawlingButton = async () => {
        setLoading(true);
        try {
            const response = await crawlingExpenseData(id, pw);
            if (response) {
                confirm("소비 데이터 등록에 성공하였습니다!");
                navigate(AppPaths.EXPENSE_DETAIL);
            }
        } catch (error) {
            console.error("Crawling failed", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loading />;
    }

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
                    <Kakao2FA />
                </St.IconWrapper>
                카카오톡으로 로그인 메세지가 <br />
                전송되었습니다. 전송된 카카오톡 메세지에서
                <br />
                로그인 처리를 완료한 뒤 확인 버튼을 눌러주세요.
                <St.Button
                    style={{ backgroundColor: "var(--color-lightgray)" }}
                    onClick={clickCrawlingButton}
                >
                    확인
                </St.Button>
            </St.InputContainer>
        </div>
    );
};

export default KakaoLogin2FA;
