import 'bootstrap/dist/css/bootstrap.css';
import AuthProvider from 'frontend/contexts/FirebaseContext';
import { render } from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './frontend/components/App';
import * as serviceWorker from './serviceWorker';

const rootElement = document.getElementById('root');
render(
  <HelmetProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </HelmetProvider>,
  rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

export const ENV: 'dev' | 'test' = 'dev';
