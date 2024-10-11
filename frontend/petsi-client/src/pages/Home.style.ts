import styled from "styled-components";
import Paw from "@/assets/icons/Icon-paw.svg?react";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
    background-color: var(--color-beige);
`;

export const Box = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid black;
    border-radius: 5px;
    box-shadow: var(--box-shadow-default);
    padding: 2rem;
    gap: 1rem;
    background-color: white;

    .title {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
    }
    .login-bottom {
        display: flex;
    }

    .login {
        display: flex;
        align-items: center;
        gap: 0.2rem;
        h4 {
            color: var(--color-gray);
        }
    }

    .petsi {
        display: flex;
        margin-left: auto;
        width: 14rem;
    }
`;

export const PawIcon = styled(Paw)`
    width: 2rem;
    height: 2rem;
    /* stroke: black; */
    path {
        fill: pink;
    }
`;
