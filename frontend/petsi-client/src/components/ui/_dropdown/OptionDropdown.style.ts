import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    height: 3.75rem;
    width: 100%;
    border-bottom: 1px solid black;
`;

export const Category = styled.div`
    display: flex;
    font-size: var(--font-title-h4);
    font-weight: 400;
    width: 27%;
    color: var(--color-gray);
`;

export const Input = styled.input`
    width: 60%;
    flex-grow: 1;
    font-size: var(--font-title-h4);
    color: black;
`;

export const Select = styled.select`
    width: 60%;
    flex-grow: 1;
    font-size: var(--font-title-h4);
    color: black;
`;

export const ClearButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 10px;
    cursor: pointer;
`;
