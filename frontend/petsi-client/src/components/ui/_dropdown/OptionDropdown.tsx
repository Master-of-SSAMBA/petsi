import { useState } from "react";
import Dropdown from "./Dropdown";
import * as St from "./OptionDropdown.style";

interface OptionDropdownProps {
    category: string;
    itemList: string[];
    onChange: (value: string) => void;
    children?: React.ReactNode;
}

const DateInput = (props: OptionDropdownProps) => {
    const [, setOption] = useState<string>("");

    const setValue = (val: string) => {
        setOption(val);
        props.onChange(val);
    };

    return (
        <St.Container>
            <St.Category>{props.category}</St.Category>
            <Dropdown optionList={props.itemList} onChange={setValue} />
        </St.Container>
    );
};

export default DateInput;
