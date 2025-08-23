import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store/store.js'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { AutoAlert } from './components/AutoAlert.jsx'
import { PageTitle } from './components/PageTitle.jsx'

createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <AutoAlert />
    <App />
  </Provider>
)
