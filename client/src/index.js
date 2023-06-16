import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ZoyContextProvider } from './ZoyContext';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <ZoyContextProvider>
    
            <App />
    
    </ZoyContextProvider>
    
  
);
