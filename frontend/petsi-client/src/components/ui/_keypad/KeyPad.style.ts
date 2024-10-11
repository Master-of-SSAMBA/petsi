import styled from "styled-components";

const Keypad = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    width: 100%;
    margin: 1.5rem 0;
`;

const KeypadButton = styled.button`
    background-color: var(--color-beige);
    padding: 1rem 2rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const KeyPadNumber = styled.h4`
    text-align: center;
    margin: 0;
`;

const KeyPadFont = styled.h5`
    text-align: center;
    margin: 0;
`;

export { Keypad, KeypadButton, KeyPadNumber, KeyPadFont };
