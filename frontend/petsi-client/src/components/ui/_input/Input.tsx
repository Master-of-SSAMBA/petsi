import * as St from "./Input.style";

interface InputProps {
    type: "text" | "password" | "number";
    value: string;
    label?: string;
    onChange: (value: string) => void;
    shadow?: true;
    placeholder?: string;
    maxLength?: number;
    innerBtn?: string;
    btnOn?: boolean;
    btnClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    style?: React.CSSProperties;
}

const Input = (props: InputProps) => {
    const {
        type,
        value,
        label,
        onChange,
        shadow,
        placeholder,
        maxLength,
        innerBtn,
        btnOn,
        btnClick,
    } = props;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <St.InputContainer>
            <St.InputField
                type={type}
                inputMode={type === "number" ? "numeric" : undefined}
                value={value}
                onChange={handleChange}
                id={`input-${label}`}
                placeholder={placeholder}
                maxLength={maxLength}
                autoComplete="off"
                $shadow={shadow}
                $innerBtn={innerBtn}
            ></St.InputField>
            <St.InputLabel htmlFor={`input-${label}`}>{label}</St.InputLabel>
            {innerBtn && (
                <St.InnerButton $btnOn={btnOn} onClick={btnClick}>
                    {innerBtn === "check" ? <St.CheckIcon /> : innerBtn}
                </St.InnerButton>
            )}
        </St.InputContainer>
    );
};

export default Input;
