#!/usr/bin/env python3
"""
1. Let's execute multiple coroutines at the same time with async
"""
from typing import List
from asyncio import as_completed
wait_random = __import__('0-basic_async_syntax').wait_random


async def wait_n(n: int, max_delay: int) -> List[float]:
    """
    function that takes in 2 int arguments (in this order): n and max_delay.
    The function spawns wait_random n times with the specified max_delay
    and returns the list of all the delays
    """
    coroutines = [wait_random(max_delay) for i in range(n)]
    delays = []

    for completed_task in as_completed(coroutines):
        delay = await completed_task
        delays.append(delay)

    return delays