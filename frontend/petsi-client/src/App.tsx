import {
    createBrowserRouter,
    RouterProvider,
    Outlet,
    // redirect,
} from "react-router-dom";
import { RecoilRoot } from "recoil";
import { useState, useEffect, useCallback } from "react";
import { onMessageListener, requestForToken } from "./firebase";
import Home from "@/pages/Home";
import Login from "@/pages/login/Login";
import SignUp from "@/pages/signup/SignUp";
import FindPassword from "@/pages/login/FindPassword";
import Expense from "@/pages/expense/Expense";
import ExpenseAdd from "@/pages/expense/expenseAdd/ExpenseAdd";
import ExpenseDetail from "@/pages/expense/ExpenseDetail";
import ExpenseFilter from "@/pages/expense/ExpenseFilter";
import AddSupplies from "@/components/expense/AddSupplies";
import AddMedical from "@/components/expense/AddMedical";
import PetfriendsLogin from "@/pages/expense/petfriends/login/PetfriendsLogin";
import KakaoLogin from "@/pages/expense/petfriends/login/KakaoLogin";
import KakaoLogin2FA from "./pages/expense/petfriends/login/KakaoLogin2FA";
import Account from "@/pages/account/Account";
import CreatePicture from "@/pages/calender/picture/CreatePicture";
import PictureHome from "@/pages/calender/picture/PictureHome";
import PictureAlbum from "@/pages/calender/picture/PictureAlbum";
import PictureDetail from "@/pages/calender/picture/PictureDetail";
import HeaderNav from "@/components/header-navigation/HeaderNav";
import BottomNav from "@/components/bottom-navigation/BottomNav";
import AccountDetail from "@/pages/accountDetail/AccountDetail";
import AccountSetting from "./pages/accountSetting/AccountSetting";
import AccountCreate from "./pages/accountCreate/AccountCreate";
import AccountOpen from "./pages/accountOpen/AccountOpen";
import AccountTransfer1 from "./pages/accountTransfer/AccountTransfer1";
import AccountTransfer2 from "./pages/accountTransfer/AccountTransfer2";
import AccountTransfer3 from "./pages/accountTransfer/AccountTransfer3";
import Mypage from "@/pages/mypage/Mypage";
import ChangePassword from "@/pages/mypage/settings/ChangePassword";
import AddPet from "@/pages/mypage/addPet/AddPet";
import AddPetStep2 from "@/pages/mypage/addPet/AddPetStep2";
import Schedule from "./pages/calender/schedule/Schedule";
import ScheduleCreate from "./pages/calender/schedule/ScheduleCreate";
import ScheduleDetail from "./pages/calender/schedule/ScheduleDetail";
import AddSchedule from "./components/schedule/AddSchedule";
import AddCategory from "./components/schedule/AddCategory";
import ScrollToTop from "./hooks/scrollToTop";
import ExpenseItem from "./pages/expense/ExpenseItem";
import Notice from "./pages/notice/Notice";
import EditPet from "./pages/mypage/editPet/EditPet";

import styled from "styled-components";
import { saveToken } from "./services/notificationServices";
import Test from "./pages/Test";

// 레이아웃 스타일
const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const ContentContainer = styled.div`
    flex: 1;
    overflow-y: auto; /* 스크롤 가능 */

    /* 스크롤바 숨기기 */
    ::-webkit-scrollbar {
        display: none;
    }

    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */

    padding-bottom: 122px;
`;

// 레이아웃 컴포넌트
const Layout = () => {
    return (
        <AppContainer>
            <ScrollToTop />
            <HeaderNav />
            <ContentContainer>
                <Outlet />
            </ContentContainer>
            <BottomNav />
        </AppContainer>
    );
};

interface Notification {
    title: string;
    body: string;
}

const App = () => {
    const [, setNotification] = useState<Notification>({ title: "", body: "" });

    // const authLoader = () => {
    //     const token = sessionStorage.getItem("accessToken");
    //     if (!token) {
    //         return redirect("/login");
    //     }
    //     return null;
    // };

    const requestNotificationPermission = async () => {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
            let token = await requestForToken();
            let retryCnt = 0;
            const maxTries = 3;

            while (!token && retryCnt < maxTries) {
                token = await requestForToken();
                retryCnt++;
            }

            if (token) {
                saveToken(token);
            }
        }
    };

    // App 컴포넌트 내부의 useEffect에서 호출
    useEffect(() => {
        requestNotificationPermission();
    }, []);

    const showNotification = useCallback((title: string, body: string) => {
        if ("Notification" in window && Notification.permission === "granted") {
            new Notification(title, {
                body: body,
                icon: "/firebase-logo.png",
            });
        }
        setNotification({ title, body });
    }, []);

    // 메시지 수신 리스너 설정 (컴포넌트 외부에서 호출)
    onMessageListener()
        .then((payload: any) => {
            if (payload?.data?.title && payload?.data?.body) {
                showNotification(payload.data.title, payload.data.body);
            }
        })
        .catch((err: Error) =>
            console.error("Failed to receive message: ", err)
        );

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    index: true,
                    // loader: authLoader,
                    element: <Home />,
                },
                {
                    path: "/login",
                    element: <Login />,
                },
                {
                    path: "/signup",
                    element: <SignUp />,
                },
                {
                    path: "/find-password",
                    element: <FindPassword />,
                },
                {
                    path: "/expense",
                    element: <Expense />,
                },
                {
                    path: "/expense/add",
                    element: <ExpenseAdd />,
                    children: [
                        {
                            index: true,
                            element: <AddSupplies />,
                        },
                        {
                            path: "medical",
                            element: <AddMedical />,
                        },
                    ],
                },
                {
                    path: "/expense-detail",
                    element: <ExpenseDetail />,
                },
                {
                    path: "/expense-filter",
                    element: <ExpenseFilter />,
                },
                {
                    path: "/expense-item",
                    element: <ExpenseItem />,
                },
                {
                    path: "/kakao-login",
                    element: <KakaoLogin />,
                },
                {
                    path: "/kakao-login-2fa",
                    element: <KakaoLogin2FA />,
                },
                {
                    path: "/petfriends-login",
                    element: <PetfriendsLogin />,
                },
                {
                    path: "/account",
                    element: <Account />,
                },
                {
                    path: "/account/:accountId",
                    element: <AccountDetail />,
                },
                {
                    path: "/account/:accountId/transfer1",
                    element: <AccountTransfer1 />,
                },
                {
                    path: "/account/:accountId/transfer2",
                    element: <AccountTransfer2 />,
                },
                {
                    path: "/account/:accountId/transfer3",
                    element: <AccountTransfer3 />,
                },
                {
                    path: "/account/:accountId/setting",
                    element: <AccountSetting />,
                },
                {
                    path: "/account/product/:productId",
                    element: <AccountOpen />,
                },
                {
                    path: "/account/product/:productId/create",
                    element: <AccountCreate />,
                },
                {
                    path: "/picture",
                    element: <PictureHome />,
                },
                {
                    path: "/picture/create",
                    element: <CreatePicture />,
                },
                {
                    path: "/picture/album",
                    element: <PictureAlbum />,
                },
                {
                    path: "/picture/:id",
                    element: <PictureDetail />,
                },
                {
                    path: "/mypage",
                    element: <Mypage />,
                },
                {
                    path: "/edit-pet/:id",
                    element: <EditPet />,
                },
                {
                    path: "/change-password",
                    element: <ChangePassword />,
                },
                {
                    path: "/add-pet",
                    element: <AddPet />,
                },
                {
                    path: "/add-pet/step-2",
                    element: <AddPetStep2 />,
                },
                {
                    path: "/schedule",
                    element: <Schedule />,
                },
                {
                    path: "/schedule/create",
                    element: <ScheduleCreate />,
                    children: [
                        {
                            path: "",
                            element: <AddSchedule />,
                        },
                        {
                            path: "category",
                            element: <AddCategory />,
                        },
                    ],
                },
                {
                    path: "/schedule/detail",
                    element: <ScheduleDetail />,
                },
                {
                    path: "/notice",
                    element: <Notice />,
                },
                {
                    path: "/test",
                    element: <Test />,
                },
            ],
        },
    ]);

    return (
        <RecoilRoot>
            <RouterProvider router={router} />
        </RecoilRoot>
    );
};

export default App;
