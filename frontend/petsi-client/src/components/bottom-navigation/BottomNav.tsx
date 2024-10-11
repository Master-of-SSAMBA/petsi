import { NavLink } from "react-router-dom";
import * as St from "./BottomNav.style";
import Home from "@/assets/icons/Icon-home.svg?react";
import Expense from "@/assets/icons/Icon-receipt.svg?react";
import Money from "@/assets/icons/Icon-money.svg?react";
import Calendar from "@/assets/icons/Icon-calendar.svg?react";
import User from "@/assets/icons/Icon-user.svg?react";
import { useRecoilValue } from "recoil";
import { bottomState } from "@/stores/useNavigationStore";
import { ReactNode } from "react";

interface navItem {
    to: string;
    name: string;
    icon: ReactNode;
    title: string;
}

const BottomNav = () => {
    const { isVisible, activePage } = useRecoilValue(bottomState); // Recoil 상태 가져오기

    if (!isVisible) return null;

    const navItems: navItem[] = [
        { to: "/", name: "Home", icon: <Home />, title: "홈" },
        {
            to: "/expense",
            name: "Expense",
            icon: <Expense />,
            title: "소비분석",
        },
        { to: "/account", name: "Account", icon: <Money />, title: "계좌" },
        {
            to: "/schedule",
            name: "Calendar",
            icon: <Calendar />,
            title: "캘린더",
        },
        { to: "/mypage", name: "Mypage", icon: <User />, title: "마이페이지" },
    ];

    const renderNavItem = (item: navItem) => (
        <NavLink
            key={item.name}
            to={item.to}
            className={({ isActive }) => (isActive ? "active" : "")}
        >
            <St.NavItem className={activePage === item.name ? "active" : ""}>
                {item.icon}
                <St.ItemTitle>{item.title}</St.ItemTitle>
            </St.NavItem>
        </NavLink>
    );

    return <St.NavContainer>{navItems.map(renderNavItem)}</St.NavContainer>;
};

export default BottomNav;
