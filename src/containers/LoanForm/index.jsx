import { LoanContainer } from "./styles.js";
import {useLocation, useNavigate} from "react-router-dom";
import { useState } from "react";
import Button from "../../components/Button/index.jsx";
import Input from "../../components/Input/index.jsx";
import ContentContainer from "../../components/ContentContainer/index.jsx";
import { api } from "../../services/api.js";

function LoanForm(){

    const [inputAge, setInputAge] = useState('');
    const [inputMonthlyIncome, setInputMonthlyIncome] = useState('');
    const [monthlyIncome, setMonthlyIncome] = useState(0);
    const [inputCity, setInputCity] = useState('');
    const [errorAge, setErrorAge] = useState('');
    const [errorMonthlyIncome, setErrorMonthlyIncome] = useState('');
    const [errorCity, setErrorCity] = useState('');
    const location = useLocation();
    const { inputName } = location.state;
    const navigate = useNavigate();

    const handleChangeAge = (event) => {
        const inputValue = event.target.value.replace(/\D/g, '').slice(0, 2);
        setInputAge(inputValue);
        if (inputValue >= 18 && inputValue <= 65) {
            setErrorAge('');
        }
    };

    const formatCurrency = (inputValue) => {
        inputValue = inputValue.toString();
        let numericValue = Number(inputValue.replace(/\D/g, '').slice(0, 7));
        setMonthlyIncome(numericValue);
        if (monthlyIncome > 0) {
            setErrorMonthlyIncome('');
        }
        numericValue = numericValue.toString();

        if (numericValue.length == 0) {
            return "R$0,00"
        }
        if (numericValue.length == 1) {
            return `R$ 0,0${numericValue}`
        }
        if (numericValue.length == 2) {
            return `R$ 0,${numericValue}`
        }

        const cents = numericValue.slice(-2);
        const reais = numericValue.slice(0, -2);

        const formattedReais = reais.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
        return `R$ ${formattedReais},${cents}`;
    };

    const handleChangeMonthlyIncome = (event) => {
        setInputMonthlyIncome(formatCurrency(event.target.value));
        if (monthlyIncome >= 0) {
            setErrorMonthlyIncome('');
        }
    };

    const handleChangeCity = (event) => {
        setInputCity(event.target.value);
        if (event.target.value.length > 0) {
            setErrorCity('');
        }
    };

    const returnToStart = () => {
        navigate('/');
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let hasError = false;
        if (inputAge < 18 || inputAge > 65) {
            setErrorAge('A idade deve estar entre 18 e 65 anos.');
            hasError = true;
        }
        if (monthlyIncome <= 0) {
            setErrorMonthlyIncome('A renda mensal não deve ser nula ou negativa.');
            hasError = true;
        }
        if (inputCity.trim().length == 0) {
            setErrorCity('A cidade não deve estar vazia.');
            hasError = true;
        }
        if (hasError) {
            return;
        }
        const expirationDate = new Date().setDate(new Date().getDate() + 7);
        const mockScore = Math.round(monthlyIncome/10000);
        const response = await api.get(`/loans?income_rating_score=${mockScore}`);
        const loanResult = response.data[0];
        if (loanResult.status == "APPROVED") {
            const loanValue = formatCurrency(loanResult["max_amount"])
            localStorage.setItem(inputName, JSON.stringify({
                status: "APPROVED",
                value: loanValue,
                expDate: expirationDate,
            }))
            navigate('/emprestimo-aprovado', { state: { inputName, loanValue: loanValue } });
        } else {
            localStorage.setItem(inputName, JSON.stringify({
                status: "DENIED",
                expDate: expirationDate,
            }))
            navigate('/emprestimo-negado', { state: { inputName} });
        }
    };

    return (
        <ContentContainer>
            <LoanContainer className='text-5xl font-bold text-center text-blue-950 py-5 px-12'>
                <span>{inputName}</span><br />Você está a um passo de conseguir seu empréstimo!
            </LoanContainer>
            <LoanContainer className='text-2xl py-5 px-12 text-justify'>
                Basta preencher o formulário abaixo. Após análise, se estiver apto a receber o empréstimo, você já poderá retirá-lo!
            </LoanContainer>
            <LoanContainer className='px-12'>
                <form onSubmit={handleSubmit} className='mb-10'>
                    <div className='flex justify-center'>
                        <Input
                            inputType="number"
                            inputId="ageInput"
                            inputValue={inputAge}
                            onInputChange={handleChangeAge}
                            inputPlaceholder="Digite sua idade"
                            error={errorAge}
                        />
                        <Input
                            inputType="number"
                            inputId="monthlyIncomeInput"
                            inputValue={inputMonthlyIncome}
                            onInputChange={handleChangeMonthlyIncome}
                            inputPlaceholder="Digite sua renda mensal"
                            error={errorMonthlyIncome}
                        />
                        <Input
                            inputType="text"
                            inputId="cityInput"
                            inputValue={inputCity}
                            onInputChange={handleChangeCity}
                            inputPlaceholder="Digite sua cidade"
                            error={errorCity}
                        />
                    </div>
                    <div className='flex justify-center mt-5'>
                        <Button buttonType="submit">
                            Enviar
                        </Button>
                    </div>
                    <div className='flex flex-col justify-center text-center'>
                        {errorAge && <p className="text-red-500 px-5 text-sm mt-1">{errorAge}</p>}
                        {errorMonthlyIncome && <p className="text-red-500 px-5 text-sm mt-1">{errorMonthlyIncome}</p>}
                        {errorCity && <p className="text-red-500 px-5 text-sm mt-1">{errorCity}</p>}
                    </div>
                    <div className='flex justify-center mt-5'>
                        <Button
                            isMedium
                            onClick={returnToStart}
                        >
                            Voltar ao início
                        </Button>
                    </div>
                </form>
            </LoanContainer>
        </ContentContainer>
    )
}

export default LoanForm