import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store, { Persistor } from './Redux/Store';
import { PersistGate } from 'redux-persist/integration/react';
import { ContextProvider } from './contexts/contextProvider';

ReactDOM.render(
    <Provider store={store}>
        <ContextProvider>
            <PersistGate loading={null} persistor={Persistor}>
                <App />
            </PersistGate>
        </ContextProvider>
    </Provider>,
    document.getElementById('root')
);
