#!/usr/bin/env python3
"""
9. Let's duck type an iterable object
"""
from typing import Sequence, Any, Iterable, Tuple, List


def element_length(lst: Iterable[Sequence]) -> List[Tuple[Sequence, int]]:
    """
    function element_length that takes a list lst of iterables as argument
    and returns a list of tuples with each tuple having the iterable and its
    length.
    """
    return [(i, len(i)) for i in lst]
