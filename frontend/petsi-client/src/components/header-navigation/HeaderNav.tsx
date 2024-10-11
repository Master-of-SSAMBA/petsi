import { NavLink, useNavigate } from "react-router-dom";
import BackArrow from "@/assets/icons/Icon-backarrow.svg";
import AlertEmpty from "@/assets/icons/Icon-alert-empty.svg";
import AlertActive from "@/assets/icons/Icon-alert-active.svg";
import Setting from "@/assets/icons/Icon-setting.svg";
import * as St from "./HeaderNav.style";
import { useRecoilState, useRecoilValue } from "recoil";
import { headerState } from "@/stores/useNavigationStore";
import { notificationState } from "@/stores/useNotificationStore";
import { useEffect } from "react";
import { getAllNotification } from "@/services/notificationServices";
import { AppPaths } from "@/interfaces/AppPaths";
import { getMessaging, onMessage } from "firebase/messaging";
import { getApp } from "firebase/app";

interface RenderItem {
    icon: string;
    action?: () => void;
}

const HeaderNav = () => {
    const navigate = useNavigate();
    const { left, right, text, isVisible, color, leftPath, rightPath } =
        useRecoilValue(headerState);
    const [notificationList, setNotificationList] =
        useRecoilState(notificationState);

    const fetchNotificationData = async () => {
        try {
            const data = await getAllNotification();
            setNotificationList(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // 컴포넌트 마운트 시 알림 데이터 초기 호출
        fetchNotificationData();

        let unsubscribe = () => {};

        try {
            // Firebase app 인스턴스 가져오기
            const app = getApp();
            // Messaging 인스턴스 가져오기
            const messaging = getMessaging(app);

            // 푸시 알림 수신 시 리스트 갱신
            unsubscribe = onMessage(messaging, (payload) => {
                console.log(payload);
                fetchNotificationData(); // 새로운 알림이 오면 리스트 갱신
            });
        } catch (error) {
            console.error("Firebase messaging setup failed:", error);
        }

        // 컴포넌트 언마운트 시 Firebase 리스너 해제
        return () => unsubscribe();
    }, [fetchNotificationData]);

    if (!isVisible) return null;

    const renderItem = (label: string): RenderItem | null => {
        switch (label) {
            case "backArrow":
                return {
                    icon: BackArrow,
                    action: () => navigate(-1),
                };
            case "alertActive":
                if (
                    notificationList.length > 0 &&
                    notificationList[0]?.read === false
                ) {
                    return {
                        icon: AlertEmpty,
                        action: () => navigate(AppPaths.NOTICE),
                    };
                } else {
                    return {
                        icon: AlertActive,
                        action: () => navigate(AppPaths.NOTICE),
                    };
                }
            case "setting":
                return {
                    icon: Setting,
                };
            default:
                return null;
        }
    };

    const leftItem = renderItem(left);
    const rightItem = renderItem(right);

    return (
        <St.NavContainer color={color}>
            {leftItem?.action ? (
                <button onClick={leftItem.action}>
                    <St.NavIcon src={leftItem.icon} alt={left} />
                </button>
            ) : leftItem && leftItem.icon ? (
                <NavLink to={leftPath || "#"}>
                    <St.NavIcon src={leftItem.icon} alt={left} />
                </NavLink>
            ) : (
                <St.PlaceholderDiv />
            )}

            <h4>{text}</h4>

            {rightItem?.action ? (
                <button onClick={rightItem.action}>
                    <St.NavIcon src={rightItem.icon} alt={right} />
                </button>
            ) : rightItem?.icon ? (
                <NavLink to={rightPath || "#"}>
                    <St.NavIcon src={rightItem.icon} alt={right} />
                </NavLink>
            ) : (
                <St.PlaceholderDiv />
            )}
        </St.NavContainer>
    );
};

export default HeaderNav;
