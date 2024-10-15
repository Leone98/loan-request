import {fireEvent, render, screen} from "@testing-library/react"
import ApprovedLoan from "../../containers/ApprovedLoan";
import { MemoryRouter, Route, Routes } from "react-router-dom";

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useNavigate: () => mockNavigate
}));

describe("ApprovedLoan integration", () => {
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

    it('redirect to home page from approved loan page', () => {
        renderApprovedLoan();
        const btnReturnToHomePage = screen.getByText("Voltar à página inicial");

        fireEvent.click(btnReturnToHomePage);

        expect(mockNavigate).toHaveBeenCalledWith('/');
    });

    it('redirect to home page from approved loan page', () => {
        renderApprovedLoan();
        const btnReturnToHomePage = screen.getByText("Voltar ao formulário");

        fireEvent.click(btnReturnToHomePage);

        expect(mockNavigate).toHaveBeenCalledWith('/formulario-de-emprestimo', { state: { inputName: inputNameTest } });
    });
})





