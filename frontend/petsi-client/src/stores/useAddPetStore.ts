import { atom } from "recoil";

export interface PartialPetInfo {
    species: string;
    name: string;
}

export const partialPetState = atom<PartialPetInfo>({
    key: "partialPetState",
    default: {
        species: "",
        name: "",
    },
});
