#!/usr/bin/env python3
"""
0. The basics of async
"""
import random
import asyncio


async def wait_random(max_delay: int = 10) -> float:
    """
    function that takes an integer max_delay
    and returns a random delay between 0 and max_delay (included) in seconds.
    """
    delay = random.uniform(0, max_delay)
    await asyncio.sleep(delay)
    return delay
