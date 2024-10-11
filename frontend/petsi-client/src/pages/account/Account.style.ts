import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    min-height: 640px;
    gap: 1.8rem;
    padding: 1rem;
    background-color: white;
`;

const BoxItem = styled.div`
    display: flex;
    width: 100%;
    align-items: center;
    gap: 2rem;
    padding: 0 0.5rem;
`;

const BoxItemText = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h4 {
        margin: 0;
    }

    p {
        font-size: var(--font-body-h5);
    }

    div {
        p {
            margin: 0;
        }
        gap: 0;
    }
`;

const AccountContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.625rem;
    align-self: stretch;
`;

const PetImage = styled.img`
    width: 2rem;
    height: 2rem;
`;

const BoxItemButton = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    position: absolute;
    bottom: 0.75rem;
    right: 0.75rem;
    gap: 0.5rem;
`;

const TransferButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    border: 1px solid var(--color-black);
    border-radius: 5px;
    background-color: var(--color-white);
    box-shadow: var(--box-shadow-default);
    padding: 0.4rem 0.6rem;
    cursor: pointer;
`;

const ButtonText = styled.h5`
    margin: 0;
`;

export {
    Container,
    BoxItem,
    BoxItemText,
    AccountContainer,
    PetImage,
    BoxItemButton,
    TransferButton,
    ButtonText,
};
