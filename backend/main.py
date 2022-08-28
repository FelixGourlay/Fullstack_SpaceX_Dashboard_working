from typing import Union, List

from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

# testing github push


class Launch(BaseModel):
    date: int
    success: bool
    name: str


DB: List[Launch] = [
    Launch(date=22, success=False, name="sad_fail_rocket")
]


@app.get("/api")
def read_root():
    return DB