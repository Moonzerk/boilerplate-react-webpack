import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@component/app';
import './assets/css/main.scss';

const rootComponent = createRoot(document.getElementById('root'));
rootComponent.render(
    <StrictMode>
        <App />
    </StrictMode>,
);
