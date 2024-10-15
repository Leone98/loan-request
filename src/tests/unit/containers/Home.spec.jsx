import { render, screen } from "@testing-library/react"
import Home from "../../../containers/Home";
import { BrowserRouter } from "react-router-dom";
const renderHome = () => {
    render(
        <BrowserRouter>
            <Home />
        </BrowserRouter>
    )
}

describe("Home", () => {

    it("render correctly", () => {
        renderHome();

        expect(screen.getByText("Insira seus dados e descobra imediatamente quanto você consegue retirar!")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Digite seu nome")).toBeInTheDocument();
        expect(screen.getByText("Enviar")).toBeInTheDocument();
    });
})