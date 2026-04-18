#!/usr/bin/env python3
"""
3. Tasks
"""
from asyncio import create_task, Task

wait_random = __import__("0-basic_async_syntax").wait_random


def task_wait_random(max_delay: int) -> Task:
    """
    Returns asyncio.Task object
    """
    return create_task(wait_random(max_delay))
