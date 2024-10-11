import * as St from "./EmptyState.style";
import { stateMap } from "./emptyStateConstants";

interface EmptyStateProps {
    state: string;
}

const EmptyState = ({ state }: EmptyStateProps) => {
    const renderTitle = (state: keyof typeof stateMap) => {
        const title = stateMap[state]?.title;
        return title;
    };

    const renderSubtitle = (state: keyof typeof stateMap) => {
        return stateMap[state]?.subtitle;
    };

    return (
        // <St.EmptyStateContainer>
        //     <St.IconBox>
        //         <img src=`/images/emptyState/${}` alt="" />
        //     </St.IconBox>
        //     <St.EmptyTitle>새로운 알림이 없습니다.</St.EmptyTitle>
        //     <St.EmptyText>
        //         새 다이어리를 작성하고
        //         <br />더 많은 친구를 만나보세요.
        //     </St.EmptyText>
        // </St.EmptyStateContainer>
        <St.EmptyStateContainer>
            <St.ImgContainer>
                <img
                    src={`/images/emptyState/${state}.webp`}
                    alt="Empty state image"
                />
            </St.ImgContainer>
            <St.EmptyTitle>{renderTitle(state)}</St.EmptyTitle>
            <St.EmptyText>{renderSubtitle(state)}</St.EmptyText>
        </St.EmptyStateContainer>
    );
};

export default EmptyState;
