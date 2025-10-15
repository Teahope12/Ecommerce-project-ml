# ml_service/ml_service.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from PIL import Image
import requests
from io import BytesIO
import numpy as np
import os
import time
import logging

# transformers / torch imports
import torch
from transformers import CLIPProcessor, CLIPModel

# ---------------------------
# Config
# ---------------------------
MODEL_NAME = os.environ.get("HF_CLIP_MODEL", "openai/clip-vit-base-patch32")
MAX_BATCH_SIZE = int(os.environ.get("MAX_BATCH_SIZE", "8"))
TIMEOUT = int(os.environ.get("REQUEST_TIMEOUT_SEC", "30"))
LOG_LEVEL = os.environ.get("LOG_LEVEL", "INFO").upper()

# ---------------------------
# Logging
# ---------------------------
logging.basicConfig(level=LOG_LEVEL, format="%(asctime)s %(levelname)s %(message)s")
logger = logging.getLogger("ml_service")

# ---------------------------
# FastAPI app & models
# ---------------------------
app = FastAPI(title="Image Embedding Service")

class EmbedRequest(BaseModel):
    image_url: Optional[str] = None
    # allow raw image bytes as base64 if you extend later
    # image_base64: Optional[str] = None

class BatchEmbedRequest(BaseModel):
    image_urls: List[str]

class EmbedResponse(BaseModel):
    embedding: List[float]

class BatchEmbedResponse(BaseModel):
    embeddings: List[List[float]]

# ---------------------------
# Model loading
# ---------------------------
device = "cuda" if torch.cuda.is_available() else "cpu"
logger.info(f"Using device: {device}. Loading model {MODEL_NAME} ...")

# load model and processor
try:
    model = CLIPModel.from_pretrained(MODEL_NAME)
    processor = CLIPProcessor.from_pretrained(MODEL_NAME)
    model.to(device)
    model.eval()
    logger.info("Model loaded successfully.")
except Exception as e:
    logger.exception("Failed to load model.")
    raise

# Helper to fetch and preprocess image
def fetch_image(url: str, timeout: int = TIMEOUT) -> Image.Image:
    resp = requests.get(url, timeout=timeout)
    resp.raise_for_status()
    img = Image.open(BytesIO(resp.content)).convert("RGB")
    return img

# Compute normalized embedding from PIL image
def compute_embedding(images: List[Image.Image]) -> np.ndarray:
    # processor will batch internally
    inputs = processor(images=images, return_tensors="pt")
    # move tensors to device
    inputs = {k: v.to(device) for k, v in inputs.items()}
    with torch.no_grad():
        img_feats = model.get_image_features(**inputs)  # shape (batch, dim)
        # normalize
        img_feats = img_feats / img_feats.norm(p=2, dim=-1, keepdim=True)
        emb = img_feats.cpu().numpy().astype(float)
    return emb

# ---------------------------
# Endpoints
# ---------------------------
@app.get("/health")
def health():
    # quick GPU/CPU memory check could be added
    return {"ok": True, "device": device}

@app.post("/embed", response_model=EmbedResponse)
def embed(req: EmbedRequest):
    if not req.image_url:
        raise HTTPException(status_code=400, detail="image_url is required")
    try:
        img = fetch_image(req.image_url)
        emb = compute_embedding([img])[0].tolist()
        return {"embedding": emb}
    except requests.exceptions.RequestException as e:
        logger.exception("Error fetching image")
        raise HTTPException(status_code=400, detail=f"Error fetching image: {e}")
    except Exception as e:
        logger.exception("Embedding error")
        raise HTTPException(status_code=500, detail=f"Embedding error: {str(e)}")

@app.post("/embed_batch", response_model=BatchEmbedResponse)
def embed_batch(req: BatchEmbedRequest):
    urls = req.image_urls
    if not urls or len(urls) == 0:
        raise HTTPException(status_code=400, detail="image_urls must be a non-empty list")

    if len(urls) > MAX_BATCH_SIZE:
        raise HTTPException(status_code=400, detail=f"Batch too large. Max {MAX_BATCH_SIZE}")

    images = []
    for u in urls:
        try:
            images.append(fetch_image(u))
        except Exception as e:
            logger.exception("Failed to fetch an image in batch")
            raise HTTPException(status_code=400, detail=f"Failed to fetch image {u}: {e}")

    try:
        embs = compute_embedding(images).tolist()
        return {"embeddings": embs}
    except Exception as e:
        logger.exception("Batch embedding error")
        raise HTTPException(status_code=500, detail=f"Batch embedding error: {e}")
