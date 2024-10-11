import styled from "styled-components";

export const DropWrap = styled.div<{ $border?: boolean }>`
    position: relative;
    width: 100%;

    .dropbtn {
        display: flex;
        padding: 1rem;
        box-sizing: border-box; /* padding과 border를 포함해서 사이즈 측정 */
        justify-content: space-between;
        background-color: white;
        align-items: center;
        border-radius: 5px;
        border: ${(props) =>
            props.$border ? "1px solid var(--color-gray);" : "none"};
        width: 100%;
        height: 3rem;
        cursor: pointer;
    }
`;

export const OptionWrap = styled.div`
    position: absolute;
    margin-top: 0.6rem;
    width: 100%;
    border: 1px solid var(--color-lightgray);
    border-radius: 5px;
    z-index: 1000;
    transition: all 1s;

    .option {
        background-color: white;
        border: none;
        border-bottom: 1px solid var(--color-lightgray);
        width: 100%;
        font-size: var(--font-body-h4);
        padding: 1rem;

        :focus {
            outline: none;
        }
    }
`;
