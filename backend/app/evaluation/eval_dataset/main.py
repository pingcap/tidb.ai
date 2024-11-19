import click

from asktug import get_topics


@click.group(context_settings={'max_content_width': 150})
def cli():
    pass


@cli.command()
@click.option('--output', '-o', default='topics.csv', help="Output file, default=topics.csv")
@click.option('--file_type', '-t', default="csv", help="Output format, default=csv, options=[csv, jsonl]")
def save_dataset(output, file_type):
    # When it's called, the command name is "save-dataset"

    from output import to_csv, to_jsonl
    print(f"Start to save topics dataset to {output}")

    topics = get_topics()
    if file_type == "csv":
        to_csv(topics, output)
    elif file_type == "jsonl":
        to_jsonl(topics, output)
    else:
        raise ValueError(f"Invalid output format: {file_type}")

    print(f"Saved topics dataset to {output}")


if __name__ == '__main__':
    cli()
