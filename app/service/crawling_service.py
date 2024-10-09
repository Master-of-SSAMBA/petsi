from fastapi import HTTPException, APIRouter
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from model.product import LoginInfo
import asyncio

router = APIRouter()

def setup_driver():
    chrome_options = Options()
    # chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    print('안녕4')
    service = Service(ChromeDriverManager().install())
    print('안녕5')
    return webdriver.Chrome(service=service, options=chrome_options)

async def click_more_button(driver):
    try:
        more_buttons = await asyncio.to_thread(driver.find_elements, By.CSS_SELECTOR, 
            ".c-lhSsmZ.c-lhSsmZ-ixmTrB-variant-read_13M.c-lhSsmZ-ivJBzT-css")
        for button in more_buttons:
            if "더보기" in await asyncio.to_thread(lambda: button.text) and await asyncio.to_thread(lambda: button.is_displayed()) and await asyncio.to_thread(lambda: button.is_enabled()):
                await asyncio.to_thread(driver.execute_script, "arguments[0].scrollIntoView({behavior: 'smooth', block: 'center'});", button)
                await asyncio.sleep(0.5)
                await asyncio.to_thread(button.click)
                print("'더보기' 버튼 클릭")
                await asyncio.sleep(0.2)  # 클릭 후 콘텐츠 로딩 대기
                return True
        return False
    except Exception as e:
        print(f"더보기 버튼 클릭 중 오류 발생: {str(e)}")
        return False

async def scroll_and_click_more(driver):
    last_height = await asyncio.to_thread(driver.execute_script, "return document.body.scrollHeight")
    scroll_increment = 400  # 한 번에 스크롤할 픽셀 수
    no_change_count = 0
    max_no_change = 5  # 변화가 없는 최대 횟수

    while no_change_count < max_no_change:
        await asyncio.to_thread(driver.execute_script, f"window.scrollBy(0, {scroll_increment});")
        await asyncio.sleep(1)

        clicked = await click_more_button(driver)
        
        current_position = await asyncio.to_thread(driver.execute_script, "return window.pageYOffset;")
        
        if current_position + await asyncio.to_thread(driver.execute_script, "return window.innerHeight;") >= last_height:
            new_height = await asyncio.to_thread(driver.execute_script, "return document.body.scrollHeight")
            if new_height == last_height and not clicked:
                no_change_count += 1
                print(f"페이지 끝 도달, 변화 없음 카운트: {no_change_count}/{max_no_change}")
            else:
                no_change_count = 0
                last_height = new_height
        else:
            no_change_count = 0

        if clicked:
            no_change_count = 0  # 버튼 클릭 시 카운터 리셋

    print("무한 스크롤 로딩 완료")

async def kakao_login(login_url, order_url, username, password):
    print('안녕')
    driver = await asyncio.to_thread(setup_driver)
    print('안녕3')

    try:
        print('메인 페이지 열기')
        await asyncio.to_thread(driver.get, login_url)

        print('카카오 로그인 버튼 찾기')
        kakao_login_button = await asyncio.to_thread(WebDriverWait(driver, 60).until,
            EC.presence_of_element_located((By.CSS_SELECTOR, 'img#kakao-login-btn'))
        )
        await asyncio.to_thread(kakao_login_button.click)

        print('팝업 창 감지')
        await asyncio.to_thread(WebDriverWait(driver, 30).until, EC.number_of_windows_to_be(2))
        await asyncio.to_thread(driver.switch_to.window, driver.window_handles[1])

        print('로그인 폼 대기')
        await asyncio.to_thread(WebDriverWait(driver, 60).until, EC.presence_of_element_located((By.TAG_NAME, 'form')))

        print('아이디 입력')
        id_input = await asyncio.to_thread(WebDriverWait(driver, 60).until,
            EC.presence_of_element_located((By.CSS_SELECTOR, 'input[name="loginId"]'))
        )
        await asyncio.to_thread(id_input.send_keys, username)

        print('비밀번호 입력')
        pw_input = await asyncio.to_thread(WebDriverWait(driver, 60).until,
            EC.presence_of_element_located((By.CSS_SELECTOR, 'input[name="password"]'))
        )
        await asyncio.to_thread(pw_input.send_keys, password)

        print('로그인 버튼 클릭')
        login_button = await asyncio.to_thread(WebDriverWait(driver, 60).until,
            EC.element_to_be_clickable((By.CSS_SELECTOR, 'button.btn_g.highlight.submit'))
        )
        await asyncio.to_thread(login_button.click)

        await asyncio.sleep(1)

        print('로그인 완료 대기')
        await asyncio.to_thread(WebDriverWait(driver, 60).until, EC.url_contains('pet-friends.co.kr'))

        print('계속하기 버튼 찾기')
        check_button = await asyncio.to_thread(WebDriverWait(driver, 60).until,
            EC.element_to_be_clickable((By.CSS_SELECTOR, 'button.btn_agree'))
        )
        await asyncio.to_thread(check_button.click)

        await asyncio.sleep(1)

        await asyncio.to_thread(driver.switch_to.window, driver.window_handles[0])

        await asyncio.sleep(1)

        print('구매 내역 페이지 열기')
        await asyncio.to_thread(driver.get, order_url)
        await asyncio.sleep(1)

        print('무한 스크롤 및 더보기 클릭 시작')
        await scroll_and_click_more(driver)
        print('무한 스크롤 및 더보기 클릭 완료')

        orders = await asyncio.to_thread(driver.execute_script, """
            // 주문 날짜와 해당 날짜의 "배송완료" 상품 정보를 추출
            const orderData = [];

            // 각 section 태그를 순회
            document
                .querySelectorAll("section.c-ctigpz.c-ctigpz-icwlgEx-css")
                .forEach((section) => {
                // 날짜 추출
                const dateElement = section.querySelector(
                    "span.c-lhSsmZ-ikrgohU-css"
                );
                const orderDate = dateElement.textContent;

                // "배송완료" 상태의 상품 정보를 추출
                const products = [];
                section
                    .querySelectorAll("h3.c-lhSsmZ-ihRbtff-css")
                    .forEach((productElement, index) => {
                    const statusElement = section.querySelectorAll(
                        "h3.c-lhSsmZ-goPmRm-variant-read_14B"
                    )[index];
                    if (
                        statusElement &&
                        statusElement.textContent.includes("배송완료")
                    ) {
                        const productName = productElement.textContent.trim();

                        const productImageElement =
                        section.querySelectorAll("img")[index];
                        const productImg = productImageElement
                        ? productImageElement.getAttribute("src")
                        : "No Image";

                        const optionElement = section.querySelector(
                        "h4.c-lhSsmZ-ijkZAUx-css"
                        );
                        let productOption = "";
                        if (optionElement) {
                        const optionText = optionElement.textContent;
                        const optionMatch = optionText.match(/옵션:\s*(.*)/); // "옵션: " 뒤의 모든 텍스트 추출
                        if (optionMatch) {
                            productOption = optionMatch[1].trim();
                        }
                        }

                        const quantityElement = section.querySelectorAll(
                        "em.c-lhSsmZ-ikrgohU-css"
                        )[index];

                        const productQuantity = quantityElement
                        ? quantityElement.textContent.trim()
                        : "No Quantity Info";

                        const productPriceElement = section.querySelectorAll(
                        "em.c-lhSsmZ-goPmRm-variant-read_14B"
                        )[index];

                        const productPrice = productPriceElement
                        ? productPriceElement.textContent.trim()
                        : "Unknown Price";

                        products.push({
                        img: productImg,
                        name: productName,
                        option: productOption,
                        quantity: productQuantity,
                        price: productPrice,
                        });
                    }
                    });

                // 날짜와 해당 날짜의 상품 정보를 저장
                if (products.length > 0) {
                    orderData.push({
                    date: orderDate,
                    products: products,
                    });
                }
                });
            return orderData; 

        """)

        print(orders)
        count = sum(len(order['products']) for order in orders)
        print(count)

        return orders

    except Exception as e:
        print('에러 발생:', str(e))
        raise
    finally:
        await asyncio.to_thread(driver.quit)

async def crawl(login_info: LoginInfo):
    try:
        print('안녕2')
        ordered_url = 'https://m.pet-friends.co.kr/order-history/list'
        website_url = 'https://m.pet-friends.co.kr/login?next=%2Fmy'
        orders = await kakao_login(website_url, ordered_url, login_info.username, login_info.password)
        return orders
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))