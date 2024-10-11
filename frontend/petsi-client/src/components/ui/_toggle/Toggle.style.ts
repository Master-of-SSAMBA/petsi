import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 3.3rem;
    background-color: var(--color-beige);
    border: 1px solid black;
    border-radius: 5px;
    padding: 0.4rem;
    box-shadow: var(--box-shadow-default);
`;

export const Button = styled.button<{ $active: boolean }>`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    height: 100%;
    background-color: ${({ $active }) =>
        $active ? "var(--color-yellow)" : "transparent"};
    border: ${({ $active }) => ($active ? "1px solid black" : "none")};
    border-radius: 5px;
    font-size: var(--font-body-h4);
    cursor: pointer;

    &:first-child {
        margin-right: 10px;
    }

    &:hover {
        opacity: 0.8;
    }

    span {
        font-weight: 400;
        text-align: center;
    }
`;
