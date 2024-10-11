import styled from "styled-components";

interface StyleProps {
    color?: string; // color prop을 선택적으로 받음
}

const Container = styled.div<StyleProps>`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    min-height: 640px;
    gap: 1rem;
    padding: 1rem;
    height: 80vh;

    background-color: ${({ color }) =>
        color ? `var(--color-${color})` : "var(--color-beige)"};
`;

const AccountHeader = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
`;

const AccountNum = styled.h5`
    text-decoration: underline;
    text-underline-offset: 0.2rem;
`;

const InnerContiner = styled.div`
    display: flex;
    width: 17.5rem;
    flex-direction: column;
    align-items: center;
    gap: 1.25rem;
    flex-shrink: 0;
`;

const SubDescription = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    gap: 2.5rem;
`;

const SubDescriptionItem = styled.div`
    display: flex;
    width: 7rem;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
`;

const BankingButton = styled.button<StyleProps>`
    display: flex;
    padding: 1.2rem 2.2rem;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    border-radius: 10px;
    background-color: ${({ color }) =>
        color ? `var(--color-${color})` : "var(--color-beige)"};
`;

const FilterContainer = styled.nav`
    width: 95%;
    display: flex;
    justify-content: flex-end;
    gap: 0.3rem;
`;

const Select = styled.select`
    font-family: "Pretendard", sans-serif;
    border: none;
    background-color: transparent;
    cursor: pointer;
`;

const Option = styled.option`
    font-family: "Pretendard", sans-serif;
    background-color: transparent;
`;

export {
    Container,
    AccountHeader,
    AccountNum,
    InnerContiner,
    SubDescription,
    SubDescriptionItem,
    ButtonContainer,
    BankingButton,
    FilterContainer,
    Select,
    Option,
};
