import {fireEvent, render, screen} from "@testing-library/react"
import LoanForm from "../../containers/LoanForm";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { api } from "../../services/api.js";

const mockNavigate = jest.fn();

jest.mock('../../services/api.js');

jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useNavigate: () => mockNavigate
}));
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

describe("LoanForm integration", () => {

    it("consider only numeric chars at age field", () => {
        renderLoanForm();

        const input = screen.getByPlaceholderText("Digite sua idade");

        fireEvent.change(input, { target: { value: '1a0zx!' } });

        expect(input.value).toBe('10');
    });

    it("show error message when submitted a age lower then 18", () => {
        renderLoanForm();

        const input = screen.getByPlaceholderText("Digite sua idade");
        const btnSend = screen.getByText("Enviar");
        const errorMessage = "A idade deve estar entre 18 e 65 anos.";

        fireEvent.change(input, { target: { value: '16' } });
        fireEvent.click(btnSend);

        expect(screen.getByText(errorMessage)).toBeInTheDocument();
        expect(input).toHaveStyle('border-color: red');
    });

    it("show error message when submitted a age greater then 65", () => {
        renderLoanForm();

        const input = screen.getByPlaceholderText("Digite sua idade");
        const btnSend = screen.getByText("Enviar");
        const errorMessage = "A idade deve estar entre 18 e 65 anos.";

        fireEvent.change(input, { target: { value: '70' } });
        fireEvent.click(btnSend);

        expect(screen.getByText(errorMessage)).toBeInTheDocument();
        expect(input).toHaveStyle('border-color: red');
    });

    it("remove error message when a valid age is typed", () => {
        renderLoanForm();

        const input = screen.getByPlaceholderText("Digite sua idade");
        const btnSend = screen.getByText("Enviar");
        const errorMessage = "A idade deve estar entre 18 e 65 anos.";

        fireEvent.change(input, { target: { value: '12' } });
        fireEvent.click(btnSend);
        fireEvent.change(input, { target: { value: '20' } });

        expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();
        expect(input).not.toHaveStyle('border-color: red');
    });

    it("consider only numeric chars at monthly income field and apply the correct mask", () => {
        renderLoanForm();

        const input = screen.getByPlaceholderText("Digite sua renda mensal");

        fireEvent.change(input, { target: { value: '1a2zx!3 4ds56' } });

        expect(input.value).toBe('R$ 1.234,56');
    });

    it("show error message when submitted a invalid monthly income", () => {
        renderLoanForm();

        const input = screen.getByPlaceholderText("Digite sua renda mensal");
        const btnSend = screen.getByText("Enviar");
        const errorMessage = "A renda mensal não deve ser nula ou negativa.";

        fireEvent.change(input, { target: { value: '0' } });
        fireEvent.click(btnSend);

        expect(screen.getByText(errorMessage)).toBeInTheDocument();
        expect(input).toHaveStyle('border-color: red');
    });

    it("remove error message when a valid monthly income is typed", () => {
        renderLoanForm();

        const input = screen.getByPlaceholderText("Digite sua renda mensal");
        const btnSend = screen.getByText("Enviar");
        const errorMessage = "A renda mensal não deve ser nula ou negativa.";

        fireEvent.change(input, { target: { value: '0 0 ' } });
        fireEvent.click(btnSend);
        fireEvent.change(input, { target: { value: '123' } });

        expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();
        expect(input).not.toHaveStyle('border-color: red');
    });

    it("show error message when submitted a city with no chars or only blank chars", () => {
        renderLoanForm();

        const input = screen.getByPlaceholderText("Digite sua cidade");
        const btnSend = screen.getByText("Enviar");
        const errorMessage = "A cidade não deve estar vazia.";

        fireEvent.change(input, { target: { value: '   ' } });
        fireEvent.click(btnSend);

        expect(screen.getByText(errorMessage)).toBeInTheDocument();
        expect(input).toHaveStyle('border-color: red');
    });

    it("remove error message when a valid city is typed", () => {
        renderLoanForm();

        const input = screen.getByPlaceholderText("Digite sua cidade");
        const btnSend = screen.getByText("Enviar");
        const errorMessage = "A cidade não deve estar vazia.";

        fireEvent.change(input, { target: { value: '  ' } });
        fireEvent.click(btnSend);
        fireEvent.change(input, { target: { value: 'Test' } });

        expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();
        expect(input).not.toHaveStyle('border-color: red');
    });

    it('redirect to home page from form loan page', () => {
        renderLoanForm();
        const btnReturnToHomePage = screen.getByText("Voltar ao início");

        fireEvent.click(btnReturnToHomePage);

        expect(mockNavigate).toHaveBeenCalledWith('/');
    });
})





