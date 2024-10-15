import { render, screen } from "@testing-library/react"
import ContentContainer from "../../../components/ContentContainer";

describe("ContentContainer", () => {
    it("render correctly", () => {
        render(<ContentContainer>
            <p>Test</p>
        </ContentContainer>);

        expect(screen.getByText("Test")).toBeInTheDocument();
    });
})