import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem 1.5rem;
    min-height: calc(100vh - 122px);
    background-color: var(--color-beige);
    gap: 2rem;
`;

export const AnalysisWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 2rem;
    border: 1px solid black;
    border-radius: 10px;
    box-shadow: var(--box-shadow-default);
    background-color: white;
    gap: 1.5rem;
`;

export const UserData = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    img {
        height: 3.75rem;
        width: 3.75rem;
        border-radius: 50%;
    }

    .strong-text {
        font-weight: 400;
    }

    .total-cost {
        font-size: var(--font-title-h3);
        font-weight: 400;
    }
`;

export const ChartAnalysis = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
`;

export const Category = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    .category-left {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .circle {
        width: 0.7rem;
        height: 0.7rem;
        border-radius: 50%;
    }

    .label {
        font-size: var(--font-body-h5);
        font-weight: 400;
    }

    .rate {
        font-size: var(--font-body-h5);
    }
`;

export const Button = styled.div`
    border: 1px solid #bebebe;
    border-radius: 5px;
    padding: 0.5rem;
    text-align: center;
`;

export const AddButton = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    justify-content: end;
    margin-left: auto;
`;

export const IconBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3rem;
    height: 3rem;
    border: 1px solid black;
    border-radius: 5px;
    box-shadow: var(--box-shadow-default);
    background-color: var(--color-yellow);
`;

export const IconWrapper = styled.div<{ $isOpen: boolean }>`
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;

    transform: ${({ $isOpen }) => ($isOpen ? "rotate(45deg)" : "rotate(0deg)")};
`;

export const Dropdown = styled.div<{ $isOpen: boolean }>`
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: end;
    max-width: 480px;
    position: absolute;
    bottom: 3.5rem;
    gap: 0.6rem;

    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    transition:
        max-height 0.5s ease,
        opacity 0.5s ease;
`;

export const DropdownItem = styled.div<{ $isOpen: boolean }>`
    display: flex;
    width: 16rem;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 1rem 1.2rem;
    box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
    background-color: white;
    border-radius: 5px;
    transition:
        opacity 0.3s ease,
        transform 0.3s ease;
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    height: 2.8rem;
    max-height: 2.8rem;
    user-select: none;
    cursor: pointer;

    &:hover {
        background-color: #f0f0f0;
    }

    span {
        font-size: var(--font-body-h4);
        font-weight: 400;
    }
`;
