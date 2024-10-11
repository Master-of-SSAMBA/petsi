import styled from "styled-components";
import Check from "@/assets/icons/Icon-check.svg?react";

interface InputProps {
    $shadow?: boolean;
    $innerBtn?: string | undefined;
    $btnOn?: boolean;
}

export const InputContainer = styled.div`
    position: relative;
    width: 100%;
`;

export const InputField = styled.input<InputProps>`
    display: flex;
    width: 100%;
    height: 48px;
    padding: 0.625rem;
    padding-right: ${(props) => (props.$innerBtn ? "3rem" : "0.625rem")};
    border: 1px solid var(--color-gray);
    border-radius: 5px;
    font-size: var(--font-body-h4);
    outline: none;
    transition: all 0.3s;
    box-shadow: ${(props) =>
        props.$shadow ? "var(--box-shadow-default)" : "none"};

    &:focus {
        border-color: var(--color-black);
        border: 2px solid var(--color-black);
    }

    &:focus + label,
    &:not(:placeholder-shown) + label,
    &:not([value=""]) + label {
        top: 1px;
        left: 10px;
        font-size: var(--font-body-h5);
        color: var(--color-black);
    }
`;

export const InputLabel = styled.label`
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-gray);
    font-size: 16px;
    transition: all 0.3s;
    padding: 0 5px;
    background-color: white;
    pointer-events: none;
`;

export const InnerButton = styled.button<InputProps>`
    position: absolute;
    top: 50%;
    right: 0.625rem;
    transform: translateY(-50%);
    padding: 0.625rem;
    font-size: var(--font-body-h5);
    background-color: ${(props) =>
        props.$btnOn ? "var(--color-yellow)" : "var(--color-lightgray)"};
    border: 1px solid var(--color-gray);
    border-radius: 5px;
    cursor: pointer;
`;

export const CheckIcon = styled(Check)`
    width: 1rem;
    height: 1rem;
`;
