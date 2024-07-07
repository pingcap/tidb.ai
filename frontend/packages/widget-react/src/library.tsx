import ReactDOM from 'react-dom/client';
import App from './App';

const div = document.createElement('div');

div.id = 'tidb-ai-widget';
div.className = 'tidb-ai-widget';
document.body.appendChild(div);

ReactDOM.createRoot(div).render(
  <App />,
);
