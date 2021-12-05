import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { version } from '../package.json';
import { App } from './App';
import { productionLog } from './utils/dev-log';
import 'antd/dist/antd.css';
import './index.less';

productionLog(`Mania Render Website v${version}`);

ReactDOM.render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>,
  document.getElementById('root'),
);
