import styled from "styled-components";

interface BtnContainerProps {
    color: string;
    $size: "small" | "large";
    $shadow: boolean;
}

interface BtnTextProps {
    $size: "small" | "large";
}

export const BtnContainer = styled.button<BtnContainerProps>`
    display: flex;
    width: 100%;
    height: ${(props) => (props.$size === "small" ? "35px" : "50px")};
    justify-content: center;
    align-items: center;
    border: 1px solid var(--color-black);
    border-radius: 5px;
    background-color: ${(props) => `var(--color-${props.color})`};
    box-shadow: ${(props) =>
        props.$shadow ? "var(--box-shadow-default)" : "none"};
`;

export const BtnText = styled.span<BtnTextProps>`
    font-size: ${(props) =>
        props.$size === "small"
            ? "var(--font-title-h5)"
            : "var(--font-title-h4)"};
    font-weight: ${(props) => (props.$size === "small" ? "300" : "500")};
`;
