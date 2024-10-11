import styled, { keyframes } from "styled-components";

const slideUp = keyframes`
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0%);
    opacity: 1;
  }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 2rem;
`;

const CenteredContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    gap: 1.4rem;
    height: 80vh;
`;

const InnerContainer = styled.div<{ isVisible?: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: 100%;

    animation: ${({ isVisible }) => (isVisible ? slideUp : "none")} 1s ease-out;
`;

const DestinationContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 0.4rem;
    width: 100%;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const InputTitle = styled.div`
    display: flex;
    align-items: center;
    gap: 0.4rem;

    span {
        color: var(--color-red);
    }
`;

const AmountContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 3rem 0;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    width: 100%;
    margin-top: 1rem;
`;

export {
    Container,
    CenteredContainer,
    InnerContainer,
    DestinationContainer,
    InputContainer,
    InputTitle,
    AmountContainer,
    ButtonContainer,
};
