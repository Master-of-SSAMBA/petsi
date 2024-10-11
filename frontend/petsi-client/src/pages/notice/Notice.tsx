import { notificationState } from "@/stores/useNotificationStore";
import * as St from "./Notice.style";
import { useRecoilState, useSetRecoilState } from "recoil";
import { bottomState, headerState } from "@/stores/useNavigationStore";
import { useEffect } from "react";
import Container from "@/components/ui/_container/Container";
import Close from "@/assets/icons/Icon-close.svg";
import Button from "@/components/ui/_button/Button";
import {
    deleteAllNotification,
    deleteNotification,
    readNotification,
} from "@/services/notificationServices";

const Notice = () => {
    const setHeaderState = useSetRecoilState(headerState);
    const setBottomState = useSetRecoilState(bottomState);
    const [noticeList, setNoticeList] = useRecoilState(notificationState);

    useEffect(() => {
        setHeaderState({
            left: "",
            right: "",
            text: "알림",
            isVisible: true,
            color: "beige",
        });
        setBottomState({
            isVisible: true,
            activePage: "Home",
        });
    }, [setHeaderState, setBottomState]);

    const handleDeleteAllNotifications = async () => {
        const success = await deleteAllNotification(false); // 전체 삭제
        if (success) {
            setNoticeList([]); // 성공적으로 삭제되면 알림 리스트를 빈 배열로 초기화
        }
    };

    const handleMarkAllAsRead = async () => {
        for (const notice of noticeList) {
            await readNotification(notice.notificationId); // 각 알림을 읽음 처리
        }
        // UI 상에서 알림을 읽은 것으로 처리할 수 있도록 적절한 로직을 추가
        const updatedList = noticeList.map((notice) => ({
            ...notice,
            isRead: true,
        }));
        setNoticeList(updatedList);
    };

    // 개별 알림 읽음 처리
    const handleReadNotification = async (notificationId: number) => {
        await readNotification(notificationId);
        const updatedList = noticeList.map((notice) =>
            notice.notificationId === notificationId
                ? { ...notice, isRead: true }
                : notice
        );
        setNoticeList(updatedList);
    };

    // 개별 알림 삭제
    const handleDeleteNotification = async (notificationId: number) => {
        const success = await deleteNotification(notificationId);
        if (success) {
            const updatedList = noticeList.filter(
                (notice) => notice.notificationId !== notificationId
            );
            setNoticeList(updatedList);
        }
    };

    const selectIcon = (category: string) => {
        if (category === "streak") {
            return "/images/fire.png";
        } else if (category === "bank") {
            return "/images/money.png";
        } else if (category === "plan") {
            return "/images/plan.png";
        }
    };

    return (
        <St.Container>
            <St.HeaderButton>
                <Button
                    color="white"
                    size="small"
                    text={"전체 삭제"}
                    shadow={true}
                    onButtonClick={handleDeleteAllNotifications}
                    style={{ width: "30%" }}
                />
                <Button
                    color="white"
                    size="small"
                    text={"전체 읽음 처리"}
                    shadow={true}
                    onButtonClick={handleMarkAllAsRead}
                    style={{ width: "30%" }}
                />
            </St.HeaderButton>
            {noticeList.map((notice) => (
                <Container
                    color="white"
                    shadow={true}
                    key={notice.notificationId}
                    style={{
                        position: "relative",
                        opacity: notice.read ? 0.4 : 1,
                    }}
                >
                    <St.Inner
                        onClick={() =>
                            handleReadNotification(notice.notificationId)
                        }
                        style={{ cursor: "pointer" }}
                    >
                        <St.NoticeIcon
                            src={selectIcon(notice.category)}
                            alt={notice.category}
                        />
                        <h4
                            style={{
                                alignContent: "center",
                                wordBreak: "keep-all",
                            }}
                        >
                            {notice.content}
                        </h4>
                        <St.ButtonContainer>
                            <img
                                src={Close}
                                alt="close"
                                style={{
                                    marginBottom: "1rem",
                                    cursor: "pointer",
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteNotification(
                                        notice.notificationId
                                    );
                                }}
                            />
                            <St.DateContainer>
                                <h6>{notice.date.date}</h6>
                                <h6>{notice.date.time}</h6>
                            </St.DateContainer>
                        </St.ButtonContainer>
                    </St.Inner>
                </Container>
            ))}
        </St.Container>
    );
};

export default Notice;
