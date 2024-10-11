import Container from "@/components/ui/_container/Container";
import { bottomState, headerState } from "@/stores/useNavigationStore";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import * as St from "./Account.style";
import { AppPaths } from "@/interfaces/AppPaths";
// import More from "@/assets/icons/Icon-more.svg";
import { getAccountInfo } from "@/services/accountServices";
import { fetchPet } from "@/services/petServices";
import { useNavigate } from "react-router-dom";
import Loading from "@/components/ui/_loading/Loading";

interface Pet {
    petId: number;
    petName: string;
    petImg: string;
}

interface AccountInfo {
    accountId: number;
    name: string;
    balance: number;
    interestRate: number;
    petList: Pet[];
}

const Account = () => {
    const navigate = useNavigate();
    const setHeaderState = useSetRecoilState(headerState);
    const setBottomState = useSetRecoilState(bottomState);

    const [accountInfo, setAccountInfo] = useState<AccountInfo[]>([]);
    const [pictureCount, setPictureCount] = useState(0);
    const [interest, setInterest] = useState(0);
    const [loading, setLoading] = useState(true);

    const colors = ["lime", "pink", "red", "lightgray", "gray"]; // 색상 배열

    // 계좌 정보를 가져오는 useEffect
    useEffect(() => {
        const fetchAccountInfo = async () => {
            setLoading(true); // 데이터 페칭 전 로딩 시작
            try {
                const data = await getAccountInfo();
                setPictureCount(data.pictureCnt);
                setInterest(data.interest);
                setAccountInfo(data.accounts);
            } catch (error) {
                console.error("계좌 정보 가져오기 오류:", error);
            } finally {
                setLoading(false); // 데이터 페칭 완료 후 로딩 종료
            }
        };

        fetchAccountInfo();
    }, []);

    // 펫 정보를 가져오는 useEffect
    useEffect(() => {
        let isMounted = true; // 컴포넌트 마운트 상태 추적

        const fetchPetInfo = async () => {
            setLoading(true); // 데이터 페칭 전 로딩 시작
            try {
                const response = await fetchPet();
                if (isMounted && response && response.data) {
                    if (response.data.length === 0) {
                        alert(
                            "펫 등록이 필요합니다. 펫 등록 페이지로 이동합니다."
                        );
                        navigate(AppPaths.ADD_PET);
                    }
                }
            } catch (error) {
                console.error("펫 정보 가져오기 오류:", error);
            } finally {
                if (isMounted) setLoading(false); // 마운트된 상태일 때만 로딩 종료
            }
        };

        fetchPetInfo();

        // 컴포넌트 언마운트 시 isMounted 플래그 false로 설정
        return () => {
            isMounted = false;
        };
    }, [navigate]);

    useEffect(() => {
        setHeaderState({
            left: "",
            right: "alertActive",
            text: "나의 계좌",
            isVisible: true,
            color: "beige",
        });
        setBottomState({
            isVisible: true,
            activePage: "Account",
        });
    }, [setHeaderState, setBottomState]);

    const handleTransfer = (e: React.MouseEvent, accountId: number) => {
        // 이벤트 버블링 방지, 버블링되면 이체 후에 상세페이지로 라우팅
        e.stopPropagation();
        window.location.href = `/account/${accountId}/transfer1`;
    };

    const defaultPetImage = (pet: Pet) => {
        if (pet.petImg !== null) {
            return pet.petImg;
        } else {
            return "/images/petsi.webp";
        }
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <St.Container>
            <Container
                color="yellow"
                shadow={true}
                path={`${AppPaths.PRODUCT}/0`} /* 추후 상품 리스트 배열로 만들어서, 인덱스로 path 이동 해야함 */
            >
                <St.BoxItem>
                    <img
                        src="/images/piggybank.webp"
                        alt="piggybank"
                        style={{
                            width: "4rem",
                            height: "4rem",
                        }}
                    />
                    <h4>새로운 계좌 개설하기</h4>
                </St.BoxItem>
            </Container>

            <Container color="white" shadow={true} path={AppPaths.PICTURE}>
                <St.BoxItem>
                    <img
                        src="/images/camera.webp"
                        alt="camera"
                        style={{
                            width: "4rem",
                            height: "4rem",
                        }}
                    />
                    <St.BoxItemText>
                        <h4>인증하고 추가 이자 받기</h4>
                        <div>
                            {accountInfo.length > 0 ? (
                                <>
                                    <p>
                                        이번 달은 총 <b>{pictureCount}회</b>{" "}
                                        인증했어요
                                    </p>
                                    <p>
                                        예상 추가금리는 <b>{interest}%</b>
                                        입니다
                                    </p>
                                </>
                            ) : (
                                <p>등록된 계좌가 없습니다</p>
                            )}
                        </div>
                    </St.BoxItemText>
                </St.BoxItem>
            </Container>

            <St.AccountContainer>
                {accountInfo.length > 0 ? (
                    accountInfo.map((account, index) => (
                        <Container
                            key={account.accountId}
                            color={colors[index % colors.length]}
                            shadow={false}
                            path={`/account/${account.accountId}`}
                            backgroundColor={colors[index % colors.length]}
                            style={{ position: "relative" }}
                        >
                            <St.BoxItem>
                                <St.PetImage
                                    src={defaultPetImage(account.petList[0])}
                                    alt={account.petList[0].petName}
                                />
                                <St.BoxItemText>
                                    <div>
                                        <p>{account.name}</p>
                                    </div>
                                    <h4>
                                        {account.balance.toLocaleString()}원
                                    </h4>
                                </St.BoxItemText>
                                <St.BoxItemButton>
                                    <St.TransferButton
                                        onClick={(e) =>
                                            handleTransfer(e, account.accountId)
                                        }
                                    >
                                        <St.ButtonText>이체</St.ButtonText>
                                    </St.TransferButton>
                                </St.BoxItemButton>
                            </St.BoxItem>
                        </Container>
                    ))
                ) : (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            height: "100%",
                        }}
                    >
                        <img
                            src="/images/emptysafe.webp"
                            alt="emptysafe"
                            style={{
                                width: "16rem",
                                height: "16rem",
                            }}
                        />
                        <h3>아직 계좌가 없어요</h3>
                    </div>
                )}
            </St.AccountContainer>
        </St.Container>
    );
};

export default Account;
