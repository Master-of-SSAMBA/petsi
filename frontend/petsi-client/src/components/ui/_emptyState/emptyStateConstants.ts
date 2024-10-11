interface StateMapItem {
    title: string;
    subtitle?: string;
}

interface StateMap {
    [key: string]: StateMapItem;
}

export const stateMap: StateMap = {
    expense: {
        title: "소비 내역이 존재하지 않습니다.",
        subtitle: "소비 내역을 등록하고 분석해보세요.",
    },
};
