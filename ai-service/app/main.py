from fastapi import FastAPI

app = FastAPI(
    title="Sentinel AI - Security & Investigation Engine",
    version="0.1.0",
    docs_url="/internal/docs",
)


@app.get("/health")
async def health_check():
    return {
        "status": "UP",
        "service": "sentinel-ai-engine",
    }