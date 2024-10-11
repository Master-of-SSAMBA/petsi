import { useEffect, useState, useRef, useCallback } from "react";
import { useSetRecoilState } from "recoil";
import { bottomState, headerState } from "@/stores/useNavigationStore";
import * as St from "./PictureAlbum.style";
import { useNavigate } from "react-router-dom";
import { fetchPictures } from "@/services/pictureServices";

interface Picture {
    pictureId: number;
    img: string;
}

const PictureAlbum = () => {
    const navigate = useNavigate();
    const setHeaderState = useSetRecoilState(headerState);
    const setBottomState = useSetRecoilState(bottomState);

    const [page, setPage] = useState(0);
    const [pictureList, setPictureList] = useState<Picture[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true); // 더 불러올 페이지가 있는지 (무한스크롤 제어)

    const getPictures = useCallback(async () => {
        if (loading || !hasMore) return;
        setLoading(true);
        try {
            const response = await fetchPictures(page);
            if (response && response.length > 0) {
                setPictureList((prev) => [...prev, ...response]);
                setHasMore(response.length === 20);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error("Error fetching pictures:", error);
        }
        setLoading(false);
    }, [page, hasMore, loading]);

    useEffect(() => {
        if (pictureList.length <= page * 20) {
            getPictures();
        }
    }, [pictureList, page, getPictures]);

    useEffect(() => {
        setHeaderState({
            left: "backArrow",
            right: "alertActive",
            text: "인증 모아보기",
            isVisible: true,
            color: "beige",
        });
        setBottomState({
            isVisible: true,
            activePage: "Calendar",
        });
    }, [setHeaderState, setBottomState]);

    const observer = useRef<IntersectionObserver | null>(null);

    // pictureList의 마지막 요소가 감지될 때마다 콜백 함수 실행
    const lastPictureElementRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (loading) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    setPage((prevPage) => prevPage + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [loading, hasMore]
    );

    // 큰 이미지인지 판단
    const isLarge = (index: number) => {
        return index % 30 === 0 || (index - 16) % 30 === 0;
    };

    // 큰 이미지의 위치 결정 (left or right)
    const getColumnStart = (index: number) => {
        if (index % 30 === 0) {
            return 1; // 왼쪽
        } else if ((index - 16) % 30 === 0) {
            return 2; // 오른쪽
        }
        return null;
    };

    return (
        <St.Container>
            <St.Grid>
                {pictureList.map((picture, index) => (
                    <St.GridItem
                        key={`${picture.pictureId}`}
                        // 마지막 요소에는 ref 부여 > 옵저버 감시 대상
                        ref={
                            index === pictureList.length - 1
                                ? lastPictureElementRef
                                : null
                        }
                        $isLarge={isLarge(index)}
                        $columnStart={getColumnStart(index)}
                    >
                        <St.Image
                            src={picture.img}
                            alt={`Picture ${picture.pictureId}`}
                            onClick={() =>
                                navigate(`/picture/${picture.pictureId}`)
                            }
                        />
                    </St.GridItem>
                ))}
            </St.Grid>
        </St.Container>
    );
};

export default PictureAlbum;
