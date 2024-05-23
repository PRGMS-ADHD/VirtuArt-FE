import React from 'react';
import ReactDOM from 'react-dom/client';
import queryClient from '@/api/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
