import styled from "styled-components";

const MainContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 2rem;
    gap: 2rem;

    img {
        width: 5rem;
    }

    h2,
    h3 {
        margin: 0;
    }
`;

const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4rem;
`;

const CenteredContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
        padding: 3rem 0;
        width: 14rem;
    }
`;

const DocsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const DocsHeader = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.2rem;

    h3 {
        margin: 0;
    }
`;

const DocsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.4rem;

    p {
        margin: 0;
        color: var(--color-gray);
    }
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const InputTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 2px;
    margin-bottom: 1rem;

    h4 {
        margin: 0;
    }

    span {
        color: var(--color-red);
    }
`;

const MyPetContainer = styled.div`
    height: 10rem;
    margin-top: 15px;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;

    overflow: auto;

    border: 1px solid var(--color-gray);
    border-radius: 5px;
    padding: 0.5rem 2rem;
`;

const MyPet = styled.div<{ isSelected: boolean }>`
    display: flex;
    align-items: center;
    background-color: ${({ isSelected }) =>
        isSelected ? "var(--color-lightgray)" : "var(--color-white)"};
    border-radius: 5px;
    padding: 0.6rem;

    .petImage {
        width: 2rem;
        border-radius: 20%;
    }

    .petName {
        font-weight: 400;
    }
`;

const ButtonContainer = styled.div`
    margin-top: 0.5rem;
`;

export {
    MainContainer,
    InnerContainer,
    CenteredContainer,
    DocsContainer,
    DocsHeader,
    DocsList,
    InputContainer,
    InputTitle,
    MyPetContainer,
    MyPet,
    ButtonContainer,
};
