import styled from "styled-components";

export const PetProfile = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: #f7f5e9;
    border-radius: 10px;
`;

export const PetImage = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
`;

export const PetName = styled.div`
    font-size: 18px;
    font-weight: bold;
`;

export const PetInfo = styled.div`
    font-size: 14px;
`;

export const Dropdown = styled.select`
    margin-left: 10px;
    font-size: 16px;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
`;
