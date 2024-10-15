import { ApprovedContainer } from "./styles.js";
import ReturnSection from "../../partials/ReturnSection/index.jsx";
import { useLocation } from "react-router-dom";
import ContentContainer from "../../components/ContentContainer/index.jsx";

function ApprovedLoan(){
    const location = useLocation();
    const { inputName, loanValue } = location.state;

    return (
        <ContentContainer>
            <ApprovedContainer className='text-5xl'>
                PARABÉNS, <span>{inputName}</span>!
            </ApprovedContainer>
            <ApprovedContainer className='text-4xl'>
                Foi aprovado um empréstimo no valor de até
            </ApprovedContainer>
            <ApprovedContainer className='text-7xl'>
                <span>{loanValue}</span>
            </ApprovedContainer>
            <ApprovedContainer className='text-4xl'>
                Você pode retirá-lo a qualquer momento.
            </ApprovedContainer>
            <ReturnSection
                inputName={inputName}
            />
        </ContentContainer>
    )
}

export default ApprovedLoan