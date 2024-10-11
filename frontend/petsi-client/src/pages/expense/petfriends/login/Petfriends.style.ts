import styled from "styled-components";
import BackArrow from "@/assets/icons/Icon-backarrow.svg?react";
import Kakao from "@/assets/icons/Icon-kakao.svg?react";

export const FilterHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 4rem;
    padding: 1.5rem;
    background-color: #ff5690;

    span {
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-weight: 400;
        gap: 0.5rem;
    }
`;

export const Arrow = styled(BackArrow)`
    width: 2rem;
    path {
        fill: white;
    }
`;

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 2rem;
    gap: 1.5rem;
    text-align: center;
`;

export const IconWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    margin: 1rem;
`;

export const Button = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;

    height: 3rem;
    h4 {
        color: white;
    }
    border-radius: 5px;
`;

export const KakaoIcon = styled(Kakao)`
    width: 2rem;
    height: 2rem;
`;

export const SocialLoginMenu = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;

    .bar {
        width: 5.3rem;
        border: 0.5px solid var(--color-gray);
    }
`;
