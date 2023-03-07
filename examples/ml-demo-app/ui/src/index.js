import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MLProvider } from "./MLContext";

import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <MLProvider
    scheme="http"
    host="localhost"
    port="4000"
    auth={{ username: "ml-app-demo-user", password: "password" }}
  >
    <App />
  </MLProvider>
);
