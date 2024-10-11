import styled from "styled-components";

interface MsgProps {
    $status?: string;
}

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1.5rem;
    gap: 1.5rem;
    position: relative;
`;

export const Msg = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin: 0.5rem 0;

    h3,
    h4 {
        margin: 0;
    }
`;

export const InputBox = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
`;

export const CheckEmailBtn = styled.div`
    width: 2rem;
    height: 2rem;
    border: 1px solid red;
`;

export const ErrorMsg = styled.div<MsgProps>`
    color: ${(props) => (props.$status === "check" ? "green" : "red")};
    font-size: 0.875rem;
    margin-bottom: 0.3rem;
`;

export const SubmitButton = styled.div`
    position: fixed;
    display: flex;
    width: 100%;
    max-width: 480px;
    height: 3.5rem;
    bottom: 0;
    align-items: center;
    justify-content: center;
    background-color: var(--color-beige);
    z-index: 1;

    span {
        font-size: var(--font-title-h4);
        font-weight: 400;
    }
`;
