FROM pytorch/pytorch:2.0.0-cuda11.7-cudnn8-runtime

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements file
COPY app/requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Install onnxruntime
RUN pip install onnxruntime==1.19.0

# Install KoBERT-related packages without dependencies
RUN pip install --no-cache-dir \
    git+https://github.com/SKTBrain/KoBERT.git@master \
    git+https://github.com/monologg/KoBERT-Transformers.git \
    git+https://github.com/monologg/kobert_tokenizer.git

# Copy the entire app directory
COPY app/ .

# Expose the port the app runs on
EXPOSE 9008

# Command to run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "9008"]