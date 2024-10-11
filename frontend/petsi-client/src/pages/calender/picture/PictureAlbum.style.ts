import styled from "styled-components";

export const Container = styled.div`
    padding: 0.5rem;
    padding-bottom: 100px;
`;

export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
`;

interface GridItemProps {
    $isLarge: boolean;
    $columnStart: number | null;
}

export const GridItem = styled.div<GridItemProps>`
    aspect-ratio: 1;
    overflow: hidden;
    ${(props) =>
        props.$isLarge &&
        props.$columnStart &&
        `grid-column-start: ${props.$columnStart};`}
    grid-column: ${(props) => (props.$isLarge ? "span 2" : "span 1")};
    grid-row: ${(props) => (props.$isLarge ? "span 2" : "span 1")};
`;

export const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
`;
