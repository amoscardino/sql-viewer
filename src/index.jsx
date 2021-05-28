import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Layout from './components/Layout';

import 'bootstrap/dist/js/bootstrap.js';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(
    <React.StrictMode>
        <Layout>
            <App />
        </Layout>
    </React.StrictMode>,
    document.getElementById('root')
);
