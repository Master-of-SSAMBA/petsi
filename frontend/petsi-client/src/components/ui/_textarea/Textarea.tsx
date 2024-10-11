import { useState, ChangeEvent } from "react";
import * as St from "./Textarea.style";

interface TextareaProps {
    borderColor: string;
    backgroundColor: string;
    shadow: boolean;
    onChange: (text: string) => void;
}

const Textarea = (props: TextareaProps) => {
    const [text, setText] = useState<string>("");
    const maxLength = 500;

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
        props.onChange(e.target.value);
    };

    return (
        <St.TextareaContainer>
            <St.StyledTextarea
                $borderColor={props.borderColor}
                $backgroundColor={props.backgroundColor}
                $shadow={props.shadow}
                value={text}
                onChange={handleChange}
                maxLength={maxLength}
                placeholder="기록할 추억을 입력하세요."
            />
            <St.CharCount>
                {text.length}/{maxLength}
            </St.CharCount>
        </St.TextareaContainer>
    );
};

export default Textarea;
