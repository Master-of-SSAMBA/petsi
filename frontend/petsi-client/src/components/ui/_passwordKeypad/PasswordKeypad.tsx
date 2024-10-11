import { useState, useEffect } from "react";
import * as St from "./PasswordKeypad.style";
import Quit from "@/assets/icons/Icon-plus.svg?react";

interface KeypadProps {
    onNumberClick: (val: string) => void;
    onClearClick: () => void;
    isOpen: boolean;
    isError?: boolean;
    onClose: () => void;
    passwordLength: number;
}

const shuffleArray = (array: string[]) => {
    return array
        .map((val) => ({ val, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ val }) => val);
};

const PasswordKeypad = (props: KeypadProps) => {
    const {
        onNumberClick,
        onClearClick,
        isOpen = false,
        isError,
        onClose,
        passwordLength,
    } = props;
    const [shuffledNumbers, setShuffledNumbers] = useState<string[]>([]);

    // 키패드 숫자를 랜덤으로 재배치
    const reshuffleNumbers = () => {
        const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
        setShuffledNumbers(shuffleArray(numbers));
    };

    // isOpen prop 변경 시 내부 상태 동기화
    useEffect(() => {
        if (isOpen) {
            reshuffleNumbers(); // 바텀시트가 열릴 때마다 숫자 셔플
        }
    }, [isOpen]);

    return (
        <St.Overlay $isOpen={isOpen}>
            <St.BottomSheet $isOpen={isOpen}>
                <St.QuitButton onClick={onClose}>
                    <Quit style={{ width: 36, height: 36, rotate: "45deg" }} />
                </St.QuitButton>
                <St.BottomSheetHeader>
                    {isError ? (
                        <h3 style={{ color: "var(--color-red)" }}>
                            비밀번호 4자리를
                            <br />
                            다시 입력해주세요.
                        </h3>
                    ) : (
                        <h3>
                            비밀번호 4자리를
                            <br />
                            입력해주세요.
                        </h3>
                    )}
                    {/* 비밀번호 길이만큼 * 출력 */}
                    <div style={{ height: "1rem" }}>
                        <h2>{Array(passwordLength).fill("*").join("")}</h2>
                    </div>
                </St.BottomSheetHeader>
                <St.BottomSheetBody>
                    <St.PasswordKeypad>
                        {shuffledNumbers.map((num) => (
                            <St.KeypadButton
                                key={num}
                                onClick={() => onNumberClick(num)}
                            >
                                <St.KeyPadNumber>{num}</St.KeyPadNumber>
                            </St.KeypadButton>
                        ))}
                        <St.KeypadButton onClick={reshuffleNumbers}>
                            <St.KeyPadFont>재배치</St.KeyPadFont>
                        </St.KeypadButton>
                        <St.KeypadButton onClick={onClearClick}>
                            <St.KeyPadFont>초기화</St.KeyPadFont>
                        </St.KeypadButton>
                    </St.PasswordKeypad>
                </St.BottomSheetBody>
            </St.BottomSheet>
        </St.Overlay>
    );
};

export default PasswordKeypad;
