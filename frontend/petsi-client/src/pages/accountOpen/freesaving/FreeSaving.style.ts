import styled, { keyframes } from "styled-components";

interface StyleProps {
    color?: string;
}

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const fadeIn = keyframes`
        0% {
            opacity: 0;
            transform: translateY(30px); /* 30px 아래에 숨어 있음 */
        }
        100% {
            opacity: 1;
            transform: translateY(0); /* 정상 위치 */
        }
    `;

const Description = styled.div<StyleProps>`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    white-space: pre-line;
    padding: 3rem 2rem;
    gap: 2rem;
    background-color: ${({ color }) =>
        color ? `var(--color-${color})` : "var(--color-white)"};

    img {
        display: block;
        margin: 0 auto;
        margin-bottom: 1rem;
        width: 260px;
    }

    opacity: 0;
    transform: translateY(30px);
    transition:
        opacity 0.8s ease,
        transform 0.8s ease;

    &.fade-in {
        animation: ${fadeIn} 1.5s ease forwards; /* 애니메이션 적용 */
    }
`;

export { Container, Description };
