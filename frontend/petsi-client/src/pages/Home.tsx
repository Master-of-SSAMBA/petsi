import { NavLink } from "react-router-dom";

const Home = () => {
    return (
        <>
            <h1>Home</h1>
            <NavLink to="/login">로그인 페이지로 이동하기</NavLink>
            <NavLink to="/account">계좌 페이지로 이동하기</NavLink>
        </>
    );
};

export default Home;
