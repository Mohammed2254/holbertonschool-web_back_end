#!/usr/bin/env python3
"""
Module to provide statistics about Nginx logs stored in MongoDB
including top 10 most active IPs
"""
from pymongo import MongoClient


def log_stats():
    """
    Prints stats about nginx logs, methods counts, status check, and top IPs
    """
    client = MongoClient('mongodb://127.0.0.1:27017')
    nginx_collection = client.logs.nginx

    # Total number of logs
    total_logs = nginx_collection.count_documents({})
    print(f"{total_logs} logs")

    # Methods statistics
    print("Methods:")
    methods = ["GET", "POST", "PUT", "PATCH", "DELETE"]
    for method in methods:
        count = nginx_collection.count_documents({"method": method})
        print(f"    method {method}: {count}")

    # Specific status check logs
    status_check = nginx_collection.count_documents(
        {"method": "GET", "path": "/status"}
    )
    print(f"{status_check} status check")

    # Top 10 IPs aggregate query
    print("IPs:")
    pipeline = [
        {"$group": {"_id": "$ip", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}},
        {"$limit": 10}
    ]
    top_ips = nginx_collection.aggregate(pipeline)
    for ip in top_ips:
        print(f"    {ip.get('_id')}: {ip.get('count')}")


if __name__ == "__main__":
    log_stats()
