import { Routes, Route } from "react-router-dom";
import { api } from "./services/api.js";
import Home from "./containers/Home/index.jsx";
import LoanForm from "./containers/LoanForm/index.jsx";
import ApprovedLoan from "./containers/ApprovedLoan/index.jsx";
import ReprovedLoan from "./containers/ReprovedLoan/index.jsx";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/formulario-de-emprestimo" element={<LoanForm />} />
                <Route path="/emprestimo-aprovado" element={<ApprovedLoan />} />
                <Route path="/emprestimo-negado" element={<ReprovedLoan />} />
            </Routes>
        </div>
    )
}

export default App;