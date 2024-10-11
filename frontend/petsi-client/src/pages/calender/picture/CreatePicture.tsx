import { useSetRecoilState } from "recoil";
import * as St from "./CreatePicture.style";
import { bottomState, headerState } from "@/stores/useNavigationStore";
import { useEffect, useState } from "react";
import Button from "@/components/ui/_button/Button";
import Upload from "@/assets/icons/Icon-upload.svg";
import Textarea from "@/components/ui/_textarea/Textarea";
import { useNavigate } from "react-router-dom";
import { AppPaths } from "@/interfaces/AppPaths";
import Modal from "@/components/ui/_modal/Modal";
import { uploadPicture } from "@/services/pictureServices";

const CreatePicture = () => {
    const navigate = useNavigate();
    const setHeaderState = useSetRecoilState(headerState);
    const setBottomState = useSetRecoilState(bottomState);

    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [content, setContent] = useState<string>("");

    const [modalOpen, setModalOpen] = useState<boolean>(false);

    useEffect(() => {
        setHeaderState({
            left: "backArrow",
            right: "alertActive",
            text: "매일 인증하기",
            isVisible: true,
            color: "beige",
        });
        setBottomState({
            isVisible: true,
            activePage: "Calendar",
        });
    }, [setHeaderState, setBottomState]);

    const handleTextareaChange = (value: string) => {
        setContent(value);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.type.startsWith("image/")) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result) {
                    setImageUrl(reader.result as string); // base64 미리보기용
                    setImageFile(file); // 파일 객체 저장
                }
            };
            reader.readAsDataURL(file);
        } else {
            alert("이미지 파일만 선택할 수 있습니다.");
        }
    };

    const uploadImage = async () => {
        if (imageFile) {
            try {
                // 줄바꿈 변환 정규 표현식
                const formattedContent = content.replace(/<br\s*\/?>/g, "\n");
                setContent(formattedContent);

                const formData = new FormData();
                formData.append("img", imageFile);
                formData.append("content", content);

                const response = await uploadPicture(formData);
                if (response) {
                    navigate(AppPaths.PICTURE_ALBUM);
                }
            } catch (error) {
                setModalOpen(true);
                console.error("Error uploading image", error);
            }
        }
    };

    return (
        <St.Continer>
            <St.BtnContainer>
                <div>
                    <Button
                        color="yellow"
                        size="small"
                        text="저장하기"
                        shadow={true}
                        onButtonClick={uploadImage}
                    />
                </div>
            </St.BtnContainer>
            <St.UploadBox>
                <St.ItemIcon src={imageUrl || Upload} />
                <h4>인증사진을 업로드하세요.</h4>
                <div>
                    <Button
                        color="white"
                        size="large"
                        text="UPLOAD"
                        onButtonClick={() =>
                            document.getElementById("fileInput")?.click()
                        }
                    />
                    <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                    />
                </div>
            </St.UploadBox>
            <Textarea
                borderColor="black"
                backgroundColor="white"
                shadow={true}
                onChange={handleTextareaChange}
            />
            <Modal
                state="PictureExist"
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
            />
        </St.Continer>
    );
};

export default CreatePicture;
