import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { version } from '../package.json';
import { App } from './App';
import './index.less';
import { productionLog } from './utils/dev-log';

productionLog(`Mania Render Website v${version}`);

ReactDOM.render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>,
  document.getElementById('root'),
);
