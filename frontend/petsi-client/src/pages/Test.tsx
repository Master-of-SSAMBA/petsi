import { fetchPet } from "@/services/petServices";
import { bottomState, headerState } from "@/stores/useNavigationStore";
import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import * as St from "./Test.style";
import Container from "@/components/ui/_container/Container";
import { AppPaths } from "@/interfaces/AppPaths";

interface Age {
    year: number;
    month: number;
}

interface Pet {
    petId: number;
    name: string;
    birthDate: string; // "YYYY-MM-DD" 형식의 문자열
    age: Age;
    species: string;
    breed: string;
    gender: "MALE" | "FEMALE"; // "MALE"과 "FEMALE" 중 하나
    image: string; // 이미지 URL
    weight: number; // 소수점이 포함된 숫자 (체중)
}

const Test = () => {
    const setHeaderState = useSetRecoilState(headerState);
    const setBottomState = useSetRecoilState(bottomState);
    const [petList, setPetList] = useState<Pet[]>();
    const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
    const [daysTogether, setDaysTogether] = useState<number>(0);

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

        const fetchAndSetUserData = async () => {
            try {
                const response = await fetchPet();
                if (response) {
                    response.data = [];
                    const pets = response.data;
                    setPetList(pets);
                    setSelectedPet(pets[0]);
                }
            } catch (error) {
                console.error(error);
            }
            setDaysTogether(0);
        };
        fetchAndSetUserData();
    }, [setHeaderState, setBottomState]);

    const handlePetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedId = Number(event.target.value);
        if (petList) {
            const pet = petList.find((p) => p.petId === selectedId);
            if (pet) {
                setSelectedPet(pet);
            }
        }
    };
    return (
        <div>
            <St.PetProfile>
                {selectedPet && (
                    <>
                        <St.PetImage
                            src={selectedPet.image}
                            alt={selectedPet.name}
                        />
                        <div>
                            <St.PetName>{selectedPet.name}</St.PetName>
                            <St.PetInfo>{`${selectedPet.name}와 함께한 지 ${daysTogether}일 째 🐾`}</St.PetInfo>
                        </div>
                        <St.Dropdown onChange={handlePetChange}>
                            {petList?.map((pet) => (
                                <option key={pet.petId} value={pet.petId}>
                                    {pet.name}
                                </option>
                            ))}
                        </St.Dropdown>
                    </>
                )}
            </St.PetProfile>
            <St.Container>
                <Container
                    color="white"
                    shadow={true}
                    path={AppPaths.ACCOUNT}
                ></Container>
                <Container
                    color="white"
                    shadow={true}
                    path={AppPaths.EXPENSE}
                ></Container>
                <Container
                    color="white"
                    shadow={true}
                    path={AppPaths.PICTURE}
                    style={{ flexDirection: "column" }}
                >
                    <img src="/images/hellodog.png" alt="welcome" />
                    <h2>반려동물과 교감하고 이자를 받아보세요</h2>
                </Container>
            </St.Container>
        </div>
    );
};

export default Test;
