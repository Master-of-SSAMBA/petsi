import styled from "styled-components";
import Calendar from "@/assets/icons/Icon-calendar-2.svg?react";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1rem;
`;

export const DateViewer = styled.div`
    display: flex;
    width: 100%;
    height: 3rem;
    justify-content: space-between;
    align-items: center;
    background-color: var(--color-white);
    border: 1px solid var(--color-gray);
    border-radius: 5px;
    padding: 1rem;

    h4 {
        font-weight: 300;
        color: var(--color-black);
    }
`;

export const CalendarIcon = styled(Calendar)`
    width: 2rem;
    height: 2rem;
`;
