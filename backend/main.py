from typing import List

from fastapi import FastAPI
from pydantic import BaseModel
import spacexpy


app = FastAPI()

# testing github push


class Launch(BaseModel):
    date: str  # full date string
    year: int  # first for digits of date
    success: int  # 0 or 1
    name: str  # simple as


DB: List[Launch] = [
    Launch(date=100910, year=1998, success=0, name="sad_fail_rocket"),
    Launch(date=110910, year=1998, success=0, name="really just awful"),
    Launch(date=150316, year=1998, success=1,
           name="Getting the hang of rockets now"),
    Launch(date=240598, year=1998, success=1, name="Epic cool rocket")

]


class Launch(BaseModel):
    date: str  # full date string
    year: int  # first for digits of date
    success: int  # 0 or 1
    name: str  # simple as


spacex = spacexpy.SpaceX()


async def get_launches():
    launches = await spacex.launches()
    my_launch_db = []
    for ln in launches:
        my_launch_db.append(Launch(date=ln.date_utc.split('T')[0],
                                   year=ln.date_utc.split('-')[0],
                                   success=int(ln.success or 0),
                                   name=ln.name))
    return my_launch_db


def get_average_success(year_list):
    lst_avg = sum(ln.success for ln in year_list) / len(year_list)
    return lst_avg


async def get_success_by_year():
    success_by_year = {}
    ldb = await get_launches()
    all_launch_years = sorted(list(set(ln.year for ln in ldb)))

    for year in all_launch_years:
        year_launch_list = [
            launch for launch in ldb if launch.year == year]
        success_by_year[year] = get_average_success(year_launch_list)

    return success_by_year


@app.get("/api/launches")
async def read_root():
    results = await get_launches()
    return results


@app.get("/api/yearsuccess")
async def read_years():
    results = await get_success_by_year()
    return results
