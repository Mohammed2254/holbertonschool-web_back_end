#!/usr/bin/env python3
"""
2. Run time for four parallel comprehensions
"""
from asyncio import gather
from time import time
async_comprehension = __import__('1-async_comprehension').async_comprehension


async def measure_runtime() -> float:
    """
    Measure the runtime of async_comprehension
    executed 4 times in parallel.
    """
    time_0 = time()
    await gather(async_comprehension(), async_comprehension(),
                 async_comprehension(), async_comprehension())
    return time() - time_0