import { useEffect, useState } from "react";
import * as St from "./OptionInput.style";
import Clear from "@/assets/icons/Icon-clear.svg?react";

interface OptionInputProps {
    type: string;
    category?: string;
    onChange: (value: string | File | undefined) => void;
    placeholder?: string;
    children?: React.ReactNode;
    accept?: string;
    value?: string | File;
}

const OptionInput = (props: OptionInputProps) => {
    const [value, setValue] = useState<string | File | undefined>(
        props.value || ""
    );

    useEffect(() => {
        setValue(props.value || "");
    }, [props.value]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (props.type === "file" && event.target.files) {
            props.onChange(event.target.files[0]);
        } else {
            setValue(event.target.value);
            props.onChange(event.target.value);
        }
    };

    const handleClear = () => {
        setValue("");
        props.onChange(undefined);
    };

    return (
        <St.Container>
            {props?.category && <St.Category>{props.category}</St.Category>}
            <St.Input
                type={props.type}
                value={props.type === "file" ? undefined : (value as string)}
                onChange={handleChange}
                placeholder={props.placeholder}
                accept={props.accept}
            />
            {(props.type === "string" || props.type === "number") && (
                <St.ClearButton onClick={handleClear}>
                    <Clear />
                </St.ClearButton>
            )}
        </St.Container>
    );
};

export default OptionInput;
