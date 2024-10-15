import { render, screen } from "@testing-library/react"
import MainContainer from "../../../components/MainContainer";

describe("MainContainer", () => {
    it("render correctly", () => {
        render(<MainContainer>
            <p>Test</p>
        </MainContainer>);

        expect(screen.getByText("Test")).toBeInTheDocument();
    });
})