import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider, useSelector } from 'react-redux';
import { store } from './store';
import type { RootState } from './store';
import { setAuthToken } from './api/axios';

function AuthWatcher() {
  const token = useSelector((s: RootState) => s.auth.token);
  useEffect(() => {
    setAuthToken(token);
  }, [token]);
  return null;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <AuthWatcher />
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
