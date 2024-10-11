import { useNavigate } from "react-router-dom";
import * as St from "./Button.style";

interface BtnProps {
    color: string;
    size: "small" | "large";
    text: string;
    to?: string | null;
    shadow?: true;
    onButtonClick?: () => void;
    style?: React.CSSProperties;
}

const Button = (props: BtnProps) => {
    const { color, size, text, to, shadow, onButtonClick } = props;
    const navigate = useNavigate();

    const handleClick = () => {
        if (to && to !== "") {
            navigate(to);
        }

        if (onButtonClick) {
            onButtonClick();
        }
    };

    return (
        <St.BtnContainer
            color={color}
            $size={size}
            $shadow={!!shadow} // shadow가 undefined일 경우 false
            onClick={handleClick}
        >
            <St.BtnText $size={size}>{text}</St.BtnText>
        </St.BtnContainer>
    );
};

export default Button;
