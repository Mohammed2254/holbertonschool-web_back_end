#!/usr/bin/env python3
"""
Module to find and sort top students based on average score
"""


def top_students(mongo_collection):
    """
    Returns all students sorted by average score in descending order
    """
    pipeline = [
        {
            "$project": {
                "name": "$name",
                "topics": "$topics",
                "averageScore": {"$avg": "$topics.score"}
            }
        },
        {
            "$sort": {"averageScore": -1}
        }
    ]
    return list(mongo_collection.aggregate(pipeline))
