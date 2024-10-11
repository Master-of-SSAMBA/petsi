import { useEffect, useState } from "react";
import * as St from "./Common.style";
import { AppPaths } from "@/interfaces/AppPaths";
import Container from "@/components/ui/_container/Container";
import Loading from "@/components/ui/_loading/Loading";

const CreateComplete = () => {
    const [secondsLeft, setSecondsLeft] = useState(20); // 초기 카운트다운 시간 설정

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        // 20초 후 계좌 메인으로 리다이렉트
        const timer = setInterval(() => {
            setSecondsLeft((prevSeconds) => prevSeconds - 1);
        }, 1000); // 1초마다 secondsLeft 감소

        // 남은 시간이 0이면 리다이렉트 실행
        if (secondsLeft === 0) {
            location.replace(AppPaths.ACCOUNT);
            clearInterval(timer); // 타이머 정지
        }

        // 컴포넌트가 언마운트될 때 타이머 정리
        return () => clearInterval(timer);
    }, [secondsLeft]);

    const goHome = () => {
        location.replace(AppPaths.ACCOUNT);
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <St.MainContainer>
            <St.CenteredContainer style={{ gap: "2rem" }}>
                <St.CenteredContainer>
                    <img src="/images/check.webp" width={200} />
                    <h2>계좌 개설을 완료했습니다</h2>
                    {/* 남은 시간 표시 */}
                    <h4>{secondsLeft}초 후 자동으로 이동합니다</h4>{" "}
                </St.CenteredContainer>
                <St.ButtonContainer onClick={goHome}>
                    <Container color="yellow" shadow={true}>
                        메인으로 이동하기
                    </Container>
                </St.ButtonContainer>
            </St.CenteredContainer>
        </St.MainContainer>
    );
};

export default CreateComplete;
