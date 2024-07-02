# Backend of tidb.ai


## Development

### Install dependencies

1. Install [rye](https://rye.astral.sh/)
2. Use `rye` to install dependencies

```bash
rye sync
```

### Prepare environment

```
cp .env.example .env
```

Edit `.env` to set environment variables.


### Run migrations

```bash
make migrate
```

### Run development server

```bash
rye run python main.py runserver
```