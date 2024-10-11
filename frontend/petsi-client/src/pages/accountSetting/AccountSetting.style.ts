import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 0 auto;
    padding: 1rem;
    gap: 3rem;

    h1 {
        margin: 0;
    }
`;

const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0;
    gap: 1rem;

    h3 {
        margin: 0;
    }
`;

const InfoRow = styled.div`
    display: flex;
    align-items: center;

    h4 {
        width: 8rem;
        margin: 0;
    }
    p {
        margin: 0;
    }
`;

export { Container, InnerContainer, InfoRow };
