import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1.5rem;
    position: relative;
`;

export const ItemWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

export const CategoryTitle = styled.div`
    span {
        font-size: var(--font-title-h4);
        font-weight: 400;
    }
`;

export const OutletContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 1.5rem;
`;

export const SubmitButton = styled.div<{ $valid: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    width: 100%;
    max-width: 480px;
    height: 3.5rem;
    bottom: 0;
    background-color: ${({ $valid }) =>
        $valid ? "var(--color-beige)" : "var(--color-lightgray)"};
    z-index: 1;
    text-align: center;

    span {
        font-size: var(--font-title-h4);
        font-weight: 400;
    }
`;
