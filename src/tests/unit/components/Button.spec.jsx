import { render, screen, fireEvent } from "@testing-library/react"
import Button from "../../../components/Button";

describe("Button", () => {
    const onClickMock = jest.fn();
    const textTest = "Test"

    beforeEach(() => {
        onClickMock.mockClear();
    });

    it("render correctly", () => {
        render(<Button
            onClick={onClickMock}
        >
            Test
        </Button>);

        expect(screen.getByText(textTest)).toBeInTheDocument();
    });

    it('applies correct large class based on props', () => {
        render(<Button
            onClick={onClickMock}
            isLarge
        >
            Test
        </Button>);

        expect(screen.getByText(textTest)).toHaveClass('w-60');
    });

    it('applies correct medium class based on props', () => {
        render(<Button
            onClick={onClickMock}
            isMedium
        >
            Test
        </Button>);

        expect(screen.getByText(textTest)).toHaveClass('w-40');
    });

    it('calls onClick when clicked', () => {
        render(<Button
            onClick={onClickMock}
        >
            Test
        </Button>);
        fireEvent.click(screen.getByText(textTest));
        expect(onClickMock).toHaveBeenCalledTimes(1);
    });
})