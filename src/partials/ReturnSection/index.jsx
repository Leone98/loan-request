import Button from "../../components/Button/index.jsx";
import {useLocation, useNavigate} from "react-router-dom";

function ReturnSection() {
    const navigate = useNavigate();
    const location = useLocation();
    const { inputName } = location.state;

    const returnToForm = () => {
        navigate('/formulario-de-emprestimo', { state: { inputName } });
    }

    const returnToStart = () => {
        navigate('/');
    }

    return (
        <div>
            <div className='py-12'>
                <p className='text-1xl text-center'>
                    Selecione um dos botões abaixo para fazer uma nova simulação com novos valores ou voltar à página inicial
                </p>
                <div className='flex justify-center py-4'>
                    <Button
                        isLarge
                        onClick={returnToForm}
                    >
                        Voltar ao formulário
                    </Button>
                    <Button
                        isLarge
                        onClick={returnToStart}
                    >
                        Voltar à página inicial
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default ReturnSection;