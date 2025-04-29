import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { JournalContextProvider } from './contexts/JournalContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <JournalContextProvider>
            <App />
        </JournalContextProvider>
    </React.StrictMode>
);

