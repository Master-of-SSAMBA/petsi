import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

// recoil-persist 설정
const { persistAtom } = recoilPersist({
    key: "recoil-persist",
    storage: sessionStorage,
});

export const accessTokenState = atom<string | null>({
    key: "accessToken",
    default: null,
    effects_UNSTABLE: [persistAtom],
});

export const refreshTokenState = atom<string | null>({
    key: "refreshToken",
    default: null,
    effects_UNSTABLE: [persistAtom],
});

// 토큰 만료시키는 함수
export const expireToken = () => {
    sessionStorage.removeItem("recoil-persist");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
};

// 액세스 토큰
export const handleAccessToken = (): string | null => {
    const recoilPersistData = sessionStorage.getItem("recoil-persist");
    if (recoilPersistData) {
        const parsedData = JSON.parse(recoilPersistData);

        // parsedData가 어떤 구조인지 확인하기 위한 로그 출력

        // accessToken 경로가 정확한지 확인
        if (parsedData && parsedData.accessToken) {
            return parsedData.accessToken;
        } else {
            return null;
        }
    }
    return null; // 없으면 null 반환
};

// 리프레시 토큰을 가져오는 함수
export const handleRefreshToken = (): string | null => {
    const recoilPersistData = sessionStorage.getItem("recoil-persist");
    if (recoilPersistData) {
        const parsedData = JSON.parse(recoilPersistData);
        return parsedData.refreshToken; // refreshToken이 존재하면 반환
    }
    return null; // 없으면 null 반환
};
