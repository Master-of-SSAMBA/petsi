import { useState } from "react";
import * as St from "./Dropdown.style";
import ArrowUp from "@/assets/icons/Icon-arrow-up.svg?react";
import ArrowDown from "@/assets/icons/Icon-arrow-down.svg?react";

interface DropdownProps {
    border?: boolean;
    optionList: string[];
    searchFunc?: true;
    onChange: (value: string) => void;
    style?: React.CSSProperties;
}

const Dropdown = (props: DropdownProps) => {
    const { optionList, searchFunc = false, onChange, border } = props;
    const [isActive, setIsActive] = useState<boolean>(false);
    const [selected, setSelected] = useState<string>(optionList[0]);
    const [search, setSearch] = useState("");

    return (
        <St.DropWrap $border={border}>
            <button className="dropbtn" onClick={() => setIsActive(!isActive)}>
                {selected}
                {isActive ? <ArrowUp /> : <ArrowDown />}
            </button>
            {isActive && (
                <St.OptionWrap>
                    {searchFunc && (
                        <input
                            className="option"
                            placeholder="검색어를 입력하세요"
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                        ></input>
                    )}
                    {optionList
                        .filter((option) => {
                            if (search === "") {
                                return option;
                            } else if (
                                option
                                    .toLowerCase()
                                    .includes(search.toLowerCase())
                            ) {
                                return option;
                            }
                        })
                        .map((option) => {
                            return (
                                <div
                                    className="option"
                                    onClick={() => {
                                        setSelected(option);
                                        setIsActive(false);
                                        onChange(option);
                                    }}
                                    key={option}
                                >
                                    {option}
                                </div>
                            );
                        })}
                </St.OptionWrap>
            )}
        </St.DropWrap>
    );
};

export default Dropdown;
