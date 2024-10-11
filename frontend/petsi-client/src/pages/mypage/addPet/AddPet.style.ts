import styled from "styled-components";
import Camera from "@/assets/icons/Icon-camera-2.svg?react";
import Upload from "@/assets/icons/Icon-upload-2.svg?react";

export const Container = styled.div`
    display: flex;
    position: relative;
    flex-direction: column;
    width: 100%;
    padding: 1.5rem;
    gap: 1rem;

    h2 {
        margin: 0;
    }
`;

export const SelectSpecies = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    gap: 2rem;
`;

export const Species = styled.div`
    img {
        width: 9rem;
        border-radius: 50%;
        border: 2px solid var(--color-lightgray);
        margin-bottom: 0.625rem;
    }

    div {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 0.188rem;
    }
`;

export const CustomRadio = styled.input.attrs({ type: "radio" })`
    appearance: none;
    width: 1rem;
    height: 1rem;
    border: 2px solid var(--color-lightgray);
    border-radius: 50%;
    position: relative;
    margin: 0;
    transition:
        border-color 0.3s ease,
        background-color 0.3s ease;

    &:checked {
        border-color: var(--color-red);
        background-color: white;
    }

    &:checked::after {
        content: "";
        display: block;
        width: 0.5rem;
        height: 0.5rem;
        background-color: var(--color-red);
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
`;

export const Input = styled.div`
    margin-top: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h4 {
        margin: 0;
    }

    div {
        display: flex;
        gap: 0.125rem;
    }

    span {
        color: var(--color-red);
    }
`;

export const FormWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const ErrorMsg = styled.span`
    display: flex;
    font-size: 0.875rem;
    font-weight: 400;
    margin-top: 0.3rem;
    color: var(--color-red);
`;

export const Button = styled.button`
    position: fixed;
    width: 100%;
    max-width: 480px;
    height: 3.5rem;
    bottom: 0;
    background-color: var(--color-beige);
    z-index: 1;
    text-align: center;

    span {
        font-size: var(--font-title-h4);
        font-weight: 400;
    }
`;

// Step2

export const Image = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;

    .pet-image {
        display: flex;
        width: 10rem;
        height: 10rem;
        justify-content: center;
        align-items: center;
        background-color: var(--color-beige);
        border-radius: 50%;
        position: relative;

        img {
            object-fit: cover;
            border-radius: 50%;
        }
    }

    .icon-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        bottom: 0;
        right: 0;
        width: 3rem;
        height: 3rem;
        background-color: var(--color-lightgray);
        border-radius: 50%;
    }
`;

export const GenderWrap = styled.div`
    display: flex;
    gap: 0.5rem;

    h4 {
        color: var(--color-gray);
        margin: 0;
    }
`;

export const Gender = styled.div<{ $selected: "MALE" | "FEMALE" | null }>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 2.5rem;
    border-radius: 5px;
    border: 1px solid var(--color-gray);
    background-color: ${({ $selected }) =>
        $selected === null ? "var(--color-white)" : "var(--color-lime)"};
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
`;

export const CameraIcon = styled(Camera)`
    width: 5rem;
    height: 5rem;
`;

export const UploadIcon = styled(Upload)`
    width: 2rem;
    height: 2rem;
`;

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

export const WeightInput = styled.input`
    width: 100%;
    height: 3rem;
    padding: 1rem;
    font-size: var(--font-body-h4);
    border: 1px solid var(--color-gray);
    border-radius: 5px;

    &:focus {
        border-color: black;
    }
`;
