import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    white-space: pre-line;

    h4 {
        margin: 0;
    }
`;

const ProductInfo = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem 2rem;
    white-space: pre-line;

    h4 {
        margin: 0;
    }
`;

const OptionContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-around;
    margin: 3rem 0;
`;

const Option = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;

    h4 {
        margin: 0;
    }
`;

export { Container, ProductInfo, OptionContainer, Option };
