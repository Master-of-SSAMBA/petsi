import styled from "styled-components";

export const Layout = styled.div`
    display: flex;
    width: 85%;
    height: 74vh;
    margin: 0 auto;
    flex-direction: column;
    padding-top: 18%;
    gap: 2rem;

    .welcome-msg {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        /* gap: 0.8rem; */
    }
`;

export const TitleMsg = styled.span`
    font-size: var(--font-title-h3);
    font-weight: 500;
`;

export const InputSection = styled.div`
    text-align: end;

    div {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
`;

export const BtnSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const FindPassword = styled.p`
    margin-top: 1rem;

    h4 {
        margin: 0;
        color: var(--color-gray);
    }
`;

export const ErrorMessage = styled.h5`
    color: var(--color-red);
`;
