import styled from "styled-components";

export const ContinerLayout = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 122px);
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    background-color: var(--color-beige);
`;

export const ContentWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`;

export const ItemIcon = styled.img`
    width: 20%;
    margin-left: 2%;
`;

export const Description = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.2rem;
    width: 70%;
    /* max-width: 110px; */
`;

export const Title = styled.h4`
    font-weight: 600;
    margin: 0;
`;

export const SubTitleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
`;

export const SubTitle = styled.h5`
    margin: 0;
`;

export const RedText = styled.span`
    color: var(--color-red);
    font-weight: bold;
`;

export const BigContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: space-between;
    text-align: center;
    padding: 10% 0;
    gap: 1.5rem;
    align-items: center;
`;

export const BigItemIcon = styled.img`
    width: 85%;
`;

export const BigDescription = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;
`;
