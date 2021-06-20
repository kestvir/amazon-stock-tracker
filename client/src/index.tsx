import React from 'react';
import './styles/main.global.scss';
import { render } from 'react-dom';
import App from './App';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { api } from './redux/api';

render(
  <ApiProvider api={api}>
    <App />
  </ApiProvider>,
  document.getElementById('root')
);
