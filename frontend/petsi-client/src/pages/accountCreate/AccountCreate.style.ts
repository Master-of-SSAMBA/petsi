import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 0 2rem;
    gap: 2rem;

    img {
        width: 5rem;
    }

    h2 {
        margin: 0;
    }
`;

const DocsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const DocsHeader = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.2rem;

    h3 {
        margin: 0;
    }
`;

const DocsList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.4rem;

    p {
        margin: 0;
        color: var(--color-gray);
    }
`;

const ButtonContainer = styled.div`
    margin-top: 0.5rem;
`;

export { Container, DocsContainer, DocsHeader, DocsList, ButtonContainer };
