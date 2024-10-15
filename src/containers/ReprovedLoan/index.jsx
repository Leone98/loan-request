import { ReprovedContainer } from "./styles.js";
import ReturnSection from "../../partials/ReturnSection/index.jsx";
import { useLocation } from "react-router-dom";
import ContentContainer from "../../components/ContentContainer/index.jsx";

function ReprovedLoan(){
    const location = useLocation();
    const { inputName } = location.state;

    return (
        <ContentContainer>
            <ReprovedContainer className='text-4xl text-center font-bold py-5 px-12 text-red-900 w-full'>
                <span>{inputName}</span>, após análise, infelizmente você não cumpriu com os requisitos necessários para poder retirar um empréstimo.
            </ReprovedContainer>
            <ReturnSection
                inputName={inputName}
            />
        </ContentContainer>
    )
}

export default ReprovedLoan