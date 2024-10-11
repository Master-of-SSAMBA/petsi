import { useNavigate } from "react-router-dom";
import * as St from "./Container.style";

interface ContainerProps {
    color: string;
    shadow: boolean;
    path?: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    backgroundColor?: string;
    onClick?: () => void;
}

const Container = (props: ContainerProps) => {
    const { color, shadow, path, children, style, backgroundColor, onClick } =
        props;
    const navigate = useNavigate();

    const handleClick = () => {
        if (path) {
            navigate(path, {
                state: { backgroundColor }, // backgroundColor state로 전달
            });
        }

        if (onClick) {
            onClick();
        }
    };

    return (
        <St.Container
            $color={color}
            $shadow={shadow}
            onClick={handleClick}
            style={style}
        >
            {children}
        </St.Container>
    );
};

export default Container;
