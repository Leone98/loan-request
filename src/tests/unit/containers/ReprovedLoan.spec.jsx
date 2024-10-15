import { render, screen } from "@testing-library/react"
import ReprovedLoan from "../../../containers/ReprovedLoan";
import { MemoryRouter, Route, Routes} from "react-router-dom";

describe("ReprovedLoan", () => {
    const inputNameTest = "User Test";

    const renderReprovedLoan = () => {
        render(
            <MemoryRouter initialEntries={[{ pathname: '/emprestimo-negado', state: { inputName: inputNameTest } }]}>
                <Routes>
                    <Route path="/emprestimo-negado" element={<ReprovedLoan />}>
                    </Route>
                </Routes>
            </MemoryRouter>
        )
    }

    it("render correctly", () => {
        renderReprovedLoan();

        expect(screen.getByText(inputNameTest)).toBeInTheDocument();
        expect(screen.getByText("Voltar ao formulário")).toBeInTheDocument();
        expect(screen.getByText("Voltar à página inicial")).toBeInTheDocument();
    });
})