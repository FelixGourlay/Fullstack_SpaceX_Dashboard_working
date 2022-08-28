from pickle import TRUE
from typing import List

from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# testing github push


class Launch(BaseModel):
    date: int
    success: int
    name: str


DB: List[Launch] = [
    Launch(date=22, success=50, name="sad_fail_rocket"),
    Launch(date=240598, success=100, name="Epic cool rocket")
]


@app.get("/api")
def read_root():
    return DB
