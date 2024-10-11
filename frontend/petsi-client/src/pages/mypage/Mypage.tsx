import { bottomState, headerState } from "@/stores/useNavigationStore";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import * as St from "./Mypage.style";
import Female from "@/assets/icons/Icon-female.svg?react";
import Male from "@/assets/icons/Icon-male.svg?react";
import Arrow from "@/assets/icons/Icon-arrow-right.svg?react";
import Delete from "@/assets/icons/Icon-close.svg?react";
import { useNavigate } from "react-router-dom";
import { AppPaths } from "@/interfaces/AppPaths";
import { userLogOut } from "@/services/authServices";
import { fetchUserData, leaveUser } from "@/services/userServices";
import Modal from "@/components/ui/_modal/Modal";
import { deletePetData } from "@/services/petServices";

interface UserData {
    email: string;
    nickname: string;
    profileImage: string | null;
}

interface PetData {
    petId: number;
    name: string;
    petImg: string;
    birthDate: string;
    species: string;
    breed: string;
    gender: string;
    weight: number;
    image: string | null;
}

const Mypage = () => {
    const navigate = useNavigate();
    const setHeaderState = useSetRecoilState(headerState);
    const setBottomState = useSetRecoilState(bottomState);
    const [userData, setUserData] = useState<UserData>();
    const [petList, setPetList] = useState<PetData[]>([]);
    const [petId, setPetId] = useState<number>();
    const [currentIndex, setCurrentIndex] = useState(0); // 현재 슬라이드 위치
    const [startX, setStartX] = useState(0); // 터치 시작 X 좌표
    const [isDragging, setIsDragging] = useState(false);
    const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);
    const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const handlePointerDown = (e: React.PointerEvent) => {
        setStartX(e.clientX);
        setIsDragging(true);
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        if (!isDragging) return;

        const endX = e.clientX;
        const deltaX = endX - startX;
        setIsDragging(false);
        if (deltaX > 50 && currentIndex > 0) {
            // 오른쪽에서 왼쪽으로 스와이프 -> 이전 Pet으로 이동
            setCurrentIndex(currentIndex - 1);
        } else if (deltaX < -50 && currentIndex < petList.length) {
            // 왼쪽에서 오른쪽으로 스와이프 -> 다음 Pet으로 이동
            setCurrentIndex(currentIndex + 1);
        }
    };

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
            activePage: "Mypage",
        });

        const fetchAndSetUserData = async () => {
            try {
                const data = await fetchUserData();
                const { nickname, email, profileImage, pets } = data;
                setUserData({ nickname, email, profileImage });
                setPetList(pets);
            } catch (error) {
                console.error(error);
            }
        };
        fetchAndSetUserData();
    }, [setHeaderState, setBottomState]);

    const handleLogout = () => {
        userLogOut();
    };

    const handleLeave = async () => {
        try {
            const response = await leaveUser();

            if (response) {
                navigate(AppPaths.LOGIN);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const deletePet = (id: number) => {
        setPetId(id);
        setIsDeleteModalOpen(true);
    };

    const handleDeletePet = async () => {
        try {
            if (!petId) return;
            const response = await deletePetData(petId);
            if (response) {
                confirm("삭제에 성공하였습니다!");
                const fetchAndSetUserData = async () => {
                    try {
                        const data = await fetchUserData();
                        const { nickname, email, profileImage, pets } = data;
                        setUserData({ nickname, email, profileImage });
                        setPetList(pets);
                    } catch (error) {
                        console.error(error);
                    }
                };
                fetchAndSetUserData();
                navigate(AppPaths.MYPAGE);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <St.Container>
            <St.Box>
                <St.Profile>
                    {userData?.profileImage === null ? (
                        <img src={`/images/user.webp`} alt="profile img" />
                    ) : (
                        <img src={userData?.profileImage} alt="profile img" />
                    )}
                    <div>
                        <h4>{userData?.nickname}님, 안녕하세요!</h4>
                        <h5>{userData?.email}</h5>
                    </div>
                </St.Profile>
                <St.MyPet>
                    <St.PetTitle>
                        <h4>나의 펫</h4>
                        {/* <h5>전체보기</h5> */}
                    </St.PetTitle>
                    <St.PetContainer
                        onPointerDown={handlePointerDown}
                        // onPointerMove={handlePointerMove}
                        onPointerUp={handlePointerUp}
                        style={{
                            transform: `translateX(calc(${-currentIndex * 81}%))`,
                        }}
                    >
                        {petList?.length > 0 &&
                            petList.map((pet, index) => (
                                <St.Pet key={index}>
                                    <St.PetInfo>
                                        <div className="pet-info">
                                            <img
                                                src={
                                                    pet.image ||
                                                    `/images/${pet.species}.webp`
                                                }
                                                alt="pet image"
                                            />
                                            <div>
                                                <span>
                                                    <h4>{pet.name}</h4>
                                                    {pet.gender === "FEMALE" ? (
                                                        <Female />
                                                    ) : (
                                                        <Male />
                                                    )}
                                                </span>
                                                <h5>{pet.breed}</h5>
                                                <h5>{pet.weight}kg</h5>
                                            </div>
                                        </div>
                                        <div
                                            className="icon"
                                            onClick={() => deletePet(pet.petId)}
                                        >
                                            <Delete />
                                        </div>
                                    </St.PetInfo>
                                    <div
                                        className="btn"
                                        onClick={() =>
                                            navigate(`/edit-pet/${pet.petId}`, {
                                                state: { petId: pet.petId },
                                            })
                                        }
                                    >
                                        <h5>수정하기</h5>
                                    </div>
                                </St.Pet>
                            ))}
                        <St.AddPet>
                            <div onClick={() => navigate(AppPaths.ADD_PET)}>
                                <St.IconContainer />
                                <h6>
                                    반려동물
                                    <br />
                                    추가
                                </h6>
                            </div>
                            <h5>
                                {userData?.nickname}님의 반려동물은 <br />
                                어떤 친구인가요?
                            </h5>
                        </St.AddPet>
                    </St.PetContainer>
                </St.MyPet>
            </St.Box>
            <St.Menu
                onClick={() => {
                    navigate(AppPaths.CHANGE_PASSWORD);
                }}
            >
                <h4>비밀번호 변경</h4>
                <Arrow />
            </St.Menu>
            <St.Menu onClick={() => setIsLeaveModalOpen(true)}>
                <h4>회원 탈퇴</h4>
                <Arrow />
            </St.Menu>
            <St.Menu onClick={() => setIsLogoutModalOpen(true)}>
                <h4>로그아웃</h4>
                <Arrow />
            </St.Menu>
            <Modal
                state={"LeaveConfirm"}
                isOpen={isLeaveModalOpen}
                onClose={() => setIsLeaveModalOpen(false)}
                onButtonClick={() => handleLeave()}
            />
            <Modal
                state={"Logout"}
                isOpen={isLogoutModalOpen}
                onClose={() => setIsLogoutModalOpen(false)}
                onButtonClick={() => handleLogout()}
            />
            <Modal
                state={"DeletePet"}
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onButtonClick={() => handleDeletePet()}
            />
        </St.Container>
    );
};

export default Mypage;
