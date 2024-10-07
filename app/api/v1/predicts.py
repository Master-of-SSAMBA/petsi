from service.predict_service import predict_category
from service.crawling_service import crawl
from model.predict import BatchRequest
from model.product import LoginInfo
from fastapi import APIRouter

router = APIRouter()

@router.post("/predict_categories")
async def predict_categories(login_info: LoginInfo):
    batch = BatchRequest(items=[])
    print(login_info)
    batch.items = crawl(login_info)
    
    results = []
    for item in batch.items:
        for product in item['products']:
            category = predict_category(product['name'])
            results.append({"title": product['name'], "detail": product['option'], "purchasedAt" : item['date'].replace('.', '-'), "quantity" : int(product['quantity'].replae('개', '')), "cost" : int(product['price'].replace(',', '').replace('원', '')), "img" : product['img'], "category": category})
    return results