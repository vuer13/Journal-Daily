import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { JournalContextProvider } from './contexts/JournalContext';
import { AuthContextProvider } from './contexts/AuthContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <AuthContextProvider>
            <JournalContextProvider>
                <App />
            </JournalContextProvider>
        </AuthContextProvider>
    </React.StrictMode>
);

