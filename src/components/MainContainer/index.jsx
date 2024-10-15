import { Container } from "./styles.js";

function MainContainer(props){

    return (
        <div>
            <Container>
                {props.children}
            </Container>
        </div>
    )
}

export default MainContainer