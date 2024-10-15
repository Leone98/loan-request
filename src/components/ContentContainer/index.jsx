import { Container } from "./styles.js";

function ContentContainer(props){

    return (
        <Container>
            {props.children}
        </Container>
    )
}

export default ContentContainer