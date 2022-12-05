import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import 'tachyons';


const container = document.getElementById('app');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(<App />);

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

