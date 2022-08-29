import pytest
from backend_functions import Launch, get_average_success


def test_average_success():
    launch_list = [Launch(date="2014-01-06", year=2014, success=1, name="Thaicom 6"),
                   Launch(date="2014-04-18", year=2014, success=1, name="CRS-3")]
    assert get_average_success(year_list=launch_list) == 1
