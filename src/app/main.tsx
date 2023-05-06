import ReactDOM from 'react-dom/client';

import {appStarted} from '~/shared/config/init';

import {App} from './application';
import './index.css';

const container = document.querySelector('#root') as HTMLElement;
const root = ReactDOM.createRoot(container);

appStarted();
root.render(<App />);
