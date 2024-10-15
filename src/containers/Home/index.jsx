import { HomeContainer } from "./styles.js";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../components/Button/index.jsx";
import Input from "../../components/Input/index.jsx";
import ContentContainer from "../../components/ContentContainer/index.jsx";

function Home(){

    const [inputName, setInputName] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (event) => {
        setInputName(event.target.value);
        if (event.target.value.length >= 8) {
            setError('');
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (inputName.trim().length < 8) {
            setError('O nome deve ter pelo menos 8 caracteres.');
            return;
        }
        const loanStorage = JSON.parse(localStorage.getItem(inputName));

        if (loanStorage) {
            const now = new Date().getTime();
            if (loanStorage.expDate > now) {
                if (loanStorage.status === 'DENIED') {
                    navigate('/emprestimo-negado', { state: { inputName } });
                } else {
                    navigate('/emprestimo-aprovado', { state: { inputName, loanValue: loanStorage.value } });
                }
            } else {
                localStorage.removeItem(inputName);
                navigate('/formulario-de-emprestimo', { state: { inputName } });
            }
        } else {
            navigate('/formulario-de-emprestimo', { state: { inputName } });
        }
    };

    return (
        <ContentContainer>
            <HomeContainer className='text-4xl font-bold py-5 px-12'>
                Simples.
                <br></br>
                Rápido.
                <br></br>
                Prático.
                <br></br>
                <br></br>
                <p className='text-justify'>Insira seus dados e descobra imediatamente quanto você consegue retirar!</p>
            </HomeContainer>
            <HomeContainer className='text-2xl pt-20 pb-6 px-12'>
                Primeiramente, se identifique no campo abaixo
            </HomeContainer>
            <HomeContainer className='px-12'>
                <form onSubmit={handleSubmit} className='mt-5 mb-10 flex flex-col justify-center'>
                    <div className='flex justify-center'>
                        <Input
                            inputType="text"
                            inputId="nameInput"
                            inputValue={inputName}
                            onInputChange={handleChange}
                            inputPlaceholder="Digite seu nome"
                            error={error}
                        />
                        <Button buttonType="submit">
                            Enviar
                        </Button>
                    </div>
                    {error && <p className="text-center text-red-500 px-5 text-sm mt-1">{error}</p>}
                </form>
            </HomeContainer>
        </ContentContainer>
    )
}

export default Home