import datetime
from distutils.log import error
import re
from tkinter import E
from pydantic import BaseModel
import spacexpy


class Launch(BaseModel):
    """The object that all of the relevant launch info will be assigned to"""
    date: str  # full date string
    year: int  # first for digits of date
    success: int  # 0 or 1
    name: str  # simple as
    # past: str  # string with yes or no, could be bool but I had a problem getting that


# create an instance of the api object
spacex = spacexpy.SpaceX()


async def get_launches():
    """Reads the api/launches endpoint and creates a list of Launch objects"""
    launches = await spacex.launches()
    my_launch_db = []
    for ln in launches:
        my_launch_db.append(Launch(date=ln.date_utc.split('T')[0],
                                   year=ln.date_utc.split('-')[0],
                                   success=int(ln.success or 0),
                                   name=ln.name,
                                   ))  # past=check_launchdate_has_passed(ln)
    return my_launch_db


def get_average_success(year_list: list) -> int:
    """Returns the average of the 'success' attributes (read: ints) of the list of objects pass"""
    try:
        lst_avg = sum(ln.success for ln in year_list) / len(year_list)
        return lst_avg
    except AttributeError:
        # here for no success attribute
        # shouldn't be returning anything but I can develop this later
        return 0


async def get_success_by_year():
    """Reads the launches from the API instance and averages the successes for each year a launch was recorded"""
    success_by_year = []
    try:
        ldb = await get_launches()
    except Exception as e:
        print("Can't read API")
        print(f'error was: {e}')

    try:
        all_launch_years = sorted(list(set(ln.year for ln in ldb)))

        for year in all_launch_years:
            year_launch_list = [
                launch for launch in ldb if launch.year == year]
            av_suc = get_average_success(year_launch_list)
            success_by_year.append({"year": str(year), "success": av_suc})

    except Exception as e:
        print('Error with get_success_by_year function')
        print(f'error was: {e}')

    return success_by_year


# def check_launchdate_has_passed(launch):
#     """quick function to control what is set for the launch att depending on date"""
#     today = datetime.datetime.today()
#     launch_date = datetime.datetime.strptime(
#         launch.date, '%Y-%m-%d').date()
#     if launch_date > today:
#         return "Future"
#     else:
#         return "Past"
