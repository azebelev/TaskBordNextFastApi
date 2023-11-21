#!/bin/bash

# Start the FastAPI backend
uvicorn back.main:app --host=0.0.0.0 --port=${PORT:-5000} &
# Start the Next.js frontend
cd front && npm run full