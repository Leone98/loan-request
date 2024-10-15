import { render, screen } from "@testing-library/react"
import Header from "../../../partials/Header";

describe("Header", () => {
    it("render correctly", () => {
        render(<Header />);

        expect(screen.getByText("REQUISIÇÃO DE EMPRÉSTIMO")).toBeInTheDocument();
    });
})