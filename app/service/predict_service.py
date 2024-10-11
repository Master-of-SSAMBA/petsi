import torch
from torch import nn
import json
from transformers import BertModel
from kobert_tokenizer import KoBERTTokenizer
import asyncio

# 모델 및 토크나이저 로드
tokenizer = KoBERTTokenizer.from_pretrained('skt/kobert-base-v1')
bert_model = BertModel.from_pretrained('skt/kobert-base-v1')

# PetProductClassifier 클래스 정의 추가
class PetProductClassifier(nn.Module):
    def __init__(self, n_classes):
        super(PetProductClassifier, self).__init__()
        self.bert = bert_model
        self.drop = nn.Dropout(p=0.3)
        self.fc = nn.Linear(self.bert.config.hidden_size, n_classes)

    def forward(self, input_ids, attention_mask):
        outputs = self.bert(input_ids=input_ids, attention_mask=attention_mask)
        output = self.drop(outputs.pooler_output)
        return self.fc(output)

# 모델 정보 로드
with open('./ai/model_info.json', 'r') as f:
    model_info = json.load(f)

category_to_id = model_info['category_to_id']
MAX_LEN = model_info['max_len']

# 모델 로드
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = PetProductClassifier(n_classes=len(category_to_id))  # category_to_id는 미리 정의되어 있어야 합니다
model.load_state_dict(torch.load('./ai/pet_product_classifier_final.pth', map_location=device, weights_only=True))
model.to(device)
model.eval()

def sync_predict_category(text):
    encoding = tokenizer.encode_plus(
        text,
        add_special_tokens=True,
        max_length=MAX_LEN,  # MAX_LEN과 동일하게 설정
        return_token_type_ids=False,
        padding='max_length',
        truncation=True,
        return_attention_mask=True,
        return_tensors='pt',
    )

    input_ids = encoding['input_ids'].to(device)
    attention_mask = encoding['attention_mask'].to(device)

    with torch.no_grad():
        outputs = model(input_ids=input_ids, attention_mask=attention_mask)
        _, preds = torch.max(outputs, dim=1)

    predicted_category = list(category_to_id.keys())[list(category_to_id.values()).index(preds.item())]
    return predicted_category

async def predict_category(text):
    return await asyncio.to_thread(sync_predict_category, text)
