import { getAccountProductInfo } from "@/services/accountServices";
import { bottomState, headerState } from "@/stores/useNavigationStore";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { AppPaths } from "@/interfaces/AppPaths";

import * as St from "./AccountOpen.style";
import Container from "@/components/ui/_container/Container";
import FreeSaving from "./freesaving/FreeSaving";
import InterestRateCalculator from "@/components/account/interestRateCalculator";

interface ProductInfo {
    accountProductId: number;
    title: string;
    cycle: string;
    detail: string;
    defaultInterestRate: number;
    maxInterestRate: number;
    minDepositAmount: number;
    maxDepositAmount: number;
}

const AccountOpen = () => {
    const setHeaderState = useSetRecoilState(headerState);
    const setBottomState = useSetRecoilState(bottomState);

    const [productInfo, setProductInfo] = useState<ProductInfo | null>(null);

    const { productId } = useParams();

    const fetchAccountProductInfo = useCallback(async () => {
        if (!productId) return;

        try {
            const data = await getAccountProductInfo();
            setProductInfo(data[productId]);
        } catch (error) {
            console.error(error);
        }
    }, [productId]);

    useEffect(() => {
        fetchAccountProductInfo();
    }, [fetchAccountProductInfo]);

    useEffect(() => {
        setHeaderState({
            left: "backArrow",
            right: "null",
            text: "상품 정보",
            isVisible: true,
            color: "white",
        });
        setBottomState({
            isVisible: true,
            activePage: "Account",
        });
    }, [productId, setHeaderState, setBottomState]);

    const processedDetail = productInfo?.detail.replace(/\\n/g, "\n");

    return (
        <St.Container>
            <St.ProductInfo>
                <h4 style={{ marginBottom: "2rem" }}>{productInfo?.title}</h4>
                <h2>{processedDetail}</h2>
                <St.OptionContainer>
                    <St.Option>
                        <p>금리</p>
                        <h4>최저 {productInfo?.defaultInterestRate}.00%</h4>
                        <h4>최고 {productInfo?.maxInterestRate}.00%</h4>
                    </St.Option>
                    <St.Option>
                        <p>{productInfo?.cycle} 납입 금액</p>
                        <h4>
                            최소{" "}
                            {productInfo?.minDepositAmount.toLocaleString()}원
                        </h4>
                        <h4>
                            최대{" "}
                            {productInfo?.maxDepositAmount.toLocaleString()}원
                        </h4>
                    </St.Option>
                </St.OptionContainer>
                <Container
                    color="yellow"
                    shadow={true}
                    path={`${AppPaths.PRODUCT}/${productId}/create`}
                >
                    신청하기
                </Container>
            </St.ProductInfo>
            <InterestRateCalculator />
            {productId === "0" && <FreeSaving />}
        </St.Container>
    );
};

export default AccountOpen;
