from typing import List
import csv
from model import Topic


def safe_value(value):
    if value is None:
        return ""
    if isinstance(value, str):
        # Replace newline characters with escape sequences
        return value.replace("\n", "\\n").replace("\r", "\\r")
    return value


def to_jsonl(topics: List[Topic], file_path: str):
    with open(file_path, "w") as f:
        for topic in topics:
            f.write(topic.model_dump_json() + "\n")


def to_csv(topics: List[Topic], file_path: str):
    # Define the headers
    headers = [
        "id", "title", "fancy_title", "content", "slug", "category_id", "posts_count",
        "reply_count", "like_count", "views", "has_summary", "has_accepted_answer",
        "created_at", "last_posted_at", "accepted_answer_id",
        "accepted_answer_cooked", "accepted_answer_incoming_link_count",
        "accepted_answer_reads", "accepted_answer_bookmarked",
        "accepted_answer_readers_count", "accepted_answer_score",
        "accepted_answer_created_at", "accepted_answer_updated_at"
    ]

    # Open the file and write data
    with open(file_path, "w", newline='', encoding='utf-8') as f:
        writer = csv.writer(f, quoting=csv.QUOTE_ALL)
        writer.writerow(headers)  # Write the header row

        for topic in topics:
            accepted_answer = topic.accepted_answer
            # Write each topic as a row, using safe_value to handle None
            writer.writerow([
                safe_value(topic.id),
                safe_value(topic.title),
                safe_value(topic.fancy_title),
                safe_value(topic.question_post.cooked if topic.question_post else None),
                safe_value(topic.slug),
                safe_value(topic.category_id),
                safe_value(topic.posts_count),
                safe_value(topic.reply_count),
                safe_value(topic.like_count),
                safe_value(topic.views),
                safe_value(topic.has_summary),
                safe_value(topic.has_accepted_answer),
                safe_value(topic.created_at),
                safe_value(topic.last_posted_at),
                safe_value(accepted_answer.id if accepted_answer else None),
                safe_value(accepted_answer.cooked if accepted_answer else None),
                safe_value(accepted_answer.incoming_link_count if accepted_answer else None),
                safe_value(accepted_answer.reads if accepted_answer else None),
                safe_value(accepted_answer.bookmarked if accepted_answer else None),
                safe_value(accepted_answer.readers_count if accepted_answer else None),
                safe_value(accepted_answer.score if accepted_answer else None),
                safe_value(accepted_answer.created_at if accepted_answer else None),
                safe_value(accepted_answer.updated_at if accepted_answer else None)
            ])
