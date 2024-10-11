import { useSetRecoilState } from "recoil";
import * as St from "./Schedule.style";
import { bottomState, headerState } from "@/stores/useNavigationStore";
import { useEffect } from "react";

import { Outlet } from "react-router-dom";
import Toggle from "@/components/ui/_toggle/Toggle";

const ScheduleCreate = () => {
    const setHeaderState = useSetRecoilState(headerState);
    const setBottomState = useSetRecoilState(bottomState);

    useEffect(() => {
        setHeaderState({
            left: "backArrow",
            right: "alertActive",
            text: "일정 추가",
            isVisible: true,
            color: "beige",
        });
        setBottomState({
            isVisible: true,
            activePage: "Calendar",
        });
    }, [setHeaderState, setBottomState]);

    return (
        <St.Container>
            <Toggle
                items={["일정 등록", "카테고리 등록"]}
                routes={["", "category"]}
            />
            <Outlet />
        </St.Container>
    );
};

export default ScheduleCreate;
