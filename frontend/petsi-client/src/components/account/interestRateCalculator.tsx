import { useState } from "react";
import * as St from "./interestRateCalculator.style";

const InterestRateCalculator = () => {
    const [selectedMonths, setSelectedMonths] = useState(24);
    const [selectedAmount, setSelectedAmount] = useState(1000000);
    const interestRate = 0.03; // 연이율 3%

    const handleMonthsChage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedMonths(parseInt(e.target.value, 10));
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedAmount(parseInt(e.target.value, 10));
    };

    // 만기 예상 이자 계산 (단리 방식)
    const calculateInterest = () => {
        const principal = selectedAmount * selectedMonths; // 총 원금 = 월 납입금 * 납입 개월 수
        const interest = principal * (interestRate / 12) * selectedMonths; // 이자 = 원금 * 월 이율 * 기간
        return { principal, interest };
    };

    const { principal, interest } = calculateInterest();

    return (
        <St.Container>
            <h3>받을 이자를 미리 계산해보세요</h3>
            <St.SliderContainer>
                <St.AnimatedNumber>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "baseline",
                        }}
                    >
                        <h4 style={{ marginRight: "0.5rem" }}>연</h4>{" "}
                        <h1 style={{ color: "var(--color-green)" }}>3.00</h1>
                        <h4> %</h4>
                    </div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <St.AnimatedContent key={selectedMonths}>
                            <h4>{selectedMonths}</h4>
                        </St.AnimatedContent>
                        <h4>개월 만기</h4>
                    </div>
                </St.AnimatedNumber>
                <St.Slider
                    type="range"
                    min={6}
                    max={36}
                    step={1}
                    value={selectedMonths}
                    onChange={handleMonthsChage}
                    // thumb 기준으로 왼쪽과 오른쪽 색상 설정
                    style={{
                        background: `linear-gradient(to right, var(--color-black) ${
                            ((selectedMonths - 6) / (36 - 6)) * 100
                        }%, var(--color-yellow) ${
                            ((selectedMonths - 6) / (36 - 6)) * 100
                        }%)`,
                    }}
                />
                <St.LabelContainer>
                    {[6, 12, 18, 24, 30, 36].map((month) => (
                        <St.Label key={month}>{month}</St.Label>
                    ))}
                </St.LabelContainer>
            </St.SliderContainer>
            <St.SliderContainer>
                <St.AnimatedNumber>
                    <div style={{ display: "flex", alignItems: "baseline" }}>
                        <h4 style={{ marginRight: "0.5rem" }}>월</h4>{" "}
                        <St.AnimatedContent key={selectedAmount}>
                            <h1 style={{ color: "var(--color-green)" }}>
                                {selectedAmount.toLocaleString()}
                            </h1>
                        </St.AnimatedContent>
                        <h4> 원</h4>
                    </div>
                </St.AnimatedNumber>
                <St.Slider
                    type="range"
                    min={10000}
                    max={3000000}
                    step={10000}
                    value={selectedAmount}
                    onChange={handleAmountChange}
                    style={{
                        background: `linear-gradient(to right, var(--color-black) ${
                            ((selectedAmount - 1000) / (3000000 - 1000)) * 100
                        }%, var(--color-yellow) ${
                            ((selectedAmount - 1000) / (3000000 - 1000)) * 100
                        }%)`,
                    }}
                />
                <St.LabelContainer style={{ gap: "2rem" }}>
                    {[0, 50, 100, 150, 200, 250, 300].map((money) => (
                        <St.Label key={money}>{money}</St.Label>
                    ))}
                </St.LabelContainer>
            </St.SliderContainer>
            <St.ResultContainer>
                <St.ResultItem>
                    <St.AnimatedNumber>
                        <h5>만기 예상 원금</h5>
                        <St.AnimatedContent key={principal}>
                            <h4 style={{ fontSize: "1.3rem" }}>
                                {principal.toLocaleString()}원
                            </h4>
                        </St.AnimatedContent>
                    </St.AnimatedNumber>
                </St.ResultItem>
                <St.ResultItem>
                    <St.AnimatedNumber>
                        <h5>만기 예상 이자(세전)</h5>
                        <St.AnimatedContent key={interest}>
                            <h4 style={{ fontSize: "1.3rem" }}>
                                {interest.toLocaleString()}원
                            </h4>
                        </St.AnimatedContent>
                    </St.AnimatedNumber>
                </St.ResultItem>
            </St.ResultContainer>
        </St.Container>
    );
};

export default InterestRateCalculator;
