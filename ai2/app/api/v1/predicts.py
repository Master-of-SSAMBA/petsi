import torch
from torch import nn
from fastapi import APIRouter, UploadFile, File
from models.predict import PetPredictionResponse
from torchvision import models, transforms
from PIL import Image
import io

router = APIRouter()

# 디바이스 설정
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# 클래스 이름 정의
class_names = ['cat', 'dog', 'other']  # 실제 클래스 이름으로 수정해야 함

# 데이터 변환
data_transforms = transforms.Compose([
    transforms.Resize(256),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
])

# ResNet50 모델 정의
class PetClassifier(nn.Module):
    def __init__(self):
        super(PetClassifier, self).__init__()
        self.model = models.resnet50(weights=None)
        num_ftrs = self.model.fc.in_features
        self.model.fc = nn.Sequential(
            nn.Linear(num_ftrs, 512),
            nn.ReLU(),
            nn.Dropout(0.2),
            nn.Linear(512, 3)
        )

    def forward(self, x):
        return self.model(x)

# 모델 인스턴스 생성
pet_model = PetClassifier()

# 모델 로드
state_dict = torch.load('./ai/cat_dog_classifier.pth', map_location=device, weights_only=True)

# 키 이름 조정
new_state_dict = {}
for k, v in state_dict.items():
    if not k.startswith('model.'):
        new_state_dict['model.' + k] = v
    else:
        new_state_dict[k] = v

pet_model.load_state_dict(new_state_dict)
pet_model.to(device)
pet_model.eval()

def predict_image(image):
    img_tensor = data_transforms(image).unsqueeze(0).to(device)
    
    with torch.no_grad():
        outputs = pet_model(img_tensor)
        probs = torch.nn.functional.softmax(outputs, dim=1)
        _, preds = torch.max(outputs, 1)
    
    predicted_class = class_names[preds.item()]
    confidence = probs[0][preds].item()
    
    return predicted_class, confidence

@router.post("/predict-is-pet", response_model=PetPredictionResponse)
async def predict_pet_image(file: UploadFile = File(...)):
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert('RGB')
    
    predicted_class, confidence = predict_image(image)
    is_pet = predicted_class in ['cat', 'dog']

    return PetPredictionResponse(isPet=is_pet, confidence=confidence)