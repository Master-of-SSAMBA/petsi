import { AppPaths } from "@/interfaces/AppPaths";
import { bottomState, headerState } from "@/stores/useNavigationStore";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import * as St from "./ExpenseAdd.style";
import { Outlet } from "react-router-dom";
import Toggle from "@/components/ui/_toggle/Toggle";

const ExpenseAdd = () => {
    const setHeaderState = useSetRecoilState(headerState);
    const setBottomState = useSetRecoilState(bottomState);

    useEffect(() => {
        setHeaderState({
            left: "backArrow",
            leftPath: AppPaths.EXPENSE,
            right: "",
            text: "소비 내역 등록",
            isVisible: true,
            color: "beige",
        });
        setBottomState({
            isVisible: false,
        });
    }, [setHeaderState, setBottomState]);

    return (
        <>
            <St.Container>
                <St.ItemWrapper>
                    <Toggle
                        items={["소모품", "병원비"]}
                        routes={["", "medical"]}
                    />
                </St.ItemWrapper>
            </St.Container>
            <Outlet />
        </>
    );
};

export default ExpenseAdd;
