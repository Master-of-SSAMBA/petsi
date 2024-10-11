import { useEffect, useRef } from "react";
import * as St from "./FreeSaving.style";

const FreeSaving = () => {
    const descriptionRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("fade-in");

                        // 한 번 애니메이션이 실행되면 더 이상 관찰하지 않음
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.4, // 80%가 보이면 애니메이션 시작
            }
        );

        const refs = descriptionRefs.current;

        refs.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => {
            refs.forEach((ref) => {
                if (ref) observer.unobserve(ref); // 클린업 시 로컬 변수를 사용
            });
        };
    }, []);

    return (
        <St.Container>
            <St.Description
                ref={(el) => (descriptionRefs.current[0] = el)}
                color="lightgray"
            >
                <img src="/images/productImage/freesaving1.webp" />
                <h3>
                    조건이나 손해없이,
                    <br />
                    내맘대로
                </h3>
                <p>
                    묘으면댕 자유적금은
                    <br />
                    지켜야하는 납입일, 납입횟수로 인한
                    <br />
                    금리 손해나 불편이 없습니다.
                    <br />
                    <br />
                    자동이체로 편리하게, 추가 납입도 자유롭게,
                    <br />
                    탄력적으로 적금을 운용해보세요.
                </p>
            </St.Description>
            <St.Description ref={(el) => (descriptionRefs.current[1] = el)}>
                <img src="/images/productImage/freesaving2.webp" />
                <h3>
                    매일, 매주, 매월
                    <br />
                    원하는 주기로
                </h3>
                <p>
                    자동이체로 적금 납입을 설정하시면,
                    <br />
                    안정적으로 적금 운용이 가능합니다.
                    <br />
                    <br />
                    적은 금액을 매일 매일,
                    <br />
                    일정 금액을 매주마다,
                    <br />
                    월급날에 맞춰 매월,
                    <br />
                    <br />
                    원하는 금액과 기간을 설정하여
                    <br />
                    이용해보세요.
                </p>
            </St.Description>
            <St.Description
                ref={(el) => (descriptionRefs.current[2] = el)}
                color="lightgray"
            >
                <img src="/images/productImage/freesaving3.webp" />
                <h3>추가 납입도 언제든지</h3>
                <p>
                    갑자기 돈이 생겼을 때, 돈이 남았을 때
                    <br />
                    추가납입을 이용해보세요.
                    <br />
                    <br />
                    원금이 많아지면 많아질수록
                    <br />
                    만기 시 지급되는 이자도 커집니다.
                    <br />
                    <br />
                    &#40;적금 계좌당 자동이체와
                    <br />
                    추가납입을 합산하여
                    <br />월 최대 300만원까지 납입 가능합니다.&#41;
                </p>
            </St.Description>
            <St.Description ref={(el) => (descriptionRefs.current[3] = el)}>
                <img src="/images/productImage/freesaving4.webp" />
                <h3>자동 연장으로 복리효과를</h3>
                <p>
                    적금이 만기가 되면, 정기예금으로 변경하시나요?
                    <br />
                    <br />
                    적금 자동연장을 이용하시면
                    <br />
                    최대 5회까지 만기 시 원금과 이자가
                    <br />
                    다시 원금으로 재예치되어 시작하기 때문에
                    <br />
                    예금보다 높은 이자효과를 누릴 수 있습니다.
                    <br />
                    <br />
                    &#40;금리는 자동연장 시점에 고시된
                    <br />이 상품의 금리가 적용됩니다.&#41;
                </p>
            </St.Description>
        </St.Container>
    );
};

export default FreeSaving;
