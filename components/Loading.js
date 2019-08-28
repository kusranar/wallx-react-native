import React from 'react';
import { Spinner, Container, Content } from 'native-base';

export default class Loading extends React.Component {
    render(){
        return(
            <Container style={{justifyContent: "center"}}>
                    <Spinner color='orange' />
            </Container>
            
        )
    }
}