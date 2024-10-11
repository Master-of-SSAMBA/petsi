import { useCallback, useEffect, useState } from "react";
import * as St from "./PictureDetail.style";
import { useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { bottomState, headerState } from "@/stores/useNavigationStore";
import Container from "@/components/ui/_container/Container";
import { fetchPictureData } from "@/services/pictureServices";

interface PictureData {
    content: string;
    img: string;
    pictureId: number;
    registDate: string[];
}

const PictureDetail = () => {
    const { id } = useParams();
    const setHeaderState = useSetRecoilState(headerState);
    const setBottomState = useSetRecoilState(bottomState);

    const [pictureData, setPictureData] = useState<PictureData>();

    const loadPictureData = useCallback(async () => {
        try {
            const response = await fetchPictureData(id);

            setPictureData({
                content: response.content,
                img: response.img,
                pictureId: response.pictureId,
                registDate: response.registDate.date.split("-"),
            });
        } catch (error) {
            console.error(error);
        }
    }, [id]);

    useEffect(() => {
        const fetchData = async () => {
            if (id) {
                await loadPictureData();
            }
        };
        fetchData();
    }, [id, loadPictureData]);

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

    return (
        <St.Container>
            <St.PictureContainer>
                <St.ImgSection>
                    <St.Date>
                        <h1>{pictureData?.registDate[2]}</h1>
                        <div>
                            <h5>{pictureData?.registDate[0]}년</h5>
                            <h5>{pictureData?.registDate[1]}월</h5>
                        </div>
                    </St.Date>
                    <img src={pictureData?.img} />
                </St.ImgSection>
            </St.PictureContainer>
            <Container color="white" shadow={true}>
                <St.Content>{pictureData?.content}</St.Content>
            </Container>
        </St.Container>
    );
};

export default PictureDetail;
