# Use PyTorch base image
FROM pytorch/pytorch:2.0.0-cuda11.7-cudnn8-runtime

# Set working directory
WORKDIR /

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements file
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Install KoBERT-specific dependencies
RUN pip install --no-cache-dir \
    transformers==4.30.2 \
    sentencepiece==0.1.99
RUN pip install git+https://github.com/SKTBrain/KoBERT.git@master

# Copy the application code
COPY . .

# Expose port
EXPOSE 9008

# Command to run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "9008"]