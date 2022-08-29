from fastapi import FastAPI
from backend_functions import get_success_by_year, get_launches

app = FastAPI()


@app.get("/api/launches")
async def read_root():
    results = await get_launches()
    return results


@app.get("/api/yearsuccess")
async def read_years():
    results = await get_success_by_year()
    return results
