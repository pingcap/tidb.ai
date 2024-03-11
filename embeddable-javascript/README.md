# Conversation Search Box

## Dependencies

- [Vite](https://vitejs.dev/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)

## How to use

Copy the following JavaScript and insert into your HTML Head file:

```html
<head>
  <!-- ... -->

  <script
    async
    src="https://tidb.ai/rag-widget.js"
    data-id="tidb-ai-widget"
    data-name="tidb-ai-widget"
    data-btn-label="Ask AI"
    data-btn-img-src="https://tidb.ai/tidb-ai.svg"
    data-example-questions='["What is TiDB","Does TiDB support Foreign Key","What is TiDB Serverless","How to use TiDB Serverless"]'
    data-logo-src="https://tidb.ai/tidb-ai.svg"
    data-title="Conversation Search Box"
    data-input-placeholder="Ask a question..."
    data-preferred-mode="system"
  />

  <!-- ... -->
</head>
```

### Customization

| Attribute                | Description                               | Default Value             |
| ------------------------ | ----------------------------------------- | ------------------------- |
| `data-btn-label`         | The label of the button.                  | `Ask AI`                  |
| `data-btn-img-src`       | The image source of the button.           |                           |
| `data-example-questions` | The example questions for the search box. |                           |
| `data-logo-src`          | The image source of the logo.             |                           |
| `data-title`             | The title of the search box.              | `Conversation Search Box` |
| `data-input-placeholder` | The placeholder of the input.             | `Ask a question...`       |
| `data-preferred-mode`    | `dark`, `light`, `system`                 | `system`                  |

## Development

### Install dependencies

```bash
yarn
```

### Start the development server

```bash
yarn dev
```

### Build for production

```bash
yarn build
```

> The build will be output to the `dist` directory.
