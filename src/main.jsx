import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './store/store.js'
import './styles/index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { AutoAlert } from './components/AutoAlert.jsx'
import 'react-datepicker/dist/react-datepicker.css';
import { registerLocale } from 'react-datepicker';
import ru from 'date-fns/locale/ru';

//для датапикера
registerLocale('ru', ru);

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AutoAlert />
    <App />
  </Provider>
)
