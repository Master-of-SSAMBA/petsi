import * as St from "../common/Common.style";

export const Docs = () => {
    return (
        <St.InnerContainer>
            <img src="/images/document.webp" />
            <h2>
                통장에 꼭 필요한 설명서와
                <br />
                동의만 모았어요
            </h2>
            <St.DocsContainer>
                <St.DocsHeader>
                    <h3 style={{ color: "var(--color-gray)" }}>필수 동의</h3>
                    <h3>싸피뱅크</h3>
                </St.DocsHeader>
                <St.DocsList>
                    <p>싸피뱅크 모바일뱅킹 서비스 이용에 관한 설명</p>
                    <p>싸피뱅크 자유적금 상품설명서</p>
                    <p>예금거래기본약관</p>
                    <p>적립식예금 약관</p>
                    <p>자동이체 약관</p>
                    <p>싸피뱅크 자유적금 특약</p>
                    <p>비과세종합저축 특약</p>
                </St.DocsList>
            </St.DocsContainer>
            <St.DocsContainer>
                <St.DocsHeader>
                    <h3 style={{ color: "var(--color-gray)" }}>필수 동의</h3>
                    <h3>펫시</h3>
                </St.DocsHeader>
                <St.DocsList>
                    <p>펫시 전자인증서비스 약관</p>
                    <p>고유식별정보 수집 이용 동의</p>
                    <p>개인정보 수집 이용 동의</p>
                </St.DocsList>
            </St.DocsContainer>
        </St.InnerContainer>
    );
};
