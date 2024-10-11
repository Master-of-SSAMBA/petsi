import React from "react";
import * as St from "./KeyPad.style";

interface KeypadProps {
    onNumberClick: (val: string) => void;
    onClearClick: () => void;
}

const Keypad: React.FC<KeypadProps> = ({ onNumberClick, onClearClick }) => {
    return (
        <St.Keypad>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <St.KeypadButton
                    key={num}
                    onClick={() => onNumberClick(String(num))}
                >
                    <St.KeyPadNumber>{num}</St.KeyPadNumber>
                </St.KeypadButton>
            ))}
            <St.KeypadButton onClick={() => onNumberClick("00")}>
                <St.KeyPadNumber>00</St.KeyPadNumber>
            </St.KeypadButton>
            <St.KeypadButton onClick={() => onNumberClick("0")}>
                <St.KeyPadNumber>0</St.KeyPadNumber>
            </St.KeypadButton>
            <St.KeypadButton onClick={onClearClick}>
                <St.KeyPadFont>지우기</St.KeyPadFont>
            </St.KeypadButton>
        </St.Keypad>
    );
};

export default Keypad;
