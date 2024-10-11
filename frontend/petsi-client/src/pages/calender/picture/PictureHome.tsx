import { bottomState, headerState } from "@/stores/useNavigationStore";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import Container from "@/components/ui/_container/Container";
import { AppPaths } from "@/interfaces/AppPaths";
import * as St from "./PictureHome.style";

import Camera from "@/assets/icons/Icon-camera.svg";
import Walk from "@/assets/icons/Icon-walk.svg";
import { useNavigate } from "react-router-dom";
import { fetchPictureCount } from "@/services/pictureServices";

interface PictureState {
    pictureCnt: number | null;
    interestRate: number | null;
    error: string | null;
}

const PictureHome = () => {
    const setHeaderState = useSetRecoilState(headerState);
    const setBottomState = useSetRecoilState(bottomState);

    const navigate = useNavigate();

    const [pictureState, setPictureState] = useState<PictureState>({
        pictureCnt: null,
        interestRate: null,
        error: null,
    });

    useEffect(() => {
        setHeaderState({
            left: "backArrow",
            right: "alertActive",
            text: "매일 인증하기",
            isVisible: true,
            color: "beige",
        });
        setBottomState({
            isVisible: true,
            activePage: "Calendar",
        });

        const setPictureCount = async () => {
            try {
                const res = await fetchPictureCount();
                setPictureState({
                    pictureCnt: res.pictureCnt,
                    interestRate: res.interestRate,
                    error: null,
                });
            } catch (error) {
                console.error("Error fetching picture count", error);
                setPictureState({
                    pictureCnt: null,
                    interestRate: null,
                    error: "Failed to fetch picture count",
                });
            }
        };

        setPictureCount(); // 데이터 비동기 호출
    }, [setHeaderState, setBottomState]);

    return (
        <St.ContinerLayout>
            <Container color="white" shadow={true}>
                <St.ContentWrapper
                    onClick={() => {
                        navigate(AppPaths.PICTURE_CREATE);
                    }}
                >
                    <St.ItemIcon src={Camera} />
                    <St.Description>
                        <St.Title>사진 인증하고 이자 더 받기</St.Title>
                        <St.SubTitleWrapper>
                            {pictureState.pictureCnt === null ||
                            pictureState.pictureCnt === undefined ||
                            pictureState.pictureCnt === 0 ? (
                                <>
                                    <St.SubTitle>
                                        이번 달은 아직 인증이 없어요
                                    </St.SubTitle>
                                    <St.SubTitle>
                                        인증하고 추가금리를 받아보세요
                                    </St.SubTitle>
                                </>
                            ) : (
                                <>
                                    <St.SubTitle>
                                        이번 달은 총{" "}
                                        <strong>
                                            {pictureState.pictureCnt}회
                                        </strong>{" "}
                                        인증했어요
                                    </St.SubTitle>
                                    <St.SubTitle>
                                        예상 추가금리는{" "}
                                        <St.RedText>
                                            {pictureState.interestRate}%
                                        </St.RedText>{" "}
                                        입니다
                                    </St.SubTitle>
                                </>
                            )}
                        </St.SubTitleWrapper>
                    </St.Description>
                </St.ContentWrapper>
            </Container>
            <Container
                color="yellow"
                shadow={true}
                path={AppPaths.PICTURE_ALBUM}
            >
                <St.BigContentWrapper>
                    <St.BigItemIcon src={Walk} />
                    <St.BigDescription>
                        <St.Title>인증 기록 모아보기</St.Title>
                        <St.SubTitleWrapper>
                            <St.SubTitle>반려동물과의 추억 기록을</St.SubTitle>
                            <St.SubTitle>여기서 확인해보세요</St.SubTitle>
                        </St.SubTitleWrapper>
                    </St.BigDescription>
                </St.BigContentWrapper>
            </Container>
        </St.ContinerLayout>
    );
};

export default PictureHome;
