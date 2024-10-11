import { useState } from "react";
import * as St from "../../pages/calender/schedule/Schedule.style";
import Input from "../ui/_input/Input";
import { useNavigate } from "react-router-dom";
import { createNewCategory } from "@/services/scheduleServices";
import { AppPaths } from "@/interfaces/AppPaths";
import Container from "../ui/_container/Container";
import Modal from "../ui/_modal/Modal";

const AddCategory = () => {
    const [newCategory, setNewCategory] = useState("");
    const [selectedIcon, setSelectedIcon] = useState<string>("");
    const navagate = useNavigate();
    const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

    const handleSummit = async () => {
        if (newCategory) {
            try {
                const response = await createNewCategory(
                    newCategory,
                    selectedIcon
                );

                if (response === 201) {
                    navagate(AppPaths.SCHEDULE);
                }
            } catch (error) {
                setIsErrorModalOpen(true);
                console.error("새로운 카테고리 등록 중 에러:", error);
            }
        }
    };

    return (
        <Container
            color="beige"
            shadow={true}
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                height: "100%",
                gap: "1rem",
                cursor: "default",
            }}
        >
            <St.Item>
                <h5>* 새로운 카테고리의 이름을 정해주세요</h5>
                <Input
                    type="text"
                    value={newCategory}
                    onChange={setNewCategory}
                />
            </St.Item>
            <St.Item>
                <h5>* 새로운 카테고리의 아이콘을 정해주세요</h5>
                <St.CategoryIconContainer>
                    <Container
                        color={selectedIcon === "congrats" ? "pink" : "white"}
                        shadow={true}
                    >
                        <St.categoryIcon
                            src="/images/congrats.webp"
                            alt="congrats"
                            onClick={() => setSelectedIcon("congrats")}
                        />
                    </Container>
                    <Container
                        color={selectedIcon === "medical" ? "pink" : "white"}
                        shadow={true}
                    >
                        <St.categoryIcon
                            src="/images/medical.webp"
                            alt="medical"
                            onClick={() => setSelectedIcon("medical")}
                        />
                    </Container>
                    <Container
                        color={selectedIcon === "play" ? "pink" : "white"}
                        shadow={true}
                    >
                        <St.categoryIcon
                            src="/images/play.webp"
                            alt="play"
                            onClick={() => setSelectedIcon("play")}
                        />
                    </Container>
                    <Container
                        color={selectedIcon === "shopping" ? "pink" : "white"}
                        shadow={true}
                    >
                        <St.categoryIcon
                            src="/images/shopping.webp"
                            alt="shopping"
                            onClick={() => setSelectedIcon("shopping")}
                        />
                    </Container>
                </St.CategoryIconContainer>
            </St.Item>
            <Container color="yellow" shadow={true}>
                <div onClick={handleSummit}>
                    <h4>완료</h4>
                </div>
            </Container>
            <Modal
                state="RegistrationError"
                isOpen={isErrorModalOpen}
                onClose={() => setIsErrorModalOpen(false)}
            />
        </Container>
    );
};

export default AddCategory;
