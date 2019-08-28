import React from 'react';
import Loading from './Loading';
import { signOut } from './../auth/Auth';

export default class Logout extends React.Component{
    async componentDidMount(){
        await signOut("cif");
        await signOut("idtrader");
        this.props.navigation.navigate('Login');
    }

    render(){
        return(
            <Loading></Loading>
        )
    }
}