import styled from "styled-components";
import Down from "@/assets/icons/Icon-arrow-down.svg?react";

export const Container = styled.div``;

export const ChartSection = styled.div`
    padding: 1rem;
    background-color: var(--color-beige);
`;
export const ChartContainer = styled.div`
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 1.5rem 1.2rem;
    border: 1px solid black;
    border-radius: 5px;
    box-shadow: var(--box-shadow-default);
    gap: 1rem;

    div {
        display: flex;
    }

    .chart-header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        span {
            font-weight: 400;
        }
    }

    .chart-body {
        display: flex;
        justify-content: space-between;
        gap: 1rem;

        .category-wrapper {
            display: flex;
            flex-direction: column;
            justify-content: center;
            gap: 0.3rem;
        }
    }
`;
export const SelectMonth = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.8rem;
`;

export const ChartWrapper = styled.div`
    width: 7.5rem;
    height: 7.5rem;
    margin-left: 1;
`;

export const Category = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 3rem;

    .category-left {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .circle {
        width: 0.7rem;
        height: 0.7rem;
        border-radius: 50%;
    }

    .label {
        font-size: var(--font-body-h5);
        font-weight: 400;
    }

    .rate {
        font-size: var(--font-body-h5);
    }
`;

export const DetailSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1rem;

    .header-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .filter-text {
        font-size: var(--font-title-h5);
        font-weight: 600;
    }
`;
export const DetailHeader = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
`;

export const DetailBody = styled.div`
    display: flex;
    flex-direction: column;
`;
export const Detail = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;

    .detail-header {
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-between;
        margin-top: 1rem;

        span {
            font-size: var(--font-body-h5);
            font-weight: 400;
            color: var(--color-gray);
        }

        .total {
            color: black;
        }
    }

    .bar {
        width: 100%;
        border: 0.5px solid #c7c5c5;
        margin: 0.8rem 0;
    }
`;

export const DetailContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;
export const DetailContent = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;

    .content-left {
        display: flex;
        gap: 0.8rem;
    }

    .item-img {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 2.5rem;
        height: 2.5rem;
        background-color: var(--color-beige);
        border-radius: 50%;
    }

    .item-detail {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: start;
        gap: 0.2rem;
        font-size: var(--font-body-h5);
    }

    .item-content {
        display: flex;
        flex-direction: column;
        gap: 0.2rem;
        .total {
            font-size: var(--font-title-h4);
            font-weight: 400;
        }

        div {
            display: flex;
            align-items: center;
            justify-content: end;
            gap: 0.3rem;
            .circle {
                width: 0.5rem;
                height: 0.5rem;
                border-radius: 50%;
            }
            span {
                font-size: var(--font-body-h5);
                font-weight: 400;
            }
        }
    }
`;

export const IconWrapper = styled(Down)`
    width: 0.5rem;
    height: 0.5rem;
    fill: black;
    stroke: black;
`;
