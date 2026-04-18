#!/usr/bin/env python3
"""
4. Tasks
"""
from typing import List
from asyncio import as_completed
task_wait_random = __import__('3-tasks').task_wait_random


async def task_wait_n(n: int, max_delay: int = 10) -> List[float]:
    '''Execute task_wait_random and returns sorted list of delay'''
    tasks = [task_wait_random(max_delay) for ـ in range(n)]
    delays = []

    for completed_task in as_completed(tasks):
        delay = await completed_task
        delays.append(delay)

    return delays