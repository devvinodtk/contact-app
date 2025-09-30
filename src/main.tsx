import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { LoadScript } from '@react-google-maps/api';
import App from './App.tsx';
import { AuthProvider } from './context/AuthProvider.tsx';
import store from './store/store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Provider store={store}>
          <LoadScript
            googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
            libraries={['places']}
          >
            <App />
          </LoadScript>
        </Provider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
