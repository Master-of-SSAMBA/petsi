import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 1.5rem;
    background-color: var(--color-beige);
    height: 84vh;
`;

const HeaderButton = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 1rem;
`;

const Inner = styled.div`
    display: flex;
    background-color: var(--color-white);
    margin-right: 2rem;
`;

const NoticeIcon = styled.img`
    width: 3rem;
    margin-right: 2rem;
`;

const ButtonContainer = styled.div`
    position: absolute;
    text-align: right;
    top: 0.5rem;
    right: 0.5rem;
`;

const DateContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export {
    Container,
    HeaderButton,
    Inner,
    NoticeIcon,
    ButtonContainer,
    DateContainer,
};
