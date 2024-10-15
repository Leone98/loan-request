import {fireEvent, render, screen} from "@testing-library/react"
import ReprovedLoan from "../../containers/ReprovedLoan";
import { MemoryRouter, Route, Routes} from "react-router-dom";

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useNavigate: () => mockNavigate
}));

describe("ReprovedLoan integration", () => {
    const inputNameTest = "User Test";

    const renderReprovedLoan = () => {
        render(
            <MemoryRouter initialEntries={[{ pathname: '/emprestimo-aprovado', state: { inputName: inputNameTest } }]}>
                <Routes>
                    <Route path="/emprestimo-aprovado" element={<ReprovedLoan />}>
                    </Route>
                </Routes>
            </MemoryRouter>
        )
    }

    it('redirect to home page from reproved loan page', () => {
        renderReprovedLoan();
        const btnReturnToHomePage = screen.getByText("Voltar à página inicial");

        fireEvent.click(btnReturnToHomePage);

        expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    it('redirect to form loan page from reproved loan page', () => {
        renderReprovedLoan();
        const btnReturnToHomePage = screen.getByText("Voltar ao formulário");

        fireEvent.click(btnReturnToHomePage);

        expect(mockNavigate).toHaveBeenCalledWith('/formulario-de-emprestimo', { state: { inputName: inputNameTest } });
    });
})





