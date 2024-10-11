import { atom } from "recoil";

export interface Pet {
    petId: number;
    name: string;
    image: string;
    birthDate: string;
    species: string;
    breed: string;
    gender: string;
    weight: number;
}

export const petListState = atom<Pet[]>({
    key: "petList",
    default: [],
});
