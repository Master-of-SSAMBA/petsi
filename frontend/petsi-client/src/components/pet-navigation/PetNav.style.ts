import styled from "styled-components";

const Container = styled.div`
    display: flex;
    gap: 1.5rem;
    overflow-y: auto; /* 스크롤 가능 */

    /* 스크롤바 숨기기 */
    ::-webkit-scrollbar {
        display: none;
    }

    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
`;

const PetItem = styled.div<{ isSelected: boolean }>`
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    align-items: center;
    border-radius: 15px;
    padding: 0.3rem
    cursor: pointer;
    
    background-color: ${({ isSelected }) =>
        isSelected ? "var(--color-lightgray)" : "var(--color-white)"};
`;

const PetImage = styled.div`
    border-radius: 50%;
    padding: 0.2rem;

    img {
        width: 2.5rem;
        height: 2.5rem;
    }
`;

export { Container, PetItem, PetImage };
