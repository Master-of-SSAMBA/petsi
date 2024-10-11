import styled from "styled-components";

export const FilterHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 4rem;
    padding: 1.5rem;
    background-color: var(--color-beige);

    span {
        font-weight: 400;
    }
`;
export const Container = styled.div`
    display: flex;
    flex-direction: column;
    height: calc(100vh - 4rem - 122px);
    gap: 2rem;
    padding: 1rem;

    .toggle {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .toggle-title,
    .select-category {
        span {
            font-weight: 400;
        }
    }

    .select-period {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .select-category {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }
`;

export const Dropdown = styled.div`
    border: 1px solid black;
    border-radius: 5px;
`;
