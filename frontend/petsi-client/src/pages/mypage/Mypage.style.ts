import styled from "styled-components";
import Paw from "@/assets/icons/Icon-paw.svg?react";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
    background-color: var(--color-beige);
`;

const Box = styled.div`
    display: flex;
    width: calc(100% - 3rem);
    flex-direction: column;
    justify-content: left;
    align-items: center;
    border: 1px solid var(--color-black);
    border-radius: 5px;
    box-shadow: var(--box-shadow-default);
    overflow: hidden;
    margin: 1.5rem;
    background-color: white;
    user-select: none;
`;

const Profile = styled.div`
    display: flex;
    width: 100%;
    gap: 1rem;
    padding: 1.5rem;

    img {
        width: 5rem;
        border-radius: 50%;
    }

    div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        line-height: 1.2rem;
    }

    h4,
    h5 {
        margin: 0;
    }

    h5 {
        color: var(--color-gray);
    }
`;

const MyPet = styled.div`
    width: 100%;
    padding-bottom: 1.5rem;
`;

const PetTitle = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.5rem;

    h4,
    h5 {
        margin: 0;
    }

    h5 {
        color: var(--color-gray);
    }
`;

const PetContainer = styled.div`
    display: flex;
    width: calc(100% - 1.5rem);
    gap: 1.5rem;
    margin-left: 1.5rem;
    transition: transform 0.3s ease-in-out;
    pointer-events: auto;
`;

const Pet = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 75%;
    height: 7.25rem;
    flex-shrink: 0;
    border: 1px solid var(--color-gray);
    border-radius: 5px;
    pointer-events: auto;

    .btn {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 2rem;

        span {
            line-height: 2rem;
            height: 100%;
            font-size: var(--font-body-h5);
            font-weight: 400;
        }
    }
`;

const PetInfo = styled.div`
    display: flex;
    width: 100%;
    height: 72%;
    justify-content: space-between;
    border-bottom: 1px solid var(--color-gray);
    padding: 1rem;

    img {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        object-fit: cover;
    }

    div {
        line-height: 1rem;
    }

    span {
        display: flex;
        align-items: center;
        margin-bottom: 0.125rem;
    }

    h4,
    h6 {
        margin: 0;
    }

    .pet-info {
        display: flex;
        align-items: center;
        gap: 0.8rem;
    }

    .icon {
        display: flex;
        width: 3.5rem;
        justify-content: end;
        align-items: start;
    }
`;

const AddPet = styled.div`
    display: flex;
    align-items: center;
    width: 75%;
    height: 7.25rem;
    flex-shrink: 0;
    border: 1px dashed var(--color-gray);
    border-radius: 5px;
    pointer-events: auto;
    padding: 1.5rem;
    gap: 1rem;

    div {
        display: flex;
        flex-direction: column;
        width: 3rem;
        height: 3rem;
        align-items: center;
        justify-content: center;
        text-align: center;
        border-radius: 50%;
        background-color: var(--color-lightgray);
    }

    h5,
    h6 {
        margin: 0;
        color: var(--color-gray);
    }

    h5 {
        line-height: 1rem;
    }
`;

const Menu = styled.div`
    display: flex;
    width: 100%;
    height: 4rem;
    align-items: center;
    padding: 1.5rem;
    border-bottom: 1px solid var(--color-lightgray);
    justify-content: space-between;
    background-color: white;
    cursor: pointer;

    h4 {
        margin: 0;
    }
`;

const BottomText = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    text-decoration: underline;
    color: var(--color-gray);
    background-color: white;
    align-items: flex-end;
    padding: 1rem;
    cursor: pointer;
`;

const IconContainer = styled(Paw)`
    width: 1rem;
    height: 1rem;
    color: var(--color-gray);
    margin-bottom: 0.125rem;
`;

export {
    Container,
    Box,
    Profile,
    MyPet,
    PetTitle,
    PetContainer,
    Pet,
    PetInfo,
    AddPet,
    Menu,
    BottomText,
    IconContainer,
};
