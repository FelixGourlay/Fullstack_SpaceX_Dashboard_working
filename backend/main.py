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
    Launch(date=100910, success=50, name="sad_fail_rocket"),
    Launch(date=110910, success=13, name="really just awful"),
    Launch(date=150316, success=88, name="Getting the hang of rockets now"),
    Launch(date=240598, success=100, name="Epic cool rocket")

]


@app.get("/api")
def read_root():
    return DB
