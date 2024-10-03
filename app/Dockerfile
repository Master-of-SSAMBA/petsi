# Use a slim base image to minimize image size
FROM python:3.9-slim

# Set environment variables to prevent Python from buffering and creating bytecode files
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

# Set the working directory
WORKDIR /app

# Install system dependencies required for building some Python packages
RUN apt-get update && apt-get install -y \
    git \
    gcc \
    libffi-dev \
    libssl-dev \
    make \
    && rm -rf /var/lib/apt/lists/*

# Install the required Python packages
RUN pip install --upgrade pip setuptools wheel \
    && pip install torch==1.10.1 transformers==4.8.2 sentencepiece==0.1.91

# Install KoBERT from GitHub
RUN pip install 'git+https://github.com/SKTBrain/KoBERT.git#egg=kobert_tokenizer&subdirectory=kobert_hf'

# Copy the requirements file
COPY requirements.txt .

# Install additional dependencies specified in requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code to the container
COPY . .

# Create a non-root user and switch to it
RUN adduser --disabled-password --gecos "" appuser
USER appuser

# Expose the port the application will run on
EXPOSE 9008

# Command to run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "9008"]
