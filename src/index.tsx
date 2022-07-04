import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { store } from './redux/store'
import { Provider } from 'react-redux'

const root = document.getElementById('root')

root && ReactDOM.createRoot(root).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
)
