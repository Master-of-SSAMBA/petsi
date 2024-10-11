import { ClipLoader } from "react-spinners";
import styled from "styled-components";

const LoaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 3rem;
    justify-content: center;
    align-items: center;
    height: 60vh;
`;

const CrawlingLoading = () => {
    return (
        <LoaderWrapper>
            <div>
                카카오톡으로 로그인 메세지가 전송되었습니다. <br />
                전송된 카카오톡 메세지를 통해 <br />
                로그인 처리를 완료해주세요.
            </div>
            <ClipLoader
                color="var(--color-black)"
                size={40}
                speedMultiplier={1.0}
            />
        </LoaderWrapper>
    );
};

export default CrawlingLoading;
