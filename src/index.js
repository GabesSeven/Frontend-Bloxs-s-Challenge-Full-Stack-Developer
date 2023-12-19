import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import MainRoutes from './routes';

// Renderizar esses componentes na DOM do navegador
const root = ReactDOM.createRoot(document.getElementById('root'));

// Renderiza o componente principal da aplicação.
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <MainRoutes />
    </BrowserRouter>
  </React.StrictMode>
);

