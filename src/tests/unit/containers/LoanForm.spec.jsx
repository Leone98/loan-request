import { render, screen } from "@testing-library/react"
import LoanForm from "../../../containers/LoanForm";
import { MemoryRouter, Route, Routes} from "react-router-dom";

describe("LoanForm", () => {
    const inputNameTest = "User Test";

    const renderLoanForm = () => {
        render(
            <MemoryRouter initialEntries={[{ pathname: '/formulario-de-emprestimo', state: { inputName: inputNameTest } }]}>
                <Routes>
                    <Route path="/formulario-de-emprestimo" element={<LoanForm />}>
                    </Route>
                </Routes>
            </MemoryRouter>
        )
    }

    it("render correctly", () => {
        renderLoanForm();

        expect(screen.getByText(inputNameTest)).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Digite sua idade")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Digite sua renda mensal")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Digite sua cidade")).toBeInTheDocument();
        expect(screen.getByText("Enviar")).toBeInTheDocument();
        expect(screen.getByText("Voltar ao início")).toBeInTheDocument();
    });
})