FROM pytorch/pytorch:2.0.0-cuda11.7-cudnn8-runtime

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements file
RUN pip install --upgrade pip setuptools wheel \
    && pip install torch==1.10.1 \
    && pip install transformers==4.8.2 sentencepiece==0.1.91

# Install KoBERT-related packages without dependencies
RUN pip install 'git+https://github.com/SKTBrain/KoBERT.git#egg=kobert_tokenizer&subdirectory=kobert_hf'

# Copy requirements file
COPY app/requirements.txt .

# Install other Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire app directory
COPY app/ .

# Expose the port the app runs on
EXPOSE 9008

# Command to run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "9008"]