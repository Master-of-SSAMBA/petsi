import styled from "styled-components";

const Overlay = styled.div<{ $isOpen: boolean }>`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999; /* 바텀시트 위에 표시 */
    opacity: ${(props) => (props.$isOpen ? 1 : 0)};
    pointer-events: ${(props) => (props.$isOpen ? "auto" : "none")};
    transition: opacity 0.3s ease-in-out;
`;

const QuitButton = styled.div`
    position: absolute;
    top: 2rem;
    right: 1rem;
    z-index: 1000;
`;

const BottomSheet = styled.div<{ $isOpen: boolean }>`
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    gap: 1rem;
    z-index: 1000;
    transform: translateY(${(props) => (props.$isOpen ? "0" : "100%")});
    transition:
        transform 0.4s ease-in-out,
        visibility 0.4s ease-in-out;
    visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
`;

const BottomSheetHeader = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: var(--color-yellow);
    padding: 2rem;
    gap: 1rem;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
`;

const BottomSheetBody = styled.div`
    display: flex;
    background-color: var(--color-white);
    padding: 2rem;
`;

const PasswordKeypad = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    width: 100%;
`;

const KeypadButton = styled.button`
    background-color: var(--color-white);
    padding: 1rem;
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

export {
    Overlay,
    QuitButton,
    BottomSheet,
    BottomSheetHeader,
    BottomSheetBody,
    PasswordKeypad,
    KeypadButton,
    KeyPadNumber,
    KeyPadFont,
};
