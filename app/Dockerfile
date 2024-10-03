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

# Install KoBERT-related packages without dependencies
pip install git+https://git@github.com/SKTBrain/KoBERT.git@master

# Copy the entire app directory
COPY app/ .

# Expose the port the app runs on
EXPOSE 9008

# Command to run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "9008"]