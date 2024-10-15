import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Header from "./partials/Header/index.jsx";
import { BrowserRouter } from "react-router-dom";
import MainContainer from "./components/MainContainer/index.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <MainContainer>
            <Header />
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </MainContainer>
    </StrictMode>,
)
