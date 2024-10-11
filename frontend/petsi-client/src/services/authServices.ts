import axios from "axios";
import {
    // accessTokenState,
    // refreshTokenState,
    expireToken,
    handleAccessToken,
    // handleRefreshToken,
} from "@/stores/useAuthStore";
import { AppPaths } from "@/interfaces/AppPaths";
// import { useSetRecoilState } from "recoil";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const keycloakConfig = {
    url: "https://j11a403.p.ssafy.io/auth",
    realm: "petsi",
    clientId: "petsi-front",
    clientSecret: import.meta.env.VITE_CLIENT_SECRET,
};

// Axios 인스턴스 생성
export const apiClient = axios.create({
    baseURL: `${VITE_API_URL}`,
});

// 요청 인터셉터
apiClient.interceptors.request.use(
    async (config) => {
        const accessToken = handleAccessToken();

        // access-token이 없거나 만료된 경우 토큰 갱신을 시도
        // if (!accessToken) {
        //     try {
        //         const { new_access_token, new_refresh_token } =
        //             await tokenRefresh();
        //         accessToken = new_access_token;

        //         const setAccessToken = useSetRecoilState(accessTokenState);
        //         const setRefreshToken = useSetRecoilState(refreshTokenState);

        //         setAccessToken(new_access_token);
        //         setRefreshToken(new_refresh_token);
        //     } catch (refreshError) {
        //         expireToken(); // 토큰 갱신 실패 시 로그아웃 처리
        //         location.href = AppPaths.LOGIN;
        //         return Promise.reject(refreshError);
        //     }
        // }

        if (config.data instanceof FormData) {
            config.headers["Content-Type"] = "multipart/form-data";
        } else {
            config.headers["Content-Type"] = "application/json";
        }
        config.headers["Authorization"] = `Bearer ${accessToken}`;

        return config;
    },
    (error) => {
        console.error(error);
        return Promise.reject(error);
    }
);

// 응답 인터셉터
// apiClient.interceptors.response.use(
//     (response) => {
//         if (response.status === 404) {
//             // console.log("404 페이지로 이동");
//             // 추후 404페이지로 리다이렉트
//         }
//         return response;
//     },

//     async (error) => {
//         const originalRequest = error.config;
//         const setAccessToken = useSetRecoilState(accessTokenState);
//         const setRefreshToken = useSetRecoilState(refreshTokenState);

//         // 401 오류 발생 시 && 인터셉터에서 요청이 처음 시도될 때(무한 재시도 방지): 토큰 갱신 처리
//         if (error.response?.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;
//             try {
//                 const { new_access_token, new_refresh_token } =
//                     await tokenRefresh();

//                 setAccessToken(new_access_token);
//                 setRefreshToken(new_refresh_token);

//                 originalRequest.headers["Authorization"] =
//                     `Bearer ${new_access_token}`;

//                 // 중단된 요청 재시도
//                 return apiClient(originalRequest);
//             } catch (refreshError) {
//                 expireToken(); // 리프레시 토큰 실패 시 로그아웃 처리
//                 return Promise.reject(refreshError);
//             }
//         }

//         return Promise.reject(error);
//     }
// );

// 토큰 갱신 함수
// const tokenRefresh = async () => {
//     const refreshToken = handleRefreshToken();

//     if (refreshToken === null) {
//         throw new Error("No refresh token available");
//     }

//     const response = await axios.post(
//         `${keycloakConfig.url}/realms/${keycloakConfig.realm}/protocol/openid-connect/token`,
//         new URLSearchParams({
//             grant_type: "refresh_token",
//             client_id: keycloakConfig.clientId,
//             client_secret: keycloakConfig.clientSecret,
//             refresh_token: refreshToken,
//         }),
//         {
//             headers: {
//                 "Content-Type": "application/x-www-form-urlencoded",
//             },
//         }
//     );

//     console.log(response.data);

//     const { access_token: new_access_token, refresh_token: new_refresh_token } =
//         response.data;
//     return { new_access_token, new_refresh_token };
// };

// 로그인 함수
const userLogIn = async (email: string, password: string) => {
    try {
        const response = await axios.post(
            `${keycloakConfig.url}/realms/${keycloakConfig.realm}/protocol/openid-connect/token`,
            new URLSearchParams({
                grant_type: "password",
                client_id: keycloakConfig.clientId,
                client_secret: keycloakConfig.clientSecret,
                username: email,
                password: password,
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        return response;
    } catch (error) {
        console.error("Login failed", error);
        throw error;
    }
};

// 로그아웃 함수
const userLogOut = () => {
    expireToken();
    location.replace(AppPaths.LOGIN);
};

// 이메일 중복 체크
const checkEmail = async (email: string) => {
    try {
        const response = await axios.post(
            `${VITE_API_URL}/user/email-check`,
            {
                email: email,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    accept: "*/*",
                },
            }
        );
        return response.status === 200;
    } catch (error) {
        console.error("이메일 중복 확인에 실패했습니다.", error);
    }
};

export { userLogIn, userLogOut, checkEmail };
