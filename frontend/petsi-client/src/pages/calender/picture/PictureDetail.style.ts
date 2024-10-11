import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 2rem;
`;

const PictureContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    border: 1px solid var(--color-black);
    border-radius: 5px;
    box-shadow: var(--box-shadow-default);
`;

const ImgSection = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const Date = styled.div`
    display: flex;
    padding: 1rem;
    align-items: center;
    gap: 0.6rem;
    height: 4rem;
    h1 {
        font-weight: bold;
        margin: 0;
    }
    h5 {
        margin: 0;
    }
    border-bottom: 1px solid black;
`;

const Content = styled.span`
    width: 100%;
    text-align: left;
    white-space: pre-line;
`;

export { Container, PictureContainer, ImgSection, Date, Content };
