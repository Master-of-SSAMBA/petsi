import { styled } from "styled-components";

const NavContainer = styled.nav`
    display: flex;
    width: 100%;
    padding: 1rem;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;
    background-color: ${({ color }) =>
        color ? `var(--color-${color})` : "var(--color-beige)"};
`;

const NavIcon = styled.img`
    width: 2.2857rem;
    height: 2.2857rem;
`;

const NavText = styled.h4`
    text-align: center;
`;

const PlaceholderDiv = styled.div`
    width: 2.2857rem;
    height: 2.2857rem;
`;

export { NavContainer, NavIcon, PlaceholderDiv, NavText };
