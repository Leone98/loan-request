import styled from 'styled-components'

export const StyledInput = styled.input `
  border: ${(props) => (props.hasError ? '1px solid red' : '')};
`