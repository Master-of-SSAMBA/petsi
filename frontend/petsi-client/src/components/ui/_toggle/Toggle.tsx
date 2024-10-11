import { useState } from "react";
import * as St from "./Toggle.style";
import { useNavigate } from "react-router-dom";

interface ToggleProps {
    items: string[];
    routes: string[];
    onClick?: (index: number) => void;
}

const Toggle = ({ items, routes, onClick }: ToggleProps) => {
    const [active, setActive] = useState<number>(0);
    const navigate = useNavigate();

    const handleToggle = (index: number) => {
        setActive(index);
        navigate(routes[index]);

        if (onClick) {
            onClick(index);
        }
    };

    return (
        <St.Container>
            {items.map((item, index) => (
                <St.Button
                    key={item}
                    $active={active === index}
                    onClick={() => handleToggle(index)}
                >
                    <span>{item}</span>
                </St.Button>
            ))}
        </St.Container>
    );
};

export default Toggle;
