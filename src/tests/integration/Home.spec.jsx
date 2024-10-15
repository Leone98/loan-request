import {fireEvent, render, screen} from "@testing-library/react"
import Home from "../../containers/Home";
import { BrowserRouter } from "react-router-dom";

const mockNavigate = jest.fn();
jest.mock('react-router', () => ({
    ...jest.requireActual('react-router'),
    useNavigate: () => mockNavigate
}));
const renderHome = () => {
    render(
        <BrowserRouter>
            <Home />
        </BrowserRouter>
    )
}

describe("Home integration", () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it("show error message when submitted a name with less then 8 chars", () => {
        renderHome();

        const input = screen.getByPlaceholderText("Digite seu nome");
        const btnSend = screen.getByText("Enviar");
        const errorMessage = "O nome deve ter pelo menos 8 caracteres.";

        fireEvent.change(input, { target: { value: 'Error' } });
        fireEvent.click(btnSend);

        expect(screen.getByText(errorMessage)).toBeInTheDocument();
        expect(input).toHaveStyle('border-color: red');
    });

    it("remove error message when a name with more then 8 chars is typed", () => {
        renderHome();

        const input = screen.getByPlaceholderText("Digite seu nome");
        const btnSend = screen.getByText("Enviar");
        const errorMessage = "O nome deve ter pelo menos 8 caracteres.";

        fireEvent.change(input, { target: { value: 'Error' } });
        fireEvent.click(btnSend);
        fireEvent.change(input, { target: { value: 'Acceptable' } });

        expect(screen.queryByText(errorMessage)).not.toBeInTheDocument();
        expect(input).not.toHaveStyle('border-color: red');
    });

    it('retrieves no value from localStorage and redirect to form loan page', () => {
        renderHome();

        const input = screen.getByPlaceholderText("Digite seu nome");
        const btnSend = screen.getByText("Enviar");
        const inputNameTest = "Not Stored User"

        fireEvent.change(input, { target: { value: inputNameTest } });
        fireEvent.click(btnSend);

        expect(mockNavigate).toHaveBeenCalledWith('/formulario-de-emprestimo', { state: { inputName: inputNameTest } });
    });

    it('retrieves denied value from localStorage and redirect to denied loan page', () => {
        const inputNameTest = "User Test";
        const expirationDateTest = new Date().setDate(new Date().getDate() + 7);

        localStorage.setItem(inputNameTest, JSON.stringify({
            status: "DENIED",
            expDate: expirationDateTest,
        }));

        renderHome();

        const input = screen.getByPlaceholderText("Digite seu nome");
        const btnSend = screen.getByText("Enviar");

        fireEvent.change(input, { target: { value: inputNameTest } });
        fireEvent.click(btnSend);

        expect(mockNavigate).toHaveBeenCalledWith('/emprestimo-negado', { state: { inputName: inputNameTest } });
    });

    it('retrieves approved value from localStorage and redirect to approved loan page', () => {
        const inputNameTest = "User Test";
        const loanValueTest = "R$ 1.234,56";
        const expirationDateTest = new Date().setDate(new Date().getDate() + 7);

        localStorage.setItem(inputNameTest, JSON.stringify({
            status: "APPROVED",
            value: loanValueTest,
            expDate: expirationDateTest,
        }));

        renderHome();

        const input = screen.getByPlaceholderText("Digite seu nome");
        const btnSend = screen.getByText("Enviar");

        fireEvent.change(input, { target: { value: inputNameTest } });
        fireEvent.click(btnSend);

        expect(mockNavigate).toHaveBeenCalledWith('/emprestimo-aprovado', { state: { inputName: inputNameTest, loanValue: loanValueTest } });
    });

    it('retrieves expired value from localStorage and redirect to form loan page', () => {
        const inputNameTest = "User Test";
        const expirationDateTest = new Date().setDate(new Date().getDate() - 1);

        localStorage.setItem(inputNameTest, JSON.stringify({
            status: "DENIED",
            expDate: expirationDateTest,
        }));

        renderHome();

        const input = screen.getByPlaceholderText("Digite seu nome");
        const btnSend = screen.getByText("Enviar");

        fireEvent.change(input, { target: { value: inputNameTest } });
        fireEvent.click(btnSend);

        expect(mockNavigate).toHaveBeenCalledWith('/formulario-de-emprestimo', { state: { inputName: inputNameTest } });
    });
})





