import { render, screen } from "@testing-library/react"
import ReturnSection from "../../../partials/ReturnSection";
import { MemoryRouter } from "react-router-dom";

describe("ReturnSection", () => {
    const inputNameTest = "User Test";

    it("render correctly", () => {
        render(

            <MemoryRouter initialEntries={[{ state: { inputName: inputNameTest } }]}>
                <ReturnSection />
            </MemoryRouter>
        );

        expect(screen.getByText("Selecione um dos botões abaixo para fazer uma nova simulação com novos valores ou voltar à página inicial")).toBeInTheDocument();
        expect(screen.getByText("Voltar ao formulário")).toBeInTheDocument();
        expect(screen.getByText("Voltar à página inicial")).toBeInTheDocument();
    });
})