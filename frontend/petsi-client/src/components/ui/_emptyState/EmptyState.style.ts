import styled from "styled-components";

export const EmptyStateContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: calc(100% - 70px);
    justify-content: center;
    align-items: center;
    gap: 13px;
    margin-bottom: 2rem;
`;

export const ImgContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        width: 12rem; /* IconBox의 width에 맞춰 크기 조절 */
        height: auto; /* 비율에 따라 자동으로 세로 크기 조절 */
    }
`;

export const EmptyTitle = styled.span`
    margin-top: 1rem;
    font-weight: bold;
    color: #626262;
`;

export const EmptyText = styled.span`
    text-align: center;
    font-size: 13px;
    color: #787878;
`;
