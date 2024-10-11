import { fetchUserData } from "@/services/userServices";
import { bottomState, headerState } from "@/stores/useNavigationStore";
import { petListState } from "@/stores/usePetStore";
import { userInfoState } from "@/stores/useUserStore";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import * as St from "./Home.style";
import ArrowRight from "@/assets/icons/Icon-arrow-right.svg?react";
import { useNavigate } from "react-router-dom";
import { AppPaths } from "@/interfaces/AppPaths";

const Home = () => {
    const navigate = useNavigate();
    const setHeaderState = useSetRecoilState(headerState);
    const setBottomState = useSetRecoilState(bottomState);
    const setUserInfoState = useSetRecoilState(userInfoState);
    const setPetListState = useSetRecoilState(petListState);

    useEffect(() => {
        setHeaderState({
            left: "",
            right: "",
            text: "",
            isVisible: false,
            color: "beige",
        });
        setBottomState({
            isVisible: true,
            activePage: "Home",
        });
    }, [setHeaderState, setBottomState]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchUserData();

                console.log(response);

                setUserInfoState({
                    userId: response.userId,
                    nickname: response.nickname,
                    email: response.email,
                    profileImage: response.profileImage,
                });

                setPetListState(response.pets);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [setUserInfoState, setPetListState]);

    return (
        <St.Container>
            <St.Box>
                <div className="title">
                    <h3>반려동물과의 소중한 시간,</h3>
                    <div
                        style={{
                            display: "flex",
                            gap: "0.4rem",
                            alignItems: "center",
                        }}
                    >
                        <h3>Petsi</h3>
                        <St.PawIcon />
                    </div>
                </div>
                <div
                    className="login"
                    onClick={() => {
                        navigate(AppPaths.LOGIN);
                    }}
                >
                    <h4>로그인하러 가기</h4>
                    <ArrowRight />
                </div>
                <img
                    src={`/images/home/petsi.webp`}
                    alt="Empty state image"
                    className="petsi"
                />
            </St.Box>
            <St.Box>
                <div className="title">
                    <h3>관련 지출 내역을</h3>
                    <h3>용도 별로 모아보세요</h3>
                </div>
                <div className="login">
                    <h4>
                        반려동물과 관련된 소비내역을 <br /> 펫시와 함께
                        관리해보세요
                    </h4>
                </div>
                <img
                    src={`/images/home/chart.webp`}
                    alt="Empty state image"
                    className="petsi"
                />
            </St.Box>
            <St.Box>
                <div className="title">
                    <h3>추억을 기록하고</h3>
                    <h3>추가 금리를 받아보세요</h3>
                </div>
                <div className="login">
                    <h4>
                        하루에 한 번, 사랑하는 반려동물과
                        <br />
                        추억을 남기면 금리가 높아집니다
                    </h4>
                </div>
                <img
                    src={`/images/home/picture.webp`}
                    alt="Empty state image"
                    className="petsi"
                />
            </St.Box>
            <St.Box>
                <div className="title">
                    <h3>알림으로 관리하는</h3>
                    <h3>손 쉬운 일정관리</h3>
                </div>
                <div className="login">
                    <h4>
                        달력과 알림을 통해
                        <br />
                        반려동물 일정을 관리해보세요
                    </h4>
                </div>
                <img
                    src={`/images/home/alert.webp`}
                    alt="Empty state image"
                    className="petsi"
                />
            </St.Box>
        </St.Container>
    );
};

export default Home;
