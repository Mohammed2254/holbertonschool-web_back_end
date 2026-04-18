#!/usr/bin/env python3
"""
2. Measure the runtime
"""
from time import perf_counter
from asyncio import run

wait_n = __import__("1-concurrent_coroutines").wait_n


def measure_time(n: int, max_delay: int) -> float:
    """
    Return execution time for wait_n given `n` and `max_delay`.
    """
    time_0 = perf_counter()
    run(wait_n(n, max_delay))
    return (perf_counter() - time_0) / n
