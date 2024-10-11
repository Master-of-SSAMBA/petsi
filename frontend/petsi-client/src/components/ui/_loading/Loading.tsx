import { ClipLoader } from "react-spinners";
import styled from "styled-components";

const LoaderWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 60vh;
`;

const Loading = () => {
    return (
        <LoaderWrapper>
            <ClipLoader
                color="var(--color-black)"
                size={40}
                speedMultiplier={1.0}
            />
        </LoaderWrapper>
    );
};

export default Loading;
