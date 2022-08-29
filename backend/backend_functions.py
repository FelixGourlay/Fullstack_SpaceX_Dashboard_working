from pydantic import BaseModel
import spacexpy


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
    success_by_year = []
    ldb = await get_launches()
    all_launch_years = sorted(list(set(ln.year for ln in ldb)))

    for year in all_launch_years:
        year_launch_list = [
            launch for launch in ldb if launch.year == year]
        av_suc = get_average_success(year_launch_list)
        success_by_year.append({"year": str(year), "success": av_suc})

    return success_by_year