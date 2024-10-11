import styled from "styled-components";

const HistoryContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 0.3rem;

    .date {
        font-size: var(--font-body-h5);
    }
    .balance {
        font-size: var(--font-body-h6);
    }

    overflow-y: auto; /* 스크롤 가능 */

    /* 스크롤바 숨기기 */
    ::-webkit-scrollbar {
        display: none;
    }

    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
`;

const HistoryItem = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    .date {
        display: flex;
        flex-direction: column;
        width: 8rem;
        text-align: left;
        gap: 0.3rem;

        p {
            margin: 0;
        }
    }

    .historyData {
        display: flex;
        flex-direction: column;
        width: 8rem;
        text-align: left;
        gap: 0.3rem;

        h4,
        h5 {
            margin: 0;
        }
    }

    .moneydata {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        width: 6rem;
        gap: 0.3rem;

        h4,
        h5 {
            margin: 0;
        }
    }
`;

export { HistoryContainer, HistoryItem };
