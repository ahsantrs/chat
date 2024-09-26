import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {store} from './store/index.jsx'
import { Provider } from "react-redux";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <Provider store={store()}>
    <App />
    </Provider>
  </React.StrictMode>,
)
serviceWorkerRegistration.register();