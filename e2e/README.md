# Integration Test for TIDB.ai

## Requirements

- Docker compose
- NodeJS env
- OpenAI Api Key

```bash
npm i
echo OPENAI_API_KEY=sk-*** > .env.local
```

## Usage

### Start local TiDB.ai

```bash
$ ./start-cluster.sh

> ...
> ...
> [TiDB.AI Integration Test] Press Enter to exit...
```

### Run tests

```bash
npm start
```
