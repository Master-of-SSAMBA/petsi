import styled from "styled-components";

export const Continer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    padding: 1rem 1.5rem;
`;

export const BtnContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: end;
    div {
        width: 20%;
        height: 2rem;
    }
`;

export const UploadBox = styled.div`
    width: 100%;
    height: 20rem;
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='%236e6e6e' stroke-width='6' stroke-dasharray='6%2c 21' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
    border-radius: 20px;
    background-color: var(--color-lightgray);
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    position: relative;

    h4 {
        margin: 0;
        color: var(--color-gray);
    }
    div {
        width: 50%;
    }
`;

export const ItemIcon = styled.img`
    width: 40%;
    border-radius: 10px;
`;
