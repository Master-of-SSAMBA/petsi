import styled from "styled-components";

interface TextareaProps {
    $borderColor: string;
    $backgroundColor: string;
    $shadow: boolean;
}

export const TextareaContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const StyledTextarea = styled.textarea<TextareaProps>`
    width: 100%;
    border: 1px solid ${(props) => props.$borderColor};
    border-radius: 5px;
    background-color: ${(props) => props.$backgroundColor};
    box-shadow: ${(props) =>
        props.$shadow ? "var(--box-shadow-default)" : "none"};
    padding: 1rem;
    font-size: 1rem;
    resize: vertical; // 사용자가 수직으로만 크기를 조절할 수 있도록
    min-height: 7rem;
    max-height: 10rem;
    overflow-y: auto;

    &:focus {
        outline: none;
        border-color: var(--color-blue); // 포커스 시 테두리 색상 변경
    }
`;

export const CharCount = styled.div`
    font-size: 0.875rem;
    color: var(--color-gray);
    margin-top: 0.5rem;
    text-align: right;
`;
