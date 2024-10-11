import { useRecoilState } from "recoil";
import * as St from "./PetNav.style";
import { petListState } from "@/stores/usePetStore";
import Loading from "../ui/_loading/Loading";
import { fetchPet } from "@/services/petServices";
import { useEffect, useState } from "react";

interface NavProps {
    selectEvent: (id: number) => void;
    selectedPetId: number | number[] | null;
}

const PetNav = (props: NavProps) => {
    const [loading, setLoading] = useState(true);
    const { selectEvent, selectedPetId } = props;
    const [petList, setPetList] = useRecoilState(petListState);

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const response = await fetchPet();
                if (isMounted) {
                    if (response && response.status) {
                        setPetList(response.data);
                    }
                    setLoading(false);
                }
            } catch (error) {
                console.error(error);
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [setPetList]);

    const defaultPetImage = (imageSrc: string) => {
        if (imageSrc !== null) {
            return imageSrc;
        } else {
            return "/images/petsi.webp";
        }
    };

    const isSelectedPet = (petId: number) => {
        if (Array.isArray(selectedPetId)) {
            return selectedPetId.includes(petId);
        }
        return selectedPetId === petId;
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <St.Container>
            {petList.map((pet) => (
                <St.PetItem
                    key={pet.petId}
                    onClick={() => selectEvent(pet.petId)}
                    isSelected={isSelectedPet(pet.petId)}
                >
                    <St.PetImage>
                        <img
                            src={defaultPetImage(pet.image)}
                            alt={pet.name}
                            style={{ borderRadius: "50%" }}
                        />
                    </St.PetImage>
                    <h5>{pet.name}</h5>
                </St.PetItem>
            ))}
        </St.Container>
    );
};

export default PetNav;
