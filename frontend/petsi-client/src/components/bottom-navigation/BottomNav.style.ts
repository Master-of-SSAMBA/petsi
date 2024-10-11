import styled from "styled-components";

const NavContainer = styled.nav`
    display: flex;
    width: 100%;
    min-height: 122px;
    max-width: 480px;
    justify-content: space-around;
    align-items: center;
    border-top: 1px solid var(--Schemes-Scrim, #000);
    background-color: var(--color-white);

    position: fixed;
    bottom: 0;
`;

const NavItem = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    svg path {
        fill: var(--color-black);
    }

    &.active {
        svg path {
            fill: var(--color-red);
        }

        h6 {
            color: var(--color-red);
        }
    }
`;

const ItemIcon = styled.img``;

const ItemTitle = styled.h6`
    margin: 0;
`;

export { NavContainer, NavItem, ItemIcon, ItemTitle };
