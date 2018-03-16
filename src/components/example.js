import React from 'react'
import styled from 'styled-components';

const example = (props) => {
    state = {
        thisState: true
    }
  return (
    <Styled_Div thing={state.thisSTate}>
      
    </Styled_Div>
  )
}

export default example

const Styled_Div = styled.div`

 color: red;
 border: 1px solid red;
 color: ${props => props.thing }
`