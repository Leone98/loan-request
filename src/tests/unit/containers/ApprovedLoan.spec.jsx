import { render, screen } from "@testing-library/react"
import ApprovedLoan from "../../../containers/ApprovedLoan";
import { MemoryRouter, Route, Routes} from "react-router-dom";

describe("ApprovedLoan", () => {
    const inputNameTest = "User Test";
    const loanValueTest = "R$ 1.234,56";

    const renderApprovedLoan = () => {
        render(
            <MemoryRouter initialEntries={[{ pathname: '/emprestimo-aprovado', state: { inputName: inputNameTest, loanValue: loanValueTest } }]}>
                <Routes>
                    <Route path="/emprestimo-aprovado" element={<ApprovedLoan />}>
                    </Route>
                </Routes>
            </MemoryRouter>
        )
    }

    it("render correctly", () => {
        renderApprovedLoan();

        expect(screen.getByText(inputNameTest)).toBeInTheDocument();
        expect(screen.getByText(loanValueTest)).toBeInTheDocument();
        expect(screen.getByText("Voltar ao formulário")).toBeInTheDocument();
        expect(screen.getByText("Voltar à página inicial")).toBeInTheDocument();
    });
})