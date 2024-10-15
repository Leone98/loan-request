import { render, screen, fireEvent } from "@testing-library/react"
import Input from "../../../components/Input";

describe("Input", () => {
    let inputValueTest;
    let onInputChangeTest;
    let errorTest;
    let inputPlaceholderTest;

    beforeEach(() => {
        inputValueTest = 'Test value';
        onInputChangeTest = jest.fn();
        errorTest = false;
        inputPlaceholderTest = 'Enter text';
    });

    it("render correctly", () => {
        render(
            <Input
                inputValue={""}
                onInputChange={onInputChangeTest}
                error={errorTest}
                inputPlaceholder={inputPlaceholderTest}
            />
        );

        const inputElement = screen.getByPlaceholderText(inputPlaceholderTest);
        expect(inputElement).toHaveAttribute('placeholder', inputPlaceholderTest);
    });

    it("calls onChange when input value changes", () => {
        render(
            <Input
                inputValue={inputValueTest}
                onInputChange={onInputChangeTest}
                error={errorTest}
                inputPlaceholder={inputPlaceholderTest}
            />
        );

        const inputElement = screen.getByPlaceholderText(inputPlaceholderTest);
        fireEvent.change(inputElement, { target: { value: 'New value' } });

        expect(onInputChangeTest).toHaveBeenCalledTimes(1);
    });

    it('shows error message when hasError is true', () => {
        errorTest = true;
        render(
            <Input
                inputValue={inputValueTest}
                onInputChange={onInputChangeTest}
                error={errorTest}
                inputPlaceholder={inputPlaceholderTest}
            />
        );

        const inputElement = screen.getByPlaceholderText(inputPlaceholderTest);
        expect(inputElement).toHaveStyle('border-color: red');
    });
})